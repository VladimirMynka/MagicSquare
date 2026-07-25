import {
  FAMILIES,
  FIVE_FAMILIES,
  FOUR_FAMILIES,
  type FamilyDefinition,
} from "../src/lib/families";
import {
  POSITIONS,
  createSnapshot,
  type Position,
} from "../src/lib/magicSquare";
import {
  SIX_NINE_PATTERNS,
  type SixNinePattern,
} from "../src/content/sixNinePatterns";

const CELL_FORMS: Readonly<Record<Position, readonly [number, number, number]>> = {
  A: [1, 1, 0],
  B: [1, -1, 1],
  C: [1, 0, -1],
  D: [1, -1, -1],
  E: [1, 0, 0],
  F: [1, 1, 1],
  G: [1, 0, 1],
  H: [1, 1, -1],
  J: [1, -1, 0],
};

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function combinations<T>(items: readonly T[], size: number): readonly T[][] {
  const result: T[][] = [];
  const visit = (start: number, selected: T[]) => {
    if (selected.length === size) {
      result.push([...selected]);
      return;
    }
    for (let index = start; index <= items.length - (size - selected.length); index += 1) {
      selected.push(items[index]);
      visit(index + 1, selected);
      selected.pop();
    }
  };
  visit(0, []);
  return result;
}

function transformPosition(position: Position, rotation: number, reflected: boolean): Position {
  const index = POSITIONS.indexOf(position);
  let row = Math.floor(index / 3);
  let column = index % 3;
  if (reflected) column = 2 - column;
  for (let turn = 0; turn < rotation; turn += 1) {
    [row, column] = [column, 2 - row];
  }
  return POSITIONS[row * 3 + column];
}

function canonicalMask(mask: readonly Position[]): string {
  const images: string[] = [];
  for (const reflected of [false, true]) {
    for (let rotation = 0; rotation < 4; rotation += 1) {
      images.push(
        mask
          .map((position) => transformPosition(position, rotation, reflected))
          .sort()
          .join(""),
      );
    }
  }
  return images.sort()[0];
}

function parseRelation(source: string): Readonly<Record<Position, number>> {
  const result = Object.fromEntries(POSITIONS.map((position) => [position, 0])) as Record<
    Position,
    number
  >;
  const [left, right] = source.replaceAll(" ", "").split("=");
  invariant(Boolean(left && right), `Cannot parse relation ${source}`);
  const consume = (side: string, sign: number) => {
    for (const rawTerm of side.split("+")) {
      const match = /^(\d*)([ABCDEFGHJ])$/.exec(rawTerm);
      invariant(Boolean(match), `Cannot parse term ${rawTerm} in ${source}`);
      const [, rawCoefficient, rawPosition] = match;
      const position = rawPosition as Position;
      result[position] += sign * Number(rawCoefficient || "1");
    }
  };
  consume(left, 1);
  consume(right, -1);
  return result;
}

function relationVector(family: FamilyDefinition, source: string): readonly number[] {
  const coefficients = parseRelation(source);
  return family.positions.map((position) => coefficients[position]);
}

function verifyRelation(family: FamilyDefinition, source: string): readonly number[] {
  const coefficients = parseRelation(source);
  for (let column = 0; column < 3; column += 1) {
    const residual = POSITIONS.reduce(
      (sum, position) => sum + coefficients[position] * CELL_FORMS[position][column],
      0,
    );
    invariant(residual === 0, `${family.id}: ${source} is not in the left kernel`);
  }
  for (const position of POSITIONS) {
    invariant(
      coefficients[position] === 0 || family.positions.includes(position),
      `${family.id}: ${source} uses cell ${position} outside the mask`,
    );
  }
  return relationVector(family, source);
}

function matrixRank(vectors: readonly (readonly number[])[]): number {
  const matrix = vectors.map((vector) => vector.map((value) => value));
  let rank = 0;
  for (let column = 0; column < (matrix[0]?.length ?? 0); column += 1) {
    const pivot = matrix.findIndex(
      (row, rowIndex) => rowIndex >= rank && row[column] !== 0,
    );
    if (pivot === -1) continue;
    [matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]];
    const pivotValue = matrix[rank][column];
    for (let row = rank + 1; row < matrix.length; row += 1) {
      const rowValue = matrix[row][column];
      if (rowValue === 0) continue;
      for (let index = column; index < matrix[row].length; index += 1) {
        matrix[row][index] =
          matrix[row][index] * pivotValue - matrix[rank][index] * rowValue;
      }
    }
    rank += 1;
  }
  return rank;
}

function verifyOrbitCensus(families: readonly FamilyDefinition[], level: 4 | 5) {
  const allOrbits = new Set(
    combinations(POSITIONS, level).map((mask) => canonicalMask(mask)),
  );
  const atlasOrbits = families.map((family) => canonicalMask(family.positions));
  invariant(allOrbits.size === 23, `${level}/9 census has ${allOrbits.size}, expected 23`);
  invariant(families.length === 23, `${level}/9 atlas has ${families.length}, expected 23`);
  invariant(new Set(atlasOrbits).size === 23, `${level}/9 atlas contains duplicate D4 orbits`);
  for (const orbit of allOrbits) {
    invariant(atlasOrbits.includes(orbit), `${level}/9 atlas misses orbit ${orbit}`);
  }
}

