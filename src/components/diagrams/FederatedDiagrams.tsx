// Diagrams for "Training on Data You Can't See" (federated learning).

import { Arrowheads, Badge, Card, Data, Figure, Legend, Model, lineClass } from "./primitives";

const HOSPITALS = ["Hospital A", "Hospital B", "Hospital C"];

/* ---------- 1. traditional vs federated ---------- */

function TraditionalPanel() {
  const xs = [10, 110, 210];
  return (
    <svg viewBox="0 0 300 276" role="img" aria-labelledby="fl1a-t">
      <title id="fl1a-t">Traditional training: every hospital copies its raw data to one central server.</title>
      <Arrowheads prefix="fl1a" />
      <text className="fig-title" x="150" y="18" textAnchor="middle">Traditional</text>
      <text className="fig-sub" x="150" y="36" textAnchor="middle">All data is copied to one place</text>
      <Card x={95} y={52} w={110} h={74} label="Central server" />
      <Data x={133} y={80} />
      <Model x={170} y={80} />
      {[[50, 120], [150, 150], [250, 180]].map(([cx, sx]) => (
        <line key={cx} className={lineClass("amber")} x1={cx} y1={186} x2={sx} y2={130} markerEnd="url(#fl1a-amber)" />
      ))}
      <text className="fig-note t-amber-text" x="8" y="160">raw data</text>
      {xs.map((x, i) => (
        <g key={x}>
          <Card x={x} y={188} w={80} h={66} label={HOSPITALS[i]} />
          <Data x={x + 40} y={214} />
        </g>
      ))}
      <text className="fig-sub" x="150" y="272" textAnchor="middle">Patient records leave every hospital</text>
    </svg>
  );
}

function FederatedPanel() {
  const xs = [10, 110, 210];
  return (
    <svg viewBox="0 0 300 276" role="img" aria-labelledby="fl1b-t">
      <title id="fl1b-t">Federated training: the server sends the model to each hospital and receives only model updates back. Data stays at each hospital.</title>
      <Arrowheads prefix="fl1b" />
      <text className="fig-title" x="150" y="18" textAnchor="middle">Federated</text>
      <text className="fig-sub" x="150" y="36" textAnchor="middle">The model travels, the data stays</text>
      <Card x={95} y={52} w={110} h={74} label="Server" />
      <Model x={150} y={80} solid />
      {[[50, 120], [150, 150], [250, 180]].map(([cx, sx]) => (
        <g key={cx}>
          <line className={lineClass("blue")} x1={sx - 7} y1={130} x2={cx - 7} y2={186} markerEnd="url(#fl1b-blue)" />
          <line className={lineClass("green", true)} x1={cx + 7} y1={186} x2={sx + 7} y2={130} markerEnd="url(#fl1b-green)" />
        </g>
      ))}
      {xs.map((x, i) => (
        <g key={x}>
          <Card x={x} y={188} w={80} h={66} label={HOSPITALS[i]} />
          <Data x={x + 24} y={214} />
          <Model x={x + 56} y={214} />
        </g>
      ))}
      <text className="fig-sub" x="150" y="272" textAnchor="middle">Patient records never leave</text>
    </svg>
  );
}

export function CentralVsFederated() {
  return (
    <Figure caption={<>In the usual setup, everyone uploads their data to one server. In federated learning, the server sends the model out (blue) and only gets <em>what the model learned</em> back (green).</>}>
      <div className="fig-pair">
        <TraditionalPanel />
        <FederatedPanel />
      </div>
    </Figure>
  );
}

/* ---------- 2. one training round ---------- */

export function TrainingRound() {
  const xs = [10, 155, 300];
  const sx = [180, 210, 240];
  return (
    <Figure caption="One round of federated learning. The numbers match the steps below. The same round repeats many times until the shared model is good enough.">
      <svg viewBox="0 0 420 324" role="img" aria-labelledby="fl2-t">
        <title id="fl2-t">One round: 1, the server sends the shared model to every hospital. 2, each hospital trains it on its own data. 3, each hospital sends back only its update. 4, the server averages the updates into a new shared model.</title>
        <Arrowheads prefix="fl2" />
        <Card x={150} y={14} w={120} h={74} label="Server" />
        <Model x={210} y={42} solid />
        <Badge x={290} y={42} n={4} tone="blue" />
        <text className="fig-note" x="304" y="46">average</text>
        {xs.map((x, i) => {
          const cx = x + 55;
          return (
            <g key={x}>
              <line className={lineClass("blue")} x1={sx[i] - 14} y1={90} x2={cx - 14} y2={204} markerEnd="url(#fl2-blue)" />
              <line className={lineClass("green", true)} x1={cx + 14} y1={206} x2={sx[i] + 14} y2={92} markerEnd="url(#fl2-green)" />
              <Card x={x} y={208} w={110} h={82} label={HOSPITALS[i]} />
              <Data x={x + 36} y={238} />
              <Model x={x + 74} y={238} />
            </g>
          );
        })}
        <Badge x={196} y={148} n={1} tone="blue" />
        <Badge x={224} y={148} n={3} tone="green" />
        <Badge x={265} y={208} n={2} tone="amber" />
        <Legend x={60} y={312} items={[{ tone: "blue", label: "model goes out" }, { tone: "green", label: "updates come back", dashed: true }]} />
      </svg>
    </Figure>
  );
}

/* ---------- 3. weighted averaging ---------- */

