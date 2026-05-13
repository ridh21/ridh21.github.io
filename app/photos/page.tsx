import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ImageGrid } from "app/components/image-grid";
import { getPhotoSectionsCollection } from "app/lib/collections";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};

export const revalidate = 60;

export default function Photos() {
  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-8">Photos</h1>
      <Suspense fallback={<PhotosSkeleton />}>
        <PhotoSections />
      </Suspense>
    </section>
  );
}

function PhotosSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i}>
          <div className="h-5 w-32 bg-[var(--color-background-subtle)] rounded mb-4" />
          <div className="h-48 bg-[var(--color-background-subtle)] rounded" />
        </div>
      ))}
    </div>
  );
}

async function PhotoSections() {
  const col = await getPhotoSectionsCollection();
  const sections = await col.find({}).sort({ order: 1 }).toArray();

  if (sections.length === 0) {
    return (
      <p className="text-sm text-[var(--color-contrast-low)]">
        No sections yet.
      </p>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <div key={section._id.toString()} className="mb-12">
          <h2 className="font-serif text-lg font-medium mb-1 text-[var(--color-contrast-high)]">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-sm text-[var(--color-contrast-medium)] mb-4">
              {section.subtitle}
            </p>
          )}
          <ImageGrid images={section.images} />
        </div>
      ))}
    </>
  );
}
