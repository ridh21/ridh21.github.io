import Link from "next/link";
import { M, MathBlock } from "../Math";
import ResearchArticleShell, { ArticleProse, ArticleTips, type ArticleSection } from "../ResearchArticleShell";
import { CentralVsFederated, DifferentData, PrivacyLayers, TrainingRound, WeightedAverage } from "../diagrams/FederatedDiagrams";

const sections: ArticleSection[] = [
  {
    id: "problem",
    label: "Why not pool the data?",
    title: "Why not just pool the data?",
    content: <ArticleProse>
      <p>Machine learning models get better with more examples. The obvious move is to copy everyone&rsquo;s data to one server and train there. Often that is not allowed, or not wise.</p>
      <p>Medical records are protected by law. Banks cannot share customer transactions with each other. Your phone has years of your typing, photos and voice, and you would rather it stayed on your phone. Even when sharing is legal, moving terabytes of data around is slow and expensive, and every extra copy is one more thing that can leak.</p>
      <p>So the data is stuck where it is. Federated learning asks: if the data cannot come to the model, can the model go to the data?</p>
    </ArticleProse>,
  },
  {
    id: "idea",
    label: "The core idea",
    title: "Send the model, not the data",
    content: <>
      <ArticleProse>
        <p>In federated learning, a central server holds one shared model but never sees any raw data. Instead, it sends a copy of the model to each participant, called a <strong>client</strong>. A client might be a hospital, a bank, or a single phone.</p>
        <p>Each client improves its copy using only its own data, then sends back just the changes it made. The server combines those changes into a better shared model. The data never moves; only what the model learned from it does.</p>
      </ArticleProse>
      <CentralVsFederated />
    </>,
  },
  {
    id: "round",
    label: "One round, step by step",
    title: "One round, step by step",
    content: <>
      <ArticleProse>
        <p>Training happens in <strong>rounds</strong>. Every round has the same four steps:</p>
      </ArticleProse>
      <TrainingRound />
      <ArticleTips>
        <li><strong>The server sends out the current model.</strong> Every participating hospital receives an identical copy.</li>
        <li><strong>Each hospital trains it locally.</strong> It runs ordinary training on its own patients for a short while, so its copy gets a little better at its own cases.</li>
        <li><strong>Each hospital sends back only its update.</strong> That is the difference between the model it received and the model it ended up with: a list of numbers, not patient records.</li>
        <li><strong>The server averages the updates.</strong> The result becomes the new shared model, and the next round begins.</li>
      </ArticleTips>
      <ArticleProse>
        <p>After tens or hundreds of rounds, the shared model has learned from every hospital&rsquo;s patients without any of them ever leaving the building.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "averaging",
    label: "How the averaging works",
    title: "How the averaging works",
    content: <>
      <ArticleProse>
        <p>The standard recipe is called <strong>Federated Averaging</strong>, or FedAvg. It is a weighted average: a hospital that trained on more patients gets a bigger say than one that trained on fewer.</p>
      </ArticleProse>
      <WeightedAverage />
      <ArticleProse>
        <p>Written as a formula, if client <M tex="k" /> has <M tex="n_k" /> examples out of <M tex="n" /> in total, and returns model weights <M tex={String.raw`w^{k}`} />, the new shared model is</p>
      </ArticleProse>
      <MathBlock label="Federated averaging" tex={String.raw`w_{\text{new}} = \sum_{k=1}^{K} \frac{n_k}{n}\, w^{k}`} />
      <ArticleProse>
        <p>That is the whole trick. In the example above, <M tex={String.raw`\tfrac{1000}{2000} = 50\%`} /> for Hospital A, <M tex="30\%" /> for B and <M tex="20\%" /> for C.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "where",
    label: "Where it is used",
    title: "Where it is used",
    content: <ArticleProse>
      <p>One of the best-known deployments is Google&rsquo;s Gboard keyboard, which used federated learning to improve next-word suggestions from what people type on their phones, without uploading the text itself.</p>
      <p>Other common settings follow the same pattern: hospitals building diagnostic models together, banks spotting fraud patterns across institutions, and cars or cameras learning from what they see on the road. Anywhere data is valuable but cannot be pooled, federated learning is a candidate.</p>
    </ArticleProse>,
  },
  {
    id: "hard",
    label: "What makes it hard",
    title: "What makes it hard",
    content: <>
      <ArticleProse>
        <p><strong>Every client&rsquo;s data looks different.</strong> In a normal training set the examples are shuffled together. Here they are not. A children&rsquo;s hospital sees mostly children; a heart clinic sees mostly older patients. Researchers call this <em>non-IID</em> data (not independent and identically distributed).</p>
      </ArticleProse>
      <DifferentData />
      <ArticleProse>
        <p>When clients see such different data, their updates can pull the shared model in opposite directions, and averaging them can produce a model that is worse for everyone. A lot of federated learning research is about handling exactly this.</p>
        <p><strong>Communication is the bottleneck.</strong> Models can have millions of numbers, and sending them back and forth every round over a phone connection is slow. That is why each client trains for a while locally before reporting back, instead of after every single example.</p>
        <p><strong>Clients come and go.</strong> Phones go offline, run low on battery or are simply busy. Each round usually uses whichever clients happen to be available, so the system has to cope with partial participation.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "privacy",
    label: "Is it automatically private?",
    title: "Is it automatically private?",
    content: <>
      <ArticleProse>
        <p>No. Keeping data on the device is a big step, but the updates themselves can leak information. Researchers have shown that, in some settings, an attacker who sees an individual update can reconstruct training examples, such as images, from it.</p>
        <p>Two protections are commonly layered on top:</p>
      </ArticleProse>
      <PrivacyLayers />
      <ArticleProse>
        <p><strong>Differential privacy</strong> adds carefully measured random noise to each update, so that no single person&rsquo;s data can noticeably change what is sent. <strong>Secure aggregation</strong> uses cryptography so the server can compute the sum of all updates without being able to see any individual one.</p>
        <p>There is also the opposite problem: a client can be dishonest and send poisoned updates that quietly damage the shared model. Detecting such clients, and removing the influence they already had, is an active research area, called <Link href="/writing/machine-unlearning">federated unlearning</Link>.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "mental-model",
    label: "The mental model",
    title: "The mental model",
    content: <ArticleTips>
      <li><strong>Move the model, not the data.</strong> Raw data stays with whoever owns it.</li>
      <li><strong>Learn in rounds.</strong> Send the model out, train locally, send updates back, average.</li>
      <li><strong>Bigger datasets get a bigger say</strong> in the average.</li>
      <li><strong>Different data is the main difficulty.</strong> Clients rarely see the same kinds of examples.</li>
      <li><strong>Private by design, not by default.</strong> Updates can still leak, so add noise and secure aggregation when it matters.</li>
    </ArticleTips>,
  },
];

