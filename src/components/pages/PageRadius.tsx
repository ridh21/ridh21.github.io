import ResearchArticleShell, { ArticleProse, ArticleTips, type ArticleSection } from "../ResearchArticleShell";

const sections: ArticleSection[] = [
  {
    id: "intuition",
    label: "Noise with direction",
    title: "Noise with direction",
    content: <ArticleProse>
      <p>Imagine dropping ink into water. The forward direction is easy: the ink spreads until the original pattern disappears. Reconstructing the exact drop is impossible, but a model can learn the statistical direction toward images that look plausible.</p>
      <p>A diffusion model does not uncover a photograph hidden inside a noise field. It follows a learned probability landscape, nudging an arbitrary point toward regions where training-like data is likely to live.</p>
    </ArticleProse>,
  },
  {
    id: "forward-process",
    label: "The forward process",
    title: "The forward process",
    content: <>
      <ArticleProse>
        <p>Start with a clean sample <code className="inline-code">x₀</code>. At every timestep, add a small amount of Gaussian noise according to a variance schedule. After enough steps, the result <code className="inline-code">xₜ</code> becomes almost indistinguishable from standard normal noise.</p>
        <p>During training, we can skip simulating every earlier step and directly mix the clean sample with fresh noise:</p>
      </ArticleProse>
      <div className="code-block" aria-label="Forward diffusion equation"><div className="code-head"><span className="code-lang">MATH</span></div><pre><code><span className="code-line"><span className="code-line-text">xₜ = √ᾱₜ · x₀ + √(1 − ᾱₜ) · ε</span></span></code></pre></div>
      <ArticleProse>
        <p>Here, <code className="inline-code">ε</code> is sampled noise and <code className="inline-code">ᾱₜ</code> tells us how much signal survives at timestep <code className="inline-code">t</code>. Early steps retain the scene; late steps retain almost none of it.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "learning-reverse",
    label: "Learning the reverse",
    title: "Learning the reverse",
    content: <>
      <ArticleProse>
        <p>A neural network—commonly a U-Net or diffusion transformer—receives the noisy sample and its timestep. In the standard DDPM formulation, it is trained to predict the noise that was added.</p>
        <p>The objective is surprisingly plain: compare the true noise with the predicted noise using mean squared error. Repeating this across images and noise levels teaches the network what structure looks like at every stage of corruption.</p>
      </ArticleProse>
      <div className="code-block" aria-label="Diffusion training objective"><div className="code-head"><span className="code-lang">OBJECTIVE</span></div><pre><code><span className="code-line"><span className="code-line-text">L = E[‖ε − εθ(xₜ, t, c)‖²]</span></span></code></pre></div>
      <ArticleProse><p>The optional <code className="inline-code">c</code> is conditioning information such as text, a class label, depth, pose, or another image.</p></ArticleProse>
    </>,
  },
  {
    id: "sampling",
    label: "Sampling",
    title: "Sampling is iterative refinement",
    content: <ArticleProse>
      <p>Generation starts at <code className="inline-code">xₜ ∼ N(0, I)</code>. A sampler asks the network for a denoising direction, takes one step, and repeats. Early steps determine broad composition; later steps resolve edges, texture, and local detail.</p>
      <p>DDPM sampling is stochastic and historically required many sequential steps. DDIM showed that the same training objective could support a non-Markovian, often deterministic path with far fewer evaluations. Modern schedulers continue the same trade-off: fewer steps improve speed, while more careful trajectories can improve fidelity or diversity.</p>
    </ArticleProse>,
  },
  {
    id: "conditioning",
    label: "Conditioning and guidance",
    title: "Conditioning and guidance",
    content: <ArticleProse>
      <p>Text-to-image systems encode a prompt into vectors and expose them to the denoiser, usually through attention. The model then predicts noise in a way that is consistent with both the current latent and the prompt.</p>
      <p>Classifier-free guidance evaluates conditional and unconditional predictions, then amplifies their difference. Higher guidance usually makes the prompt more explicit, but too much can flatten color, reduce diversity, and create brittle artifacts. Guidance is a control knob, not a free quality upgrade.</p>
    </ArticleProse>,
  },
  {
    id: "latent-diffusion",
    label: "Latent diffusion",
    title: "Why diffuse in latent space?",
    content: <ArticleProse>
      <p>Running every step over full-resolution pixels is expensive. Latent diffusion first compresses an image with an autoencoder, performs diffusion in that smaller representation, and decodes the final latent back to pixels.</p>
      <p>Compression removes some imperceptible detail while retaining semantics and spatial structure. That makes training and sampling much cheaper, but the decoder also becomes part of the quality ceiling: details discarded by the representation cannot be recovered perfectly later.</p>
    </ArticleProse>,
  },
  {
    id: "limitations",
    label: "What can go wrong",
    title: "What can go wrong",
    content: <ArticleTips>
      <li><strong>Sampling is sequential.</strong> Each denoising step depends on the previous one, so generation remains slower than a single feed-forward pass.</li>
      <li><strong>Prompts are not specifications.</strong> Conditioning steers a distribution; it does not guarantee exact counts, geometry, typography, or facts.</li>
      <li><strong>Data becomes behavior.</strong> Biases, duplication, memorization, and missing concepts in the dataset can surface in outputs.</li>
      <li><strong>Metrics are incomplete.</strong> Distributional similarity does not prove compositional accuracy, originality, safety, or usefulness.</li>
    </ArticleTips>,
  },
  {
    id: "mental-model",
    label: "The mental model",
    title: "The mental model to keep",
    content: <ArticleProse>
      <p>A diffusion model is a learned denoising field. Training teaches local directions at many noise levels. Sampling chains those local directions into a global journey from randomness to data.</p>
      <p>Once that clicks, noise schedules, samplers, guidance, latent spaces, and control signals become choices about where the journey happens and how strongly we steer it.</p>
    </ArticleProse>,
  },
];

export default function PageRadius() {
  return <ResearchArticleShell
    number="001"
    title="Diffusion Models 101"
    meta="Published 16 September 2026, 8 min read"
    introduction={<>
      <p>Diffusion models learn to create structure by reversing destruction. During training, we gradually corrupt real data with noise. The model studies that corruption and learns the small correction required to move in the opposite direction.</p>
      <p>At generation time there is no source image to restore. We begin with random noise and repeatedly apply those learned corrections until a coherent sample appears.</p>
    </>}
    sections={sections}
    references={[
      { text: "Ho, Jain, and Abbeel. Denoising Diffusion Probabilistic Models (2020).", href: "https://arxiv.org/abs/2006.11239" },
      { text: "Song, Meng, and Ermon. Denoising Diffusion Implicit Models (2020).", href: "https://arxiv.org/abs/2010.02502" },
    ]}
  />;
}
