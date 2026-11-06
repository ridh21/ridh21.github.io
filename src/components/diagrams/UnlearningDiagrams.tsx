// Diagrams for "Teaching a Model to Forget" (machine unlearning).

import { Arrowheads, Figure, Model, lineClass } from "./primitives";

/** Five records in a dataset; `marked` is the person's record, optionally deleted. */
function Records({ x, y, deleted = false }: { x: number; y: number; deleted?: boolean }) {
  return (
    <g>
      <rect className="fig-box" x={x} y={y} width="150" height="92" rx="8" />
      {[0, 1, 2, 3, 4].map((i) => {
        const ry = y + 10 + i * 15;
        if (i !== 2) return <rect key={i} className="t-amber-soft" x={x + 10} y={ry} width="130" height="11" rx="3" />;
        return deleted ? (
          <g key={i}>
            <rect className="fig-outline fig-line-dash" x={x + 10} y={ry} width="130" height="11" rx="3" />
            <text className="fig-tick t-rose-text" x={x + 75} y={ry + 9} textAnchor="middle">deleted</text>
          </g>
        ) : (
          <g key={i}>
            <rect className="t-rose-fill" x={x + 10} y={ry} width="130" height="11" rx="3" />
            <text className="t-on-color" style={{ fontSize: 9.5 }} x={x + 75} y={ry + 8.5} textAnchor="middle">your photo</text>
          </g>
        );
      })}
    </g>
  );
}

function RememberingModel({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect className="t-blue-soft" x={x} y={y} width="104" height="70" rx="8" />
      <Model x={x + 36} y={y + 30} solid />
      <circle className="t-rose-fill" cx={x + 74} cy={y + 30} r="7" />
      <text className="fig-tick" x={x + 52} y={y + 60} textAnchor="middle">model</text>
    </g>
  );
}

/* ---------- 1. deleting the file is not enough ---------- */

export function DeletionNotEnough() {
  return (
    <Figure caption="The model learned from your photo during training (rose dot). Deleting the photo from the database afterwards does not touch the model, so what it learned is still inside.">
      <svg viewBox="0 0 420 266" role="img" aria-labelledby="ul1-t">
        <title id="ul1-t">Top: a dataset containing your photo is used to train a model, which absorbs something from it. Bottom: the photo is deleted from the dataset, but the model still contains what it learned.</title>
        <Arrowheads prefix="ul1" />
        <text className="fig-title-sm" x="10" y="16">1. Training</text>
        <Records x={10} y={26} />
        <line className={lineClass("green")} x1="166" y1="72" x2="226" y2="72" markerEnd="url(#ul1-green)" />
        <text className="fig-tick t-green-text" x="196" y="64" textAnchor="middle">trains</text>
        <RememberingModel x={232} y={37} />
        <text className="fig-note" x="344" y="66">learned from</text>
        <text className="fig-note" x="344" y="81">your photo</text>

        <line className="fig-axis" x1="10" y1="134" x2="410" y2="134" strokeDasharray="3 4" />

        <text className="fig-title-sm" x="10" y="160">2. You ask for deletion</text>
        <Records x={10} y={170} deleted />
        <text className="fig-tick" x="197" y="212" textAnchor="middle">model not</text>
        <text className="fig-tick" x="197" y="226" textAnchor="middle">retrained</text>
        <RememberingModel x={232} y={181} />
        <text className="fig-note t-rose-text" x="344" y="210">still</text>
        <text className="fig-note t-rose-text" x="344" y="225">remembers</text>
      </svg>
    </Figure>
  );
}

/* ---------- 2. cost of each approach ---------- */

