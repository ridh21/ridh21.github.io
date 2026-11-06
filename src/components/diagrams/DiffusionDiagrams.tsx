// Diagrams for "From Noise to Pictures" (diffusion models).

import { Arrowheads, Figure, Legend, lineClass, seeded } from "./primitives";

/** A simple cat face drawn on a unit grid, scaled to the tile size. */
function Cat({ x, y, s }: { x: number; y: number; s: number }) {
  const P = (px: number, py: number) => `${x + px * s},${y + py * s}`;
  const X = (px: number) => x + px * s, Y = (py: number) => y + py * s;
  return (
    <g>
      <polygon className="cat-fur" points={`${P(0.2, 0.42)} ${P(0.24, 0.12)} ${P(0.44, 0.3)}`} />
      <polygon className="cat-fur" points={`${P(0.8, 0.42)} ${P(0.76, 0.12)} ${P(0.56, 0.3)}`} />
      <polygon className="cat-ear" points={`${P(0.26, 0.36)} ${P(0.27, 0.2)} ${P(0.38, 0.3)}`} />
      <polygon className="cat-ear" points={`${P(0.74, 0.36)} ${P(0.73, 0.2)} ${P(0.62, 0.3)}`} />
      <ellipse className="cat-fur" cx={X(0.5)} cy={Y(0.58)} rx={s * 0.33} ry={s * 0.3} />
      <ellipse className="cat-eye" cx={X(0.38)} cy={Y(0.54)} rx={s * 0.045} ry={s * 0.06} />
      <ellipse className="cat-eye" cx={X(0.62)} cy={Y(0.54)} rx={s * 0.045} ry={s * 0.06} />
      <polygon className="cat-nose" points={`${P(0.46, 0.65)} ${P(0.54, 0.65)} ${P(0.5, 0.7)}`} />
      <g className="cat-whisker" strokeWidth={Math.max(0.6, s * 0.012)}>
        <line x1={X(0.42)} y1={Y(0.7)} x2={X(0.16)} y2={Y(0.66)} />
        <line x1={X(0.42)} y1={Y(0.73)} x2={X(0.16)} y2={Y(0.76)} />
        <line x1={X(0.58)} y1={Y(0.7)} x2={X(0.84)} y2={Y(0.66)} />
        <line x1={X(0.58)} y1={Y(0.73)} x2={X(0.84)} y2={Y(0.76)} />
      </g>
    </g>
  );
}

/** A cat picture with a fraction of its pixels replaced by noise. */
function Tile({ x, y, size, noise, seed, id }: { x: number; y: number; size: number; noise: number; seed: number; id: string }) {
  const rand = seeded(seed);
  const n = 10;
  const cell = size / n;
  const cells: { cx: number; cy: number; k: number; o: number }[] = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const r = rand(), k = Math.floor(rand() * 5), o = 0.55 + rand() * 0.45;
    if (r < noise) cells.push({ cx: x + i * cell, cy: y + j * cell, k, o });
  }
  return (
    <g>
      <clipPath id={id}><rect x={x} y={y} width={size} height={size} rx="6" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <rect className="bg-sky" x={x} y={y} width={size} height={size} />
        {noise < 1 && <Cat x={x} y={y} s={size} />}
        {cells.map((c, i) => <rect key={i} className={`nz-${c.k}`} opacity={c.o} x={c.cx} y={c.cy} width={cell + 0.4} height={cell + 0.4} />)}
      </g>
      <rect className="fig-outline" x={x} y={y} width={size} height={size} rx="6" />
    </g>
  );
}

/* ---------- 1. forward and reverse ---------- */

