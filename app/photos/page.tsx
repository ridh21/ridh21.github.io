import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};

export default function Photos() {
  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-8">Photos</h1>

      {/* --- UK & France Tour --- */}
      <h2 className="section-heading font-serif text-xl mt-10 mb-1">
        UK &amp; France Tour
      </h2>
      <p className="text-sm text-[var(--color-contrast-low)] mb-4">
        Wandering through London streets and Parisian boulevards.
      </p>

      <ImageGrid
        targetRowHeight={260}
        gap={4}
        images={[
          {
            src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
            alt: "London skyline with Tower Bridge",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80",
            alt: "Big Ben and Parliament",
            aspect: "portrait",
          },
          {
            src: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80",
            alt: "Red telephone booth in London",
            aspect: "square",
          },
          {
            src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
            alt: "Eiffel Tower at sunset",
            aspect: "portrait",
          },
          {
            src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
            alt: "Streets of Paris",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80",
            alt: "Louvre Museum pyramid",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1543799382-9a0208331ef7?w=800&q=80",
            alt: "London Eye at dusk",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&q=80",
            alt: "Notre-Dame Cathedral",
            aspect: "portrait",
          },
        ]}
      />

      {/* --- Code & Fun --- */}
      <h2 className="section-heading font-serif text-xl mt-10 mb-1">
        Code &amp; Fun
      </h2>
      <p className="text-sm text-[var(--color-contrast-low)] mb-4">
        Hackathons, late-night coding sessions, and good vibes.
      </p>

      <ImageGrid
        targetRowHeight={240}
        gap={4}
        images={[
          {
            src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
            alt: "Hackathon workspace",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
            alt: "Laptop with code on screen",
            aspect: "square",
          },
          {
            src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
            alt: "Team collaboration",
            aspect: "portrait",
          },
          {
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
            alt: "Group working on laptops",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
            alt: "Coding on MacBook",
            aspect: "portrait",
          },
          {
            src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
            alt: "Monitor with code",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
            alt: "Team at work",
            aspect: "square",
          },
          {
            src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&q=80",
            alt: "Minimal desk setup",
            aspect: "landscape",
          },
          {
            src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
            alt: "Tech aesthetic",
            aspect: "portrait",
          },
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            alt: "Dashboard on screen",
            aspect: "landscape",
          },
        ]}
      />
    </section>
  );
}
