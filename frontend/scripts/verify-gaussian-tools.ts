import {
  factorInteger,
  gaussianFactorRows,
  gaussianNorm,
  gaussianProduct,
  isSumOfTwoSquaresFactorization,
  multiplyGaussian,
  squareRepresentations,
} from "../src/math/gaussianIntegers";

const MAXIMUM = 20_000;

function fail(message: string): never {
  throw new Error(message);
}

for (let value = 1; value <= MAXIMUM; value += 1) {
  const factors = factorInteger(value);
  const reconstructed = factors.reduce(
    (product, factor) => product * factor.prime ** factor.exponent,
    1,
  );
  if (reconstructed !== value) {
    fail(`factorization mismatch for ${value}: ${reconstructed}`);
  }

  const representations = squareRepresentations(value);
  const criterion = isSumOfTwoSquaresFactorization(factors);
  if (criterion !== (representations.length > 0)) {
    fail(`two-squares criterion mismatch for ${value}`);
  }

  const independentRepresentations: string[] = [];
  for (let x = 0; x * x <= value; x += 1) {
    for (let y = x; x * x + y * y <= value; y += 1) {
      if (x * x + y * y === value) {
        independentRepresentations.push(`${x},${y}`);
      }
    }
  }
  const actualRepresentations = representations.map(
    ({ x, y }) => `${x},${y}`,
  );
  if (
    independentRepresentations.length !== actualRepresentations.length ||
    independentRepresentations.some(
      (representation, index) => representation !== actualRepresentations[index],
    )
  ) {
    fail(`representation list mismatch for ${value}`);
  }

  if (!criterion) continue;
  const rows = gaussianFactorRows(factors);
  for (const row of rows) {
    if (
      row.right.re !== row.left.re ||
      row.right.im !== -row.left.im
    ) {
      fail(`nonconjugate row ${row.id} for ${value}`);
    }
  }

  const left = gaussianProduct(rows.map((row) => row.left));
  const right = gaussianProduct(rows.map((row) => row.right));
  const product = multiplyGaussian(left, right);
  if (
    right.re !== left.re ||
    right.im !== -left.im ||
    gaussianNorm(left) !== value ||
    product.re !== value ||
    product.im !== 0
  ) {
    fail(`Gaussian column certificate mismatch for ${value}`);
  }
}

console.log(
  `Verified integer factorizations, all two-square representations, and Gaussian column certificates for 1 <= n <= ${MAXIMUM}.`,
);