export function NoiseStrip() {
  const levels = [0, 0.25, 0.5, 0.75, 1];
  const steps = ["step 0", "250", "500", "750", "1,000"];
  return (
    <Figure caption="Training data is destroyed on purpose: a little noise is added at every step until nothing is left (violet). The model learns to undo one small step at a time (blue). To create a new image, it starts from pure noise and runs the blue arrow.">
      <svg viewBox="0 0 420 172" role="img" aria-labelledby="df1-t">
        <title id="df1-t">Five copies of a small cat picture, going from clean to completely noisy. Adding noise goes left to right; the model learns to go right to left.</title>
        <Arrowheads prefix="df1" />
        <text className="fig-note t-violet-text" x="15" y="14">Forward: add a little noise each step (simple, no learning)</text>
        <line className={lineClass("violet")} x1="15" y1="24" x2="403" y2="24" markerEnd="url(#df1-violet)" strokeWidth="1.8" />
        {levels.map((lv, i) => (
          <g key={i}>
            <Tile x={15 + i * 81} y={34} size={66} noise={lv} seed={11 + i * 7} id={`df1-c${i}`} />
            <text className="fig-tick" x={48 + i * 81} y="116" textAnchor="middle">{steps[i]}</text>
          </g>
        ))}
        <line className={lineClass("blue")} x1="403" y1="132" x2="17" y2="132" markerEnd="url(#df1-blue)" strokeWidth="1.8" />
        <text className="fig-note t-blue-text" x="403" y="152" textAnchor="end">Reverse: remove a little noise each step (what the model learns)</text>
      </svg>
    </Figure>
  );
}

/* ---------- 2. one training step ---------- */

export function DenoiseTraining() {
  return (
    <Figure caption="One training step. Take a real image, mix in random noise, and ask the network to guess exactly which noise was added. The gap between its guess and the real noise is the error it learns from. Repeat millions of times, at every noise level.">
      <svg viewBox="0 0 420 206" role="img" aria-labelledby="df2-t">
        <title id="df2-t">A clean image plus random noise makes a noisy image. The denoising network looks at the noisy image and guesses the noise. Its guess is compared with the real noise, and the difference trains the network.</title>
        <Arrowheads prefix="df2" />
        <text className="fig-note" x="44" y="16" textAnchor="middle">clean image</text>
        <Tile x={16} y={24} size={56} noise={0} seed={3} id="df2-a" />
        <text className="fig-title" x="88" y="57" textAnchor="middle">+</text>
        <text className="fig-note t-violet-text" x="132" y="16" textAnchor="middle">random noise</text>
        <Tile x={104} y={24} size={56} noise={1} seed={21} id="df2-b" />
        <text className="fig-title" x="177" y="57" textAnchor="middle">=</text>
        <text className="fig-note" x="222" y="16" textAnchor="middle">noisy image</text>
        <Tile x={194} y={24} size={56} noise={0.5} seed={21} id="df2-c" />
        <line className={lineClass("muted")} x1="252" y1="52" x2="280" y2="52" markerEnd="url(#df2-muted)" />
        <rect className="t-blue-soft" x="284" y="22" width="126" height="62" rx="8" />
        <text className="fig-label" x="347" y="46" textAnchor="middle">Denoising</text>
        <text className="fig-label" x="347" y="62" textAnchor="middle">network</text>
        <text className="fig-tick" x="347" y="77" textAnchor="middle">guesses the noise</text>
        <line className={lineClass("blue")} x1="347" y1="86" x2="347" y2="112" markerEnd="url(#df2-blue)" />
        <Tile x={319} y={116} size={56} noise={1} seed={21} id="df2-d" />
        <text className="fig-note t-blue-text" x="347" y="190" textAnchor="middle">its guess</text>
        <path className={lineClass("rose", true)} d="M132 82 V144 H313" markerEnd="url(#df2-rose)" />
        <text className="fig-label t-rose-text" x="222" y="138" textAnchor="middle">compare</text>
        <text className="fig-note" x="222" y="164" textAnchor="middle">the difference (error)</text>
        <text className="fig-note" x="222" y="179" textAnchor="middle">is what trains the network</text>
      </svg>
    </Figure>
  );
}

/* ---------- 3. guidance trade-off ---------- */

