import ResearchArticleShell, { ArticleProse, ArticleTips, type ArticleSection } from "../ResearchArticleShell";

const sections: ArticleSection[] = [
  {
    id: "problem",
    label: "The deletion problem",
    title: "The deletion problem",
    content: <ArticleProse>
      <p>Suppose a model was trained on dataset <code className="inline-code">D</code>, and a user asks us to remove subset <code className="inline-code">Dᶠ</code>. The retained data is <code className="inline-code">Dʳ = D \ Dᶠ</code>.</p>
      <p>An unlearning algorithm receives the trained model and the deletion request, then returns a new model. The desired result is not merely worse performance on forgotten examples. It should resemble the model we would have obtained had <code className="inline-code">Dᶠ</code> never participated in training.</p>
    </ArticleProse>,
  },
  {
    id: "gold-standard",
    label: "The gold standard",
    title: "Retraining is the gold standard",
    content: <ArticleProse>
      <p>The cleanest solution is to discard the old model and train again from scratch on <code className="inline-code">Dʳ</code>. This produces a reference model with no training path through the removed data.</p>
      <p>It is also expensive. Large models may take days, specialized hardware, and a reproducible copy of the entire training pipeline. If deletion requests arrive continuously, complete retraining after every request is usually unrealistic.</p>
      <p>Unlearning therefore optimizes a triangle: forgetting quality, retained utility, and computational cost. Improving one corner often puts pressure on another.</p>
    </ArticleProse>,
  },
  {
    id: "exact-approximate",
    label: "Exact vs approximate",
    title: "Exact and approximate unlearning",
    content: <ArticleProse>
      <p><strong>Exact unlearning</strong> aims for the distribution of unlearned models to match the distribution produced by retraining without the forgotten data. Equality of parameter values is not always required because training itself can be random; equivalence is defined over outcomes.</p>
      <p><strong>Approximate unlearning</strong> accepts a bounded, measurable difference from retraining. This makes more methods practical for deep networks, but creates the central verification problem: how much residual influence is acceptable, and how can an external observer know?</p>
      <p>Fine-tuning until a model answers a few prompts differently is not automatically unlearning. It may suppress visible outputs while leaving internal representations or extractable information intact.</p>
    </ArticleProse>,
  },
  {
    id: "methods",
    label: "How unlearning works",
    title: "How unlearning methods work",
    content: <>
      <ArticleTips>
        <li><strong>Design for retraining.</strong> SISA partitions data into isolated shards and slices, trains separate models, and aggregates them. A deletion only retrains the affected shard from an earlier checkpoint.</li>
        <li><strong>Reverse the update.</strong> Influence- or curvature-based methods estimate how parameters would change if selected examples were absent. They can be efficient for well-behaved objectives but harder to trust in large non-convex networks.</li>
        <li><strong>Optimize forgetting directly.</strong> Approximate methods raise loss on forgotten data while preserving performance on retained data, often with regularization, distillation, or parameter constraints.</li>
        <li><strong>Limit influence during learning.</strong> Stable or differentially private training can reduce how much any one record changes the model, making later deletion easier to bound.</li>
      </ArticleTips>
      <ArticleProse><p>The method has to match the deletion unit. Forgetting one example, one user, one class, a visual concept, or a poisoned batch are different interventions with different success criteria.</p></ArticleProse>
    </>,
  },
  {
    id: "evaluation",
    label: "How to evaluate it",
    title: "How to evaluate unlearning",
    content: <>
      <ArticleProse><p>There is no single accuracy number for forgetting. A credible evaluation compares the unlearned model with both the original model and a retrained reference.</p></ArticleProse>
      <ArticleTips>
        <li><strong>Forget quality:</strong> behavior on deleted examples should approach the retrained reference, not simply collapse.</li>
        <li><strong>Retain utility:</strong> performance on retained and unseen data should remain useful.</li>
        <li><strong>Privacy resistance:</strong> membership-inference or extraction attacks should not reliably recover whether forgotten samples participated.</li>
        <li><strong>Relearning resistance:</strong> a small amount of fine-tuning should not instantly recover a supposedly removed concept from dormant representations.</li>
        <li><strong>Efficiency:</strong> report time, memory, checkpoints, retained-data access, and repeated-deletion cost against full retraining.</li>
      </ArticleTips>
    </>,
  },
  {
    id: "federated",
    label: "Federated unlearning",
    title: "Federated unlearning",
    content: <ArticleProse>
      <p>Federated learning keeps raw client data decentralized, but client updates still influence a shared global model. When one client asks to leave, the server may need to remove a sequence of aggregated contributions without possessing that client’s original data.</p>
      <p>Possible strategies include replaying stored global checkpoints without the client, subtracting estimated updates, retraining selected rounds, or distilling a corrected global model. Non-IID client data and partial participation make verification especially difficult: removing a client can change both privacy and fairness for the clients who remain.</p>
    </ArticleProse>,
  },
  {
    id: "limits",
    label: "Limits and failure modes",
    title: "Limits and failure modes",
    content: <ArticleProse>
      <p>A model can fail a deletion request in quiet ways. Outputs may change while internal features remain separable. Aggregate test accuracy may stay stable while a minority subgroup degrades. Repeated requests may accumulate approximation error. Copies of the model may survive in backups or downstream deployments even if the primary checkpoint is corrected.</p>
      <p>Unlearning is therefore a systems problem, not only an optimizer trick. Data lineage, checkpoint policy, derived artifacts, audit logs, deployment inventory, and a clear threat model are part of the guarantee.</p>
    </ArticleProse>,
  },
  {
    id: "checklist",
    label: "A practical checklist",
    title: "A practical checklist",
    content: <ArticleTips>
      <li><strong>Define what must be forgotten.</strong> A record, user, class, concept, or every downstream artifact?</li>
      <li><strong>Choose the guarantee first.</strong> Exact, certified approximate, or empirical removal?</li>
      <li><strong>Build a retrained reference.</strong> At least on representative scales, it anchors the evaluation.</li>
      <li><strong>Measure more than accuracy.</strong> Test privacy attacks, retained utility, subgroup effects, and relearning.</li>
      <li><strong>Track the full system.</strong> Models, adapters, indexes, caches, logs, backups, and consumers all need deletion semantics.</li>
      <li><strong>Document uncertainty.</strong> If the guarantee is empirical, say so. “Forgotten” should never mean “we stopped checking.”</li>
    </ArticleTips>,
  },
];

export default function PageOverconsumption() {
  return <ResearchArticleShell
    number="002"
    title="Machine Unlearning 101"
    meta="Published 16 September 2026, 9 min read"
    introduction={<>
      <p>Deleting a training record from storage does not delete what a model learned from it. The record may already have influenced parameters, checkpoints, embeddings, caches, and downstream models.</p>
      <p>Machine unlearning asks a harder question: can we efficiently update a trained system so selected data no longer influences its behavior, while preserving everything the system should retain?</p>
    </>}
    sections={sections}
    references={[
      { text: "Bourtoule et al. Machine Unlearning and SISA training (2019).", href: "https://arxiv.org/abs/1912.03817" },
      { text: "Guo et al. Certified Data Removal from Machine Learning Models (2020).", href: "https://proceedings.mlr.press/v119/guo20c.html" },
      { text: "Ullah et al. Machine Unlearning via Algorithmic Stability (2021).", href: "https://proceedings.mlr.press/v134/ullah21a.html" },
    ]}
  />;
}
