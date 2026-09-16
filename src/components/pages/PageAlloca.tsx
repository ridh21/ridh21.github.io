/* Reference markup transcribed to editable React components. */
import type { CSSProperties } from "react";
export default function PageAlloca() { return <>

<main className={"site"}><section className={"intro-section article-page case-study-page"} aria-label={"Case study"}><div className={"content"}><nav className={"article-index appear"} aria-label={"Contents"} style={{"--appear-delay": "0ms"} as CSSProperties}><h2 className={"article-index-title"}><a className={"article-index-back"} aria-label={"Back to home"} href={"/"}><svg viewBox={"-1 -1 12.5 12.224"} width={"10"} height={"10"} fill={"none"} aria-hidden={"true"} overflow={"visible"}><path d={"M 3.592 0 L 6.77 0 C 8.83 0 10.5 1.67 10.5 3.73 L 10.5 3.73 C 10.5 5.79 8.83 7.461 6.77 7.461 L 0 7.461 L 0.138 7.461"} stroke={"currentColor"} strokeWidth={"0.88"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
<path d={"M 2.763 10.224 L 0 7.461 L 2.763 4.697"} stroke={"currentColor"} strokeWidth={"0.88"} strokeLinecap={"round"} strokeLinejoin={"round"}></path>
</svg>
</a>
</h2>
<ol className={"article-index-list"}><li className={""}><a href={"#context"}><span className={"scramble-text link-label"}><span className={"scramble-original"}>{"Context"}</span>
</span>
</a>
</li>
<li className={""}><a href={"#research"}><span className={"scramble-text link-label"}><span className={"scramble-original"}>{"Research"}</span>
</span>
</a>
</li>
<li className={""}><a href={"#system"}><span className={"scramble-text link-label"}><span className={"scramble-original"}>{"System"}</span>
</span>
</a>
</li>
<li className={""}><a href={"#screens"}><span className={"scramble-text link-label"}><span className={"scramble-original"}>{"Screens"}</span>
</span>
</a>
</li>
</ol>
</nav>
<header className={"article-header case-study-header appear"} style={{"--appear-delay": "0ms"} as CSSProperties}><h1 className={"article-title"}>{"Alloca Launchpad"}</h1>
<p className={"article-meta"}>{"Product design"}</p>
<p className={"case-study-summary"}>{"A complete redesign of an existing crypto launchpad. Beyond improving the interface, the job included helping shape how the product should work."}</p>
</header>
<div className={"link-divider"} aria-hidden={"true"}></div>
<article className={"article-body appear"} style={{"--appear-delay": "80ms"} as CSSProperties}><section id={"context"} className={"article-section"} aria-labelledby={"context-title"}><h2 id={"context-title"} className={"article-subhead"}>{"Context"}</h2>
<div className={"article-prose"}><p>{"Alloca is a crypto launchpad. The first version was very limited, so the redesign went deeper than UI and touched the product itself."}</p>
<p>{"The platform combines three different worlds: Chad Sales, Internet Capital Markets sales, and memecoins. Each attracts its own users and behaviors, so the product had to feel playful and fast in some places, structured and trustworthy in others."}</p>
</div>
</section>
<section id={"research"} className={"article-section"} aria-labelledby={"research-title"}><h2 id={"research-title"} className={"article-subhead"}>{"Research and product structure"}</h2>
<div className={"article-prose"}><p>{"The work started with research and product structure, before any UI. Information architecture, user modes, and core flows were mapped first to understand how the platform should hold all three mechanics together."}</p>
<p>{"Research condensed into three user modes that drove most decisions: the memer who rushes through and wants an instant result, the founder who reads carefully and expects structure, and the flipper who hunts early entries. Almost every screen serves at least two of them at once."}</p>
</div>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca information architecture research board"} style={{"--case-demo-image": "url(\"/studies/alloca/ia.jpeg\")", "--case-demo-image-ratio": "3338 / 2032"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Research page"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca information architecture map"} style={{"--case-demo-image": "url(\"/studies/alloca/ia-map.png\")", "--case-demo-image-ratio": "2327 / 1431"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"IA map across core surfaces"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca user modes diagram"} style={{"--case-demo-image": "url(\"/studies/alloca/UserModes.png\")", "--case-demo-image-ratio": "2656 / 1898"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"User modes: memer, founder, flipper"}</figcaption>
</figure>
</section>
<section id={"system"} className={"article-section"} aria-labelledby={"system-title"}><h2 id={"system-title"} className={"article-subhead"}>{"UI and component system"}</h2>
<div className={"article-prose"}><p>{"Then came the full UI and a component system with color and typography tokens in two themes, plus developer annotations to keep the implementation consistent."}</p>
<p>{"The token architecture has a semantic layer on top of the palettes, so the whole product flips between light and dark from one switch. Trust runs through the interface as a system too: verification badges, NSFW screening, and moderation states are components, along with a mono type scale for tickers, addresses, and market data."}</p>
<p>{"Small frictions keep listings honest. The launch form asks founders how far along the project actually is, and the data locks after launch."}</p>
</div>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca theme variables and color modes"} style={{"--case-demo-image": "url(\"/studies/alloca/themes.png\")", "--case-demo-image-ratio": "3690 / 1950"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Theme variables and semantic tokens"}</figcaption>
</figure>
</section>
<section id={"screens"} className={"article-section"} aria-labelledby={"screens-title"}><h2 id={"screens-title"} className={"article-subhead"}>{"Final screens"}</h2>
<div className={"article-prose"}><p>{"The final set shows selected product screens: enough to explain the product decisions without showing the whole file."}</p>
</div>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca explore page and market discovery screen"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_1.png\")", "--case-demo-image-ratio": "1480 / 1188"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Explore and market discovery"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca launchpad listing and sale flow screen"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_2.png\")", "--case-demo-image-ratio": "2096 / 1302"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Listing and sale flow"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca memecoin and ICM product surfaces"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_3.png\")", "--case-demo-image-ratio": "3244 / 2414"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Memecoin and ICM surfaces"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca mobile launch review screen"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_4.png\")", "--case-demo-image-ratio": "1204 / 2562"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Mobile launch review"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca wallet connection and recent activity states"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_6.png\")", "--case-demo-image-ratio": "2840 / 1788"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Wallet connection and activity states"}</figcaption>
</figure>
<figure className={"case-study-demo"}><div className={"case-study-demo-frame has-media"}><div className={"case-study-demo-media"} role={"img"} aria-label={"Alloca profile holdings screen"} style={{"--case-demo-image": "url(\"/studies/alloca/alloca_5.png\")", "--case-demo-image-ratio": "3280 / 2208"} as CSSProperties}></div>
</div>
<figcaption className={"case-study-demo-title"}>{"Profile holdings"}</figcaption>
</figure>
</section>
</article>
<aside className={"article-support-callout case-study-one-liner appear"} style={{"--appear-delay": "140ms"} as CSSProperties}><p>{"Making a launchpad look better was the easy part. The real challenge was getting Chad Sales, Internet Capital Markets, and memecoins to coexist in one product while keeping clarity and trust."}</p>
<a href={"mailto:ridhampatel2k4@gmail.com"}><span className={"scramble-text link-label"}><span className={"scramble-original"}>{"Ask about this work"}</span>
</span>
</a>
</aside>
<section className={"article-footnotes appear"} aria-label={"Notes"} style={{"--appear-delay": "160ms"} as CSSProperties}><ol><li><span className={"article-fn-text"}>{"My contribution was design only, not engineering. I owned product structure, IA, UX, UI, components, and developer annotations. The engineering team handled implementation."}</span>
</li>
</ol>
</section>
</div>
</section>
<footer className={"footer"}><div className={"footer-row"}><span className={"footer-meta"}><span className={"footer-locale"}>{"GMT+5:30"}</span>
<span className={"footer-time"}>{" "}</span>
</span>
</div>
</footer>
</main>
</>; }
