import { Component, createSignal } from "solid-js";

type ConfidenceInterval = 0.9 | 0.95 | 0.99;
const CIFormats = new Map<ConfidenceInterval, string>([
  [0.9, "90%"],
  [0.95, "95%"],
  [0.99, "99%"],
]);
const CIValues = new Map<ConfidenceInterval, number>([
  [0.9, 1.64],
  [0.95, 1.96],
  [0.99, 2.58],
]);

type State = {
  sampleSizeRangeValue: number;
  successesRangeValue: number;
  confidenceInterval: number;
};

const App: Component = () => {
  const [sampleSizeValue, setSampleSize] = createSignal(40);
  const sampleSize = () => Math.floor(Math.pow(10, sampleSizeValue() / 20));
  const [successes, setSuccesses] = createSignal(50);
  const [confidenceInterval, setConfidenceInterval] =
    createSignal<ConfidenceInterval>(0.95);

  const lowerBound = () => {
    const p = successes() / 100;
    const z = CIValues.get(confidenceInterval())!;
    const diff = z * Math.sqrt((p * (1 - p)) / sampleSize());
    return p - diff;
  };
  const upperBound = () => {
    const p = successes() / 100;
    const z = CIValues.get(confidenceInterval())!;
    const diff = z * Math.sqrt((p * (1 - p)) / sampleSize());
    return p + diff;
  };
  return (
    <>
      <header class="container">
        <h3>Interval Estimate of Population Proportion</h3>
      </header>
      <main class="container">
        <form>
          <label for="sample-size">
            Sample size: <b>{sampleSize()}</b>
            <input
              type="range"
              min="0"
              max="100"
              value={sampleSizeValue()}
              onChange={(ev) => {
                setSampleSize(Number(ev.currentTarget.value));
              }}
              id="sample-size"
            />
          </label>
          <label for="successes">
            Successes: <b>{successes()}%</b>
            <input
              type="range"
              min="0"
              max="100"
              value={successes()}
              onChange={(ev) => {
                setSuccesses(Number(ev.currentTarget.value));
              }}
              id="successes"
            />
          </label>
          <label for="confidence-interval">
            Confidence Interval: <b>{CIFormats.get(confidenceInterval())}</b>
            <select
              id="confidence-interval"
              onChange={(ev) => {
                setConfidenceInterval(
                  Number(ev.currentTarget.value) as ConfidenceInterval
                );
              }}
            >
              {[...CIFormats.keys()].map((value) => (
                <option value={value} selected={value === confidenceInterval()}>
                  {CIFormats.get(value)}
                </option>
              ))}
            </select>
          </label>
        </form>
        <section>
          <h3>Result</h3>
          <div
            innerHTML={
              window.MathJax.tex2svg(
                `${lowerBound().toFixed(
                  3
                )} \\leq p \\leq ${upperBound().toFixed(3)}`
              ).outerHTML
            }
          ></div>
        </section>
        <section>
          <h3>Confidence Interval of Population Proportion</h3>
          <div
            innerHTML={
              window.MathJax.tex2svg(
                `\\hat{p} \\pm z_{\\alpha / 2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}`
              ).outerHTML
            }
          ></div>
        </section>
      </main>
    </>
  );
};

export default App;