export function GuidanceChart() {
  return (
    <Figure caption="Illustrative, not measured. Turning guidance up makes images follow the prompt more closely, but too much makes them look samey and over-processed. Most tools default to somewhere in the middle.">
      <svg viewBox="0 0 420 236" role="img" aria-labelledby="df3-t">
        <title id="df3-t">A chart with guidance strength on the horizontal axis. How well the image matches the prompt rises and then levels off. Variety and natural look fall as guidance increases. A shaded sweet spot sits in the middle.</title>
        <Legend x={46} y={14} items={[{ tone: "blue", label: "matches the prompt" }, { tone: "amber", label: "variety & natural look" }]} />
        <rect className="t-green-soft" x="150" y="34" width="100" height="160" opacity="0.7" style={{ stroke: "none" }} />
        <text className="fig-note t-green-text" x="200" y="50" textAnchor="middle">sweet spot</text>
        <line className="fig-axis" x1="46" y1="194" x2="406" y2="194" />
        <line className="fig-axis" x1="46" y1="34" x2="46" y2="194" />
        <path className={lineClass("blue")} strokeWidth="2.4" d="M46 176 C 120 82, 210 62, 406 56" />
        <path className={lineClass("amber")} strokeWidth="2.4" d="M46 64 C 170 66, 262 124, 406 182" />
        <text className="fig-tick" x="46" y="210" textAnchor="middle">low</text>
        <text className="fig-tick" x="406" y="210" textAnchor="end">high</text>
        <text className="fig-sub" x="226" y="228" textAnchor="middle">Guidance strength</text>
      </svg>
    </Figure>
  );
}

/* ---------- 4. latent diffusion ---------- */

export function LatentSpace() {
  return (
    <Figure caption="Latent diffusion, the approach behind Stable Diffusion. An encoder squeezes the image into a much smaller grid of numbers, all the denoising happens there, and a decoder turns the result back into a full-size image.">
      <svg viewBox="0 0 420 196" role="img" aria-labelledby="df4-t">
        <title id="df4-t">A 512 by 512 image, 786,432 numbers, is encoded into a 64 by 64 latent of 16,384 numbers. Diffusion runs on the latent, then a decoder produces the full image again.</title>
        <Arrowheads prefix="df4" />
        <text className="fig-note" x="56" y="30" textAnchor="middle">image, 512×512</text>
        <Tile x={12} y={40} size={88} noise={0} seed={5} id="df4-a" />
        <text className="fig-tick" x="56" y="146" textAnchor="middle">786,432 numbers</text>
        <polygon className="t-blue-soft" points="112,40 162,64 162,104 112,128" />
        <text className="fig-tick t-blue-text" x="137" y="88" textAnchor="middle">encoder</text>
        <rect className="t-green-soft" x="186" y="65" width="38" height="38" rx="4" />
        <g className="fig-axis">
          {[1, 2, 3].map((k) => <line key={`v${k}`} x1={186 + k * 9.5} y1="65" x2={186 + k * 9.5} y2="103" />)}
          {[1, 2, 3].map((k) => <line key={`h${k}`} x1="186" y1={65 + k * 9.5} x2="224" y2={65 + k * 9.5} />)}
        </g>
        <path className={lineClass("violet")} d="M193 62 C 186 30, 224 30, 217 60" markerEnd="url(#df4-violet)" strokeWidth="1.6" />
        <text className="fig-note t-violet-text" x="205" y="22" textAnchor="middle">denoising runs here</text>
        <text className="fig-tick" x="205" y="124" textAnchor="middle">latent, 64×64</text>
        <text className="fig-tick" x="205" y="140" textAnchor="middle">16,384 numbers</text>
        <polygon className="t-blue-soft" points="248,64 298,40 298,128 248,104" />
        <text className="fig-tick t-blue-text" x="273" y="88" textAnchor="middle">decoder</text>
        <Tile x={312} y={40} size={88} noise={0} seed={5} id="df4-b" />
        <text className="fig-note" x="356" y="30" textAnchor="middle">new image</text>
        <text className="fig-tick" x="356" y="146" textAnchor="middle">full size again</text>
        <text className="fig-label" x="210" y="180" textAnchor="middle">48× fewer numbers to process at every step</text>
      </svg>
    </Figure>
  );
}