function verifyFamily(family: FamilyDefinition) {
  invariant(family.positions.length === family.level, `${family.id}: level mismatch`);
  const relations = family.justifications.map((item) => {
    const vector = verifyRelation(family, item.relationLatex);
    const support = family.positions.filter((_, index) => vector[index] !== 0);
    invariant(
      support.length === item.positions.length &&
        support.every((position) => item.positions.includes(position)),
      `${family.id}: color support does not match ${item.relationLatex}`,
    );
    return vector;
  });
  invariant(
    relations.length === family.level - 3,
    `${family.id}: wrong number of defining relations`,
  );
  invariant(
    matrixRank(relations) === relations.length,
    `${family.id}: defining relations are dependent`,
  );

  const snapshot = createSnapshot(family.generate(family.defaults));
  invariant(snapshot.lineSumsAgree, `${family.id}: default is not magic`);
  invariant(snapshot.entriesDistinct, `${family.id}: default has repeated entries`);
  invariant(snapshot.cells.every((cell) => cell.value > 0n), `${family.id}: default is not positive`);
  invariant(
    snapshot.squarePositions.length === family.level,
    `${family.id}: default has ${snapshot.squarePositions.length}/9 squares`,
  );
  invariant(
    family.positions.every((position) => snapshot.squarePositions.includes(position)),
    `${family.id}: default misses a declared square`,
  );
}

function parseSquaredRelation(source: string): Readonly<Record<Position, number>> {
  const result = Object.fromEntries(POSITIONS.map((position) => [position, 0])) as Record<
    Position,
    number
  >;
  const [left, right] = source.replaceAll(" ", "").split("=");
  invariant(Boolean(left && right), `Cannot parse squared relation ${source}`);
  const consume = (side: string, sign: number) => {
    for (const rawTerm of side.split("+")) {
      const match = /^(\d*)([abcdefghj])\^2$/.exec(rawTerm);
      invariant(Boolean(match), `Cannot parse term ${rawTerm} in ${source}`);
      const [, rawCoefficient, rawPosition] = match;
      const position = rawPosition.toUpperCase() as Position;
      result[position] += sign * Number(rawCoefficient || "1");
    }
  };
  consume(left, 1);
  consume(right, -1);
  return result;
}

function verifySixNinePattern(pattern: SixNinePattern) {
  const positions = [...pattern.mask] as Position[];
  invariant(positions.length === 6, `${pattern.mask}: expected six positions`);
  invariant(
    pattern.complement === POSITIONS.filter((position) => !positions.includes(position)).join(""),
    `${pattern.mask}: wrong complement`,
  );
  invariant(pattern.conditions.length === 3, `${pattern.mask}: expected three quadrics`);

  const vectors = pattern.conditions.map((condition) => {
    const coefficients = parseSquaredRelation(condition.latex);
    for (let column = 0; column < 3; column += 1) {
      const residual = POSITIONS.reduce(
        (sum, position) => sum + coefficients[position] * CELL_FORMS[position][column],
        0,
      );
      invariant(
        residual === 0,
        `${pattern.mask}: ${condition.latex} is not in the left kernel`,
      );
    }
    const support = POSITIONS.filter((position) => coefficients[position] !== 0);
    invariant(
      support.join("") === condition.support,
      `${pattern.mask}: support ${condition.support} does not match ${condition.latex}`,
    );
    invariant(
      support.every((position) => positions.includes(position)),
      `${pattern.mask}: ${condition.latex} uses a cell outside the pattern`,
    );
    return positions.map((position) => coefficients[position]);
  });
  invariant(
    matrixRank(vectors) === 3,
    `${pattern.mask}: defining quadrics are dependent`,
  );

  const redSupports = pattern.conditions
    .filter((condition) => condition.kind === "red")
    .map((condition) => condition.support)
    .sort();
  invariant(
    redSupports.join(",") === [...pattern.progressions].sort().join(","),
    `${pattern.mask}: progression list does not match the red quadrics`,
  );
}

verifyOrbitCensus(FOUR_FAMILIES, 4);
verifyOrbitCensus(FIVE_FAMILIES, 5);
invariant(FAMILIES.length === 46, `Combined atlas has ${FAMILIES.length}, expected 46`);
FAMILIES.forEach(verifyFamily);

const sixNineOrbits = new Set(
  combinations(POSITIONS, 6).map((mask) => canonicalMask(mask)),
);
const sixNineAtlasOrbits = SIX_NINE_PATTERNS.map((pattern) =>
  canonicalMask([...pattern.mask] as Position[]),
);
invariant(sixNineOrbits.size === 16, `6/9 census has ${sixNineOrbits.size}, expected 16`);
invariant(SIX_NINE_PATTERNS.length === 16, "6/9 atlas must contain 16 entries");
invariant(
  new Set(sixNineAtlasOrbits).size === 16,
  "6/9 atlas contains duplicate D4 orbits",
);
for (const orbit of sixNineOrbits) {
  invariant(sixNineAtlasOrbits.includes(orbit), `6/9 atlas misses orbit ${orbit}`);
}
SIX_NINE_PATTERNS.forEach(verifySixNinePattern);

console.log(
  "Verified 23 D4 orbits for 4/9, 23 D4 orbits for 5/9, 16 D4 orbits for 6/9, 94 relation bases, and 46 exact defaults.",
);
