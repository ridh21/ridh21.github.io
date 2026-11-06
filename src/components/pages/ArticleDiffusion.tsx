import { M, MathBlock } from "../Math";
import ResearchArticleShell, { ArticleProse, ArticleTips, type ArticleSection } from "../ResearchArticleShell";
import { DenoiseTraining, GuidanceChart, LatentSpace, NoiseStrip } from "../diagrams/DiffusionDiagrams";

const sections: ArticleSection[] = [
  {
    id: "idea",
    label: "The big idea",
    title: "The big idea: learn to clean up noise",
    content: <>
      <ArticleProse>
        <p>Take any photo, say of a cat, and sprinkle a little random static over it. Do that again, and again. After enough rounds the photo is gone and all that is left is noise, like an old TV with no signal.</p>
        <p>Going that way is easy and needs no intelligence at all. Going the other way, from static back to a picture, is the hard part, and that is exactly what a diffusion model learns to do. It never learns to make a picture in one go. It only learns to make a noisy picture <em>slightly less noisy</em>.</p>
      </ArticleProse>
      <NoiseStrip />
      <ArticleProse>
        <p>Once a model can take one small step from noisier to cleaner, you can chain hundreds of those steps together. Start from pure static, step, step, step, and an image appears. Because the starting static is random, you get a different image every time.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "forward",
    label: "Adding noise",
    title: "Step one: destroying images on purpose",
    content: <>
      <ArticleProse>
        <p>During training, we take real images and add noise to them according to a fixed recipe, called a <strong>noise schedule</strong>. Early steps add only a whisper of noise; by the last step (often step 1,000) the image is indistinguishable from pure static.</p>
        <p>A handy shortcut: we never need to add noise a thousand times in a row. There is a formula that jumps straight to any step <M tex="t" /> by mixing the clean image <M tex="x_0" /> with fresh noise <M tex={String.raw`\epsilon`} />:</p>
      </ArticleProse>
      <MathBlock label="Forward diffusion equation" tex={String.raw`x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1 - \bar{\alpha}_t}\, \epsilon`} />
      <ArticleProse>
        <p>You can read it as a slider. The number <M tex={String.raw`\bar{\alpha}_t`} /> says how much of the original image survives at step <M tex="t" />: close to 1 at the start, so it is mostly image; close to 0 at the end, so it is mostly noise.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "training",
    label: "How it learns",
    title: "Step two: learning to guess the noise",
    content: <>
      <ArticleProse>
        <p>Here is the clever part. Instead of asking the network &ldquo;what should the clean image look like?&rdquo;, we ask an easier question: <strong>&ldquo;which noise was added to this image?&rdquo;</strong> If it can answer that, we can subtract the noise and get a cleaner image.</p>
      </ArticleProse>
      <DenoiseTraining />
      <ArticleProse>
        <p>The network is usually a U-Net or a transformer. It is also told how noisy the image is (the step number), and optionally a description of what the image shows, such as a text prompt. Training simply measures how far its guess is from the real noise, and nudges it to do better:</p>
      </ArticleProse>
      <MathBlock label="Diffusion training objective" tex={String.raw`\mathcal{L} = \mathbb{E}_{x_0,\, \epsilon,\, t}\left[\, \lVert \epsilon - \epsilon_\theta(x_t, t, c) \rVert^2 \,\right]`} />
      <ArticleProse>
        <p>In words: average, over many images, noise samples and steps, the squared gap between the true noise <M tex={String.raw`\epsilon`} /> and the network&rsquo;s guess <M tex={String.raw`\epsilon_\theta`} />. The <M tex="c" /> is the optional description, such as text, a class label, a pose or another image.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "sampling",
    label: "Making a new image",
    title: "Step three: making a brand new image",
    content: <ArticleProse>
      <p>To generate, we start from pure random noise, <M tex={String.raw`x_T \sim \mathcal{N}(0, \mathbf{I})`} />, and repeat: ask the network for its noise guess, remove a bit of it, move to the next step. The early steps decide the big picture (where the cat sits, roughly what colours); the late steps add edges, texture and fine detail.</p>
      <p>The original method (DDPM) needs many steps, so it is slow. A later method (DDIM) showed the same trained network can take far fewer, larger steps. Modern samplers keep playing with the same trade-off: fewer steps are faster, more careful steps can look better.</p>
    </ArticleProse>,
  },
  {
    id: "guidance",
    label: "Steering with a prompt",
    title: "Steering it with a prompt",
    content: <>
      <ArticleProse>
        <p>Text-to-image tools turn your prompt into numbers and feed them to the network at every step, so its noise guesses lean toward images that fit the description.</p>
        <p>A trick called <strong>classifier-free guidance</strong> makes the steering stronger. The network makes two guesses, one with your prompt and one without, and the tool pushes further in the direction where they differ. Turn that knob up and images follow the prompt more literally; turn it too far and they become flat, over-saturated and all alike.</p>
      </ArticleProse>
      <GuidanceChart />
    </>,
  },
  {
    id: "latent",
    label: "Working in a smaller space",
    title: "Why most models work in a smaller space",
    content: <>
      <ArticleProse>
        <p>Running hundreds of denoising steps on every pixel of a large image is expensive. <strong>Latent diffusion</strong> first compresses the image into a much smaller grid of numbers using an encoder, does all the denoising there, and only at the end turns the result back into pixels with a decoder.</p>
      </ArticleProse>
      <LatentSpace />
      <ArticleProse>
        <p>The compression throws away detail you would barely notice while keeping the layout and meaning of the image, which makes training and generation far cheaper. The catch: anything the compression threw away can never come back, so the decoder sets a ceiling on how sharp the final image can be.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "limits",
    label: "What can go wrong",
    title: "What can go wrong",
    content: <ArticleTips>
      <li><strong>It is slow by design.</strong> Each step depends on the one before, so generating an image takes many passes through the network, not one.</li>
      <li><strong>A prompt is a nudge, not a contract.</strong> Guidance steers toward likely images; it does not guarantee the right number of fingers, exact text or correct facts.</li>
      <li><strong>The data shows through.</strong> Biases, gaps and duplicated images in the training set can reappear in what the model makes, sometimes as near-copies.</li>
      <li><strong>Good scores are not the whole story.</strong> Common metrics check that images look realistic overall, not that they are accurate, original or safe.</li>
    </ArticleTips>,
  },
  {
    id: "mental-model",
    label: "The mental model",
    title: "The mental model",
    content: <ArticleProse>
      <p>A diffusion model is a very good noise remover. Training teaches it to clean up a slightly noisy image at every level of noise. Generation chains those small clean-ups together, turning random static into a picture one step at a time.</p>
      <p>Everything else, from samplers and guidance to latent spaces and prompts, is about where that journey happens and how firmly we steer it.</p>
    </ArticleProse>,
  },
];

export default function ArticleDiffusion() {
  return <ResearchArticleShell
    slug="diffusion-models"
    introduction={<>
      <p>Tools like Stable Diffusion and DALL·E can turn a sentence into a detailed picture in seconds. Under the hood, most of them rely on the same surprisingly simple idea: learn how to remove noise, then start from pure noise and keep removing it.</p>
      <p>This post walks through how that works, using pictures first and maths only where it helps.</p>
    </>}
    sections={sections}
    references={[
      { text: "Ho, Jain, and Abbeel. Denoising Diffusion Probabilistic Models (2020).", href: "https://arxiv.org/abs/2006.11239" },
      { text: "Song, Meng, and Ermon. Denoising Diffusion Implicit Models (2020).", href: "https://arxiv.org/abs/2010.02502" },
      { text: "Ho and Salimans. Classifier-Free Diffusion Guidance (2022).", href: "https://arxiv.org/abs/2207.12598" },
      { text: "Rombach et al. High-Resolution Image Synthesis with Latent Diffusion Models (2022).", href: "https://arxiv.org/abs/2112.10752" },
    ]}
  />;
}