export function DeletionCost() {
  const rows = [
    { name: "Retrain from scratch", w: 236, tone: "blue", note: "days or weeks" },
    { name: "Retrain one shard", w: 64, tone: "green", note: "a fraction" },
    { name: "Approximate unlearning", w: 18, tone: "violet", note: "minutes" },
  ];
  return (
    <Figure caption="Illustrative, not measured: the rough cost of honouring one deletion request with each approach. Exact numbers depend on the model and data size, but the gap is often this large.">
      <svg viewBox="0 0 420 140" role="img" aria-labelledby="ul2-t">
        <title id="ul2-t">Horizontal bars comparing cost. Retraining from scratch takes days or weeks. Retraining one shard takes a fraction of that. Approximate unlearning takes minutes.</title>
        {rows.map((r, i) => {
          const y = 22 + i * 40;
          return (
            <g key={r.name}>
              <text className="fig-label" x="0" y={y}>{r.name}</text>
              <rect className={`t-${r.tone}-fill`} x="0" y={y + 8} width={r.w} height="14" rx="3" />
              <text className="fig-note" x={r.w + 8} y={y + 19}>{r.note}</text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* ---------- 3. SISA ---------- */

export function ShardedTraining() {
  const shards = [0, 1, 2, 3];
  return (
    <Figure caption="Sharded training (SISA). The data is split into separate pieces, each training its own small model, and their answers are combined. Deleting a record means retraining only the one model that saw it.">
      <svg viewBox="0 0 420 252" role="img" aria-labelledby="ul3-t">
        <title id="ul3-t">Training data split into four shards. Each shard trains its own model, and the models&rsquo; answers are combined. The deleted record sits in shard 2, so only model 2 is retrained.</title>
        <Arrowheads prefix="ul3" />
        <text className="fig-title-sm" x="210" y="16" textAnchor="middle">Training data, split into shards</text>
        {shards.map((s) => {
          const x = 10 + s * 100;
          const cx = x + 50;
          return (
            <g key={s}>
              <rect className="t-amber-soft" x={x + 2} y="28" width="96" height="34" rx="6" />
              <text className="fig-tick" x={cx} y="78" textAnchor="middle">shard {s + 1}</text>
              <line className={lineClass("muted")} x1={cx} y1="84" x2={cx} y2="100" markerEnd="url(#ul3-muted)" />
              <Model x={cx} y={118} />
              <line className={lineClass("muted")} x1={cx} y1="158" x2={210 + (s - 1.5) * 24} y2="194" markerEnd="url(#ul3-muted)" />
            </g>
          );
        })}
        <rect className="t-rose-fill" x="142" y="39" width="36" height="12" rx="3" />
        <rect className="fig-outline t-green-line" x="134" y="98" width="52" height="40" rx="8" strokeWidth="1.6" strokeDasharray="4 3" />
        <text className="fig-note t-green-text" x="160" y="152" textAnchor="middle">retrain</text>
        <rect className="fig-box" x="140" y="198" width="140" height="34" rx="8" />
        <text className="fig-label" x="210" y="220" textAnchor="middle">combine answers</text>
      </svg>
    </Figure>
  );
}

/* ---------- 4. what success looks like ---------- */

export function ForgettingTarget() {
  const bars = [
    { a: "Original", b: "model", v: 97, tone: "blue" },
    { a: "Retrained", b: "reference", v: 72, tone: "green" },
    { a: "Good", b: "unlearning", v: 70, tone: "violet" },
    { a: "Over-", b: "forgetting", v: 4, tone: "rose" },
  ];
  const base = 176, k = 1.3;
  return (
    <Figure caption="Illustrative numbers. The goal is not zero accuracy on the deleted data. A model that never saw it would still do reasonably well on similar examples, so good unlearning lands near that retrained reference. Collapsing to near zero is suspicious: it reveals that something was deliberately removed.">
      <svg viewBox="0 0 420 222" role="img" aria-labelledby="ul4-t">
        <title id="ul4-t">Accuracy on the deleted examples: the original model 97 percent, a model retrained without them 72 percent, good unlearning 70 percent, and over-forgetting 4 percent. A dashed target line sits at the retrained reference.</title>
        <text className="fig-title-sm" x="0" y="14">Accuracy on the deleted examples</text>
        <line className="fig-axis" x1="0" y1={base} x2="420" y2={base} />
        <line className={lineClass("green", true)} x1="0" y1={base - 72 * k} x2="420" y2={base - 72 * k} />
        <text className="fig-tick t-green-text" x="418" y={base - 72 * k - 6} textAnchor="end">target: as if never seen</text>
        {bars.map((b, i) => {
          const x = 30 + i * 100, h = b.v * k;
          return (
            <g key={b.a}>
              <rect className={`t-${b.tone}-fill`} x={x} y={base - h} width="56" height={h} rx="3" />
              <text className="fig-label" x={x + 28} y={base - h - 6} textAnchor="middle">{b.v}%</text>
              <text className="fig-tick" x={x + 28} y={base + 16} textAnchor="middle">{b.a}</text>
              <text className="fig-tick" x={x + 28} y={base + 30} textAnchor="middle">{b.b}</text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
