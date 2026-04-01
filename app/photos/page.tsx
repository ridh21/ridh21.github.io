import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";
import { getPhotoSectionsCollection } from "app/lib/collections";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};

export const dynamic = "force-dynamic";

export default async function Photos() {
  const col = await getPhotoSectionsCollection();
  const sections = await col.find({}).sort({ order: 1 }).toArray();

  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-8">Photos</h1>

      {sections.length === 0 && (
        <p className="text-sm text-[var(--color-contrast-low)]">
          No photos yet. Add some from the admin panel.
        </p>
      )}

      {sections.map((s) => (
        <div key={s._id.toString()}>
          <h2 className="section-heading font-serif text-xl mt-10 mb-1">
            {s.title}
          </h2>
          {s.subtitle && (
            <p className="text-sm text-[var(--color-contrast-low)] mb-4">
              {s.subtitle}
            </p>
          )}

          <ImageGrid
            targetRowHeight={260}
            gap={4}
            images={s.images.map((img) => ({
              src: img.src,
              alt: img.alt,
              aspect: img.aspect,
            }))}
          />
        </div>
      ))}
    </section>
  );
}
