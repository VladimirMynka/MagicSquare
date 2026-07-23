const SUPERSCRIPT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;
const TEN_SECONDS = 10_000;
const ONE_MINUTE = 60_000;
const SLICE_MS = 24;

interface FactorTask {
  index: number;
  original: bigint;
  remainder: bigint;
  candidate: bigint;
  factors: string[];
}

interface FactorJob {
  tasks: FactorTask[];
  taskIndex: number;
  approvedThroughMs: number;
  elapsedBeforeSegment: number;
  segmentStartedAt: number;
  paused: boolean;
}

type WorkerInput =
  | {
      type: "start";
      values: string[];
      approvedThroughMs: number;
    }
  | {
      type: "continue";
      approvedThroughMs: number;
    }
  | { type: "cancel" };

let job: FactorJob | null = null;

function superscript(value: number): string {
  return String(value)
    .split("")
    .map((digit) => SUPERSCRIPT[Number(digit)])
    .join("");
}

function activeElapsed(current: FactorJob): number {
  return (
    current.elapsedBeforeSegment +
    performance.now() -
    current.segmentStartedAt
  );
}

function nextThreshold(current: FactorJob): number | null {
  if (current.approvedThroughMs < TEN_SECONDS) return TEN_SECONDS;
  if (current.approvedThroughMs < ONE_MINUTE) return ONE_MINUTE;
  return null;
}

function pauseAtThreshold(current: FactorJob): boolean {
  const threshold = nextThreshold(current);
  if (threshold === null || activeElapsed(current) < threshold) return false;
  current.elapsedBeforeSegment = activeElapsed(current);
  current.paused = true;
  self.postMessage({ type: "threshold", thresholdMs: threshold });
  return true;
}

function finishTask(task: FactorTask): string {
  if (task.remainder > 1n) task.factors.push(task.remainder.toString());
  return `${task.original < 0n ? "−" : ""}${task.factors.join(" · ")}`;
}

function specialFactorization(value: bigint): string | null {
  if (value === 0n) return "0";
  if (value === 1n) return "1";
  if (value === -1n) return "−1";
  return null;
}

function runSlice() {
  const current = job;
  if (!current || current.paused) return;
  const sliceStartedAt = performance.now();
  let iterations = 0;

  while (current.taskIndex < current.tasks.length) {
    if (pauseAtThreshold(current)) return;
    const task = current.tasks[current.taskIndex];
    const special = specialFactorization(task.original);
    if (special !== null) {
      self.postMessage({
        type: "result",
        index: task.index,
        factorization: special,
      });
      current.taskIndex += 1;
      continue;
    }

    while (task.candidate * task.candidate <= task.remainder) {
      let power = 0;
      while (task.remainder % task.candidate === 0n) {
        task.remainder /= task.candidate;
        power += 1;
      }
      if (power > 0) {
        task.factors.push(
          `${task.candidate}${power > 1 ? superscript(power) : ""}`,
        );
      }
      task.candidate =
        task.candidate === 2n ? 3n : task.candidate + 2n;
      iterations += 1;

      if (
        iterations % 1024 === 0 &&
        performance.now() - sliceStartedAt >= SLICE_MS
      ) {
        if (!pauseAtThreshold(current)) {
          setTimeout(runSlice, 0);
        }
        return;
      }
    }

    self.postMessage({
      type: "result",
      index: task.index,
      factorization: finishTask(task),
    });
    current.taskIndex += 1;
  }

  self.postMessage({
    type: "done",
    elapsedMs: activeElapsed(current),
  });
  job = null;
}

self.onmessage = (event: MessageEvent<WorkerInput>) => {
  const message = event.data;
  if (message.type === "cancel") {
    job = null;
    return;
  }
  if (message.type === "continue") {
    if (!job) return;
    job.approvedThroughMs = message.approvedThroughMs;
    job.segmentStartedAt = performance.now();
    job.paused = false;
    runSlice();
    return;
  }

  job = {
    tasks: message.values.map((value, index) => {
      const original = BigInt(value);
      return {
        index,
        original,
        remainder: original < 0n ? -original : original,
        candidate: 2n,
        factors: [],
      };
    }),
    taskIndex: 0,
    approvedThroughMs: message.approvedThroughMs,
    elapsedBeforeSegment: 0,
    segmentStartedAt: performance.now(),
    paused: false,
  };
  runSlice();
};