export function WeightedAverage() {
  const rows = [
    { name: "Hospital A", n: "1,000 patients", w: 250, tone: "blue" },
    { name: "Hospital B", n: "600 patients", w: 150, tone: "green" },
    { name: "Hospital C", n: "400 patients", w: 100, tone: "amber" },
  ];
  return (
    <Figure caption="Federated averaging: each hospital's update counts in proportion to how much data it trained on.">
      <svg viewBox="0 0 420 212" role="img" aria-labelledby="fl3-t">
        <title id="fl3-t">Hospital A has 1,000 patients, B has 600 and C has 400, so in the new model A&rsquo;s update counts 50 percent, B&rsquo;s 30 percent and C&rsquo;s 20 percent.</title>
        <Arrowheads prefix="fl3" />
        {rows.map((r, i) => {
          const y = 22 + i * 28;
          return (
            <g key={r.name}>
              <text className="fig-label" x="0" y={y + 4}>{r.name}</text>
              <rect className={`t-${r.tone}-fill`} x="88" y={y - 8} width={r.w * 0.86} height="14" rx="3" />
              <text className="fig-note" x={96 + r.w * 0.86} y={y + 4}>{r.n}</text>
            </g>
          );
        })}
        <line className="fig-line" x1="210" y1="96" x2="210" y2="120" markerEnd="url(#fl3-muted)" />
        <rect className="t-blue-fill" x="20" y="126" width="190" height="30" rx="4" />
        <rect className="t-green-fill" x="212" y="126" width="112" height="30" />
        <rect className="t-amber-fill" x="326" y="126" width="74" height="30" rx="4" />
        <text className="t-on-color" x="115" y="145" textAnchor="middle">A · 50%</text>
        <text className="t-on-color" x="268" y="145" textAnchor="middle">B · 30%</text>
        <text className="t-on-color" x="363" y="145" textAnchor="middle">C · 20%</text>
        <text className="fig-label" x="210" y="182" textAnchor="middle">New shared model</text>
        <text className="fig-sub" x="210" y="200" textAnchor="middle">More data means a bigger say</text>
      </svg>
    </Figure>
  );
}

/* ---------- 4. non-IID data ---------- */

export function DifferentData() {
  const charts = [
    { title: "Children's hospital", h: [92, 22, 6] },
    { title: "Heart clinic", h: [6, 34, 88] },
    { title: "General hospital", h: [46, 56, 50] },
  ];
  const groups = [{ name: "Child", tone: "amber" }, { name: "Adult", tone: "green" }, { name: "Senior", tone: "blue" }];
  return (
    <Figure caption="Each hospital sees very different patients. A model trained on only one of them would learn a skewed picture, and their updates can pull the shared model in different directions.">
      <svg viewBox="0 0 420 190" role="img" aria-labelledby="fl4-t">
        <title id="fl4-t">Bar charts of patient age groups. The children&rsquo;s hospital has mostly children, the heart clinic mostly seniors, and the general hospital an even mix.</title>
        {charts.map((c, i) => {
          const x0 = 10 + i * 140;
          return (
            <g key={c.title}>
              <text className="fig-title-sm" x={x0 + 60} y="16" textAnchor="middle">{c.title}</text>
              <line className="fig-axis" x1={x0} y1="150" x2={x0 + 120} y2="150" />
              {c.h.map((h, j) => (
                <g key={j}>
                  <rect className={`t-${groups[j].tone}-fill`} x={x0 + 10 + j * 36} y={150 - h * 1.15} width="28" height={h * 1.15} rx="2" />
                  <text className="fig-tick" x={x0 + 24 + j * 36} y="166" textAnchor="middle">{groups[j].name}</text>
                </g>
              ))}
            </g>
          );
        })}
        <text className="fig-sub" x="210" y="186" textAnchor="middle">Share of patients by age group</text>
      </svg>
    </Figure>
  );
}

/* ---------- 5. privacy protections ---------- */

export function PrivacyLayers() {
  const ups = ["A's update + noise", "B's update + noise", "C's update + noise"];
  return (
    <Figure caption="Two common protections. Each hospital adds a little random noise to its update (differential privacy), and the updates are combined with cryptography so the server only ever sees their sum (secure aggregation).">
      <svg viewBox="0 0 420 200" role="img" aria-labelledby="fl5-t">
        <title id="fl5-t">Three noisy updates go into a secure aggregation step, and the server receives only their combined total, never an individual hospital&rsquo;s update.</title>
        <Arrowheads prefix="fl5" />
        {ups.map((u, i) => {
          const y = 18 + i * 62;
          return (
            <g key={u}>
              <rect className="t-green-soft" x="6" y={y} width="128" height="38" rx="8" />
              <text className="fig-label" x="70" y={y + 23} textAnchor="middle">{u}</text>
              <line className={lineClass("violet")} x1="136" y1={y + 19} x2="182" y2={70 + i * 20} markerEnd="url(#fl5-violet)" />
            </g>
          );
        })}
        <rect className="t-violet-soft" x="186" y="52" width="100" height="94" rx="8" />
        <text className="fig-label" x="236" y="88" textAnchor="middle">Secure</text>
        <text className="fig-label" x="236" y="104" textAnchor="middle">aggregation</text>
        <text className="fig-sub" x="236" y="124" textAnchor="middle">adds them up</text>
        <line className={lineClass("violet")} x1="288" y1="99" x2="312" y2="99" markerEnd="url(#fl5-violet)" />
        <rect className="fig-box" x="314" y="66" width="102" height="66" rx="8" />
        <text className="fig-label" x="365" y="94" textAnchor="middle">Server sees</text>
        <text className="fig-label" x="365" y="110" textAnchor="middle">only the total</text>
      </svg>
    </Figure>
  );
}
