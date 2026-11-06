import Link from "next/link";
import { M } from "../Math";
import ResearchArticleShell, { ArticleProse, ArticleTips, type ArticleSection } from "../ResearchArticleShell";
import { DeletionCost, DeletionNotEnough, ForgettingTarget, ShardedTraining } from "../diagrams/UnlearningDiagrams";

const sections: ArticleSection[] = [
  {
    id: "problem",
    label: "Why deleting is not enough",
    title: "Why deleting the file is not enough",
    content: <>
      <ArticleProse>
        <p>When a model trains, it does not keep a copy of your photo. It adjusts millions of internal numbers a tiny bit so it does better on examples like yours. Those adjustments stay in the model, and in every copy, backup and product built on it, long after the original file is gone.</p>
      </ArticleProse>
      <DeletionNotEnough />
      <ArticleProse>
        <p>That matters because privacy laws such as the GDPR give people the right to have their data erased. It also matters when data turns out to be wrong, copyrighted or deliberately poisoned. <strong>Machine unlearning</strong> is the study of how to remove what a model learned from specific data, without starting over.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "goal",
    label: "What forgetting means",
    title: "What forgetting should mean",
    content: <ArticleProse>
      <p>Call the full training set <M tex={String.raw`\mathcal{D}`} />, the part someone wants removed the <em>forget set</em> <M tex={String.raw`\mathcal{D}_f`} />, and everything else the <em>retain set</em>, <M tex={String.raw`\mathcal{D}_r = \mathcal{D} \setminus \mathcal{D}_f`} />.</p>
      <p>The goal is not just to make the model worse on the forgotten examples. It is to end up with a model that behaves as if <M tex={String.raw`\mathcal{D}_f`} /> <strong>had never been in the training set at all</strong>.</p>
    </ArticleProse>,
  },
  {
    id: "retraining",
    label: "Retraining from scratch",
    title: "The honest answer: retrain from scratch",
    content: <>
      <ArticleProse>
        <p>The cleanest way to forget is to throw the model away and train a new one on the retain set only. By construction, it never saw the deleted data. This is the gold standard that every other method is measured against.</p>
        <p>The problem is cost. Training a large model can take days or weeks of expensive hardware. If deletion requests arrive every day, retraining every time is not realistic.</p>
      </ArticleProse>
      <DeletionCost />
    </>,
  },
  {
    id: "exact-approximate",
    label: "Exact vs approximate",
    title: "Exact and approximate forgetting",
    content: <ArticleProse>
      <p><strong>Exact unlearning</strong> guarantees the result is just as if you had retrained without the data. Because training itself involves randomness, &ldquo;the same&rdquo; means the same range of possible outcomes, not identical numbers.</p>
      <p><strong>Approximate unlearning</strong> settles for getting close to retraining, within a measurable margin. It is much faster and works on large neural networks, but raises a hard question: how close is close enough, and how could an outsider check?</p>
      <p>A warning: fine-tuning a model until it stops <em>saying</em> something is not the same as forgetting it. The information may still be inside and easy to bring back.</p>
    </ArticleProse>,
  },
  {
    id: "methods",
    label: "How it is done",
    title: "How unlearning is done",
    content: <>
      <ArticleTips>
        <li><strong>Plan for deletion from the start.</strong> Split the data into separate pieces and train one small model per piece, then combine their answers. A deletion only means retraining the piece that held the data. This is called SISA.</li>
        <li><strong>Undo the effect directly.</strong> Estimate how the model&rsquo;s numbers would have been different without certain examples, and shift them back. Neat in theory, harder to trust in very large networks.</li>
        <li><strong>Train it to forget.</strong> Briefly train the model to do worse on the forget set while staying good on the retain set. Fast, but approximate.</li>
        <li><strong>Limit what any one example can teach.</strong> Training with privacy-preserving methods caps how much a single record can change the model, so later removal has less to undo.</li>
      </ArticleTips>
      <ShardedTraining />
      <ArticleProse>
        <p>The right method also depends on what is being forgotten: one photo, one person, a whole category, a visual style or a batch of poisoned data are very different jobs.</p>
      </ArticleProse>
    </>,
  },
  {
    id: "evaluation",
    label: "How to check it worked",
    title: "How to check it worked",
    content: <>
      <ArticleProse>
        <p>There is no single &ldquo;forgetting score&rdquo;. A careful check compares the unlearned model with two others: the original, and a model properly retrained without the deleted data.</p>
      </ArticleProse>
      <ForgettingTarget />
      <ArticleTips>
        <li><strong>Forgetting:</strong> on the deleted examples, behave like the retrained model, not simply break.</li>
        <li><strong>Usefulness:</strong> stay good on everything else.</li>
        <li><strong>Privacy:</strong> an attacker testing whether an example was in the training set should not be able to tell.</li>
        <li><strong>No easy relearning:</strong> a little extra training should not instantly bring the forgotten knowledge back.</li>
        <li><strong>Cost:</strong> report the time and memory used, compared with full retraining.</li>
      </ArticleTips>
    </>,
  },
  {
    id: "federated",
    label: "In federated learning",
    title: "Forgetting in federated learning",
    content: <ArticleProse>
      <p>In <Link href="/writing/federated-learning">federated learning</Link>, many participants train one shared model without sharing their data. If one participant leaves, or turns out to have sent harmful updates, their influence is mixed into many rounds of averaging, and the server never had their data in the first place.</p>
      <p>Options include replaying training from saved checkpoints without that participant, subtracting an estimate of their contribution, or retraining only the affected rounds. Because every participant&rsquo;s data is different, removing one can also shift how well the model works for the others.</p>
    </ArticleProse>,
  },
  {
    id: "limits",
    label: "Limits",
    title: "Where it quietly fails",
    content: <ArticleProse>
      <p>Unlearning can fail without anyone noticing. Answers may change while the knowledge is still recoverable inside the model. Overall accuracy may look fine while a small group of users is hurt. Many approximate deletions in a row can add up. And old copies of the model may live on in backups or other products.</p>
      <p>So unlearning is not only an algorithm. It also needs records of which data went into which model, sensible checkpoint and backup policies, and honesty about what kind of guarantee is actually being given.</p>
    </ArticleProse>,
  },
  {
    id: "checklist",
    label: "A practical checklist",
    title: "A practical checklist",
    content: <ArticleTips>
      <li><strong>Decide what must be forgotten.</strong> One record, one person, a category, a concept, or everything built from it?</li>
      <li><strong>Choose the guarantee first.</strong> Exact, approximate with a proof, or tested in practice?</li>
      <li><strong>Keep a retrained reference.</strong> Even at small scale, it shows what &ldquo;forgotten&rdquo; should look like.</li>
      <li><strong>Test more than accuracy.</strong> Include privacy attacks, effects on different groups, and relearning.</li>
      <li><strong>Track every copy.</strong> Models, adapters, search indexes, caches, logs and backups all need a deletion plan.</li>
      <li><strong>Be honest about uncertainty.</strong> &ldquo;Forgotten&rdquo; should never mean &ldquo;we stopped checking&rdquo;.</li>
    </ArticleTips>,
  },
];

export default function ArticleUnlearning() {
  return <ResearchArticleShell
    slug="machine-unlearning"
    introduction={<>
      <p>Suppose you ask a company to delete your photos. They remove them from their servers. But a model they trained last year learned from those photos, and deleting the files does nothing to the model.</p>
      <p>Machine unlearning asks: can we update a trained model so that specific data no longer has any influence, without throwing the model away and starting over? This post explains the problem, the main approaches, and how to tell whether forgetting actually worked.</p>
    </>}
    sections={sections}
    references={[
      { text: "Bourtoule et al. Machine Unlearning (SISA training) (2019).", href: "https://arxiv.org/abs/1912.03817" },
      { text: "Guo et al. Certified Data Removal from Machine Learning Models (2020).", href: "https://proceedings.mlr.press/v119/guo20c.html" },
      { text: "Ullah et al. Machine Unlearning via Algorithmic Stability (2021).", href: "https://proceedings.mlr.press/v134/ullah21a.html" },
    ]}
  />;
}