export default function ArticleFederated() {
  return <ResearchArticleShell
    slug="federated-learning"
    introduction={<>
      <p>Imagine three hospitals that each want a better model for reading chest X-rays. Together they have far more scans than any one of them alone, and a model trained on all of them would be better for every patient. But patient records cannot leave the building.</p>
      <p>Federated learning is a way to train one shared model on all of that data without ever collecting it in one place. This post explains how it works in plain language, with just one short formula.</p>
    </>}
    sections={sections}
    references={[
      { text: "McMahan et al. Communication-Efficient Learning of Deep Networks from Decentralized Data (2017).", href: "https://arxiv.org/abs/1602.05629" },
      { text: "Hard et al. Federated Learning for Mobile Keyboard Prediction (2018).", href: "https://arxiv.org/abs/1811.03604" },
      { text: "Zhu, Liu, and Han. Deep Leakage from Gradients (2019).", href: "https://arxiv.org/abs/1906.08935" },
      { text: "Bonawitz et al. Practical Secure Aggregation for Privacy-Preserving Machine Learning (2017).", href: "https://eprint.iacr.org/2017/281" },
      { text: "Kairouz et al. Advances and Open Problems in Federated Learning (2019).", href: "https://arxiv.org/abs/1912.04977" },
    ]}
  />;
}
