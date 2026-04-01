"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface ImageItem {
  src: string;
  alt: string;
  href?: string;
  /** Width-to-height aspect ratio: landscape > 1, portrait < 1, square ≈ 1.
   *  You can also use the convenience string values. */
  aspect?: "portrait" | "landscape" | "square" | number;
}

interface ImageGridProps {
  images: ImageItem[];
  /** Target row height in pixels (default 280). Rows will flex ±20% around this. */
  targetRowHeight?: number;
  /** Gap between images in pixels (default 4) */
  gap?: number;
  /** Keep old masonry/columns API for backwards compat — ignored, all grids use justified layout */
  columns?: number;
  masonry?: boolean;
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

/** Convert the convenience string aspect names to numeric width/height ratios. */
function toNumericAspect(aspect?: ImageItem["aspect"]): number {
  if (typeof aspect === "number") return aspect;
  switch (aspect) {
    case "portrait":
      return 0.75; // 3:4
    case "landscape":
      return 1.5; // 3:2
    case "square":
    default:
      return 1;
  }
}

interface LayoutRow {
  images: ImageItem[];
  /** Actual height of this row (all images share it) */
  height: number;
}

/**
 * Flickr-style justified row layout algorithm.
 *
 * 1. Walk images left-to-right.
 * 2. For each image, compute the width it would need at `targetRowHeight`.
 * 3. Accumulate widths. When the cumulative width exceeds `containerWidth`,
 *    close the row by slightly shrinking the height so images perfectly fill the row.
 * 4. The last row keeps target height (not stretched) to avoid giant images.
 */
function computeJustifiedRows(
  images: ImageItem[],
  containerWidth: number,
  targetRowHeight: number,
  gap: number
): LayoutRow[] {
  if (containerWidth <= 0 || images.length === 0) return [];

  const rows: LayoutRow[] = [];
  let currentRow: ImageItem[] = [];
  let currentWidthSum = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const ar = toNumericAspect(img.aspect);
    const imgWidth = ar * targetRowHeight; // width this image would take at target height

    currentRow.push(img);
    currentWidthSum += imgWidth;

    const totalGaps = (currentRow.length - 1) * gap;
    const availableWidth = containerWidth - totalGaps;

    // Check if this row is full (total natural widths exceed available space)
    if (currentWidthSum >= availableWidth) {
      // Compute the actual height that makes all images fit exactly
      const aspectSum = currentRow.reduce(
        (sum, im) => sum + toNumericAspect(im.aspect),
        0
      );
      const rowHeight = (containerWidth - totalGaps) / aspectSum;

      rows.push({ images: currentRow, height: rowHeight });
      currentRow = [];
      currentWidthSum = 0;
    }
  }

  // Last (incomplete) row — keep target height, don't stretch
  if (currentRow.length > 0) {
    rows.push({ images: currentRow, height: targetRowHeight });
  }

  return rows;
}

/* ─────────────────────────────────────────────
   Lightbox
   ───────────────────────────────────────────── */

function Lightbox({
  image,
  onClose,
}: {
  image: ImageItem;
  onClose: () => void;
}) {
  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-label={image.alt}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <div
        className="lightbox-image-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="90vw"
          quality={90}
          className="lightbox-image"
          priority
        />
      </div>
      <p className="lightbox-caption">{image.alt}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ImageGrid — Justified Row Layout
   ───────────────────────────────────────────── */

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  targetRowHeight = 280,
  gap = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null);

  const openLightbox = useCallback(
    (img: ImageItem) => setLightboxImage(img),
    []
  );
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  // Escape key closes lightbox
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxImage, closeLightbox]);

  // Measure container width with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute justified rows
  const rows = useMemo(
    () => computeJustifiedRows(images, containerWidth, targetRowHeight, gap),
    [images, containerWidth, targetRowHeight, gap]
  );

  return (
    <section>
      <div
        ref={containerRef}
        className="justified-grid"
        style={{ gap: `${gap}px` }}
      >
        {containerWidth > 0 &&
          rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="justified-row"
              style={{
                height: `${row.height}px`,
                gap: `${gap}px`,
              }}
            >
              {row.images.map((image, imgIdx) => {
                const ar = toNumericAspect(image.aspect);
                const imgWidth = ar * row.height;
                const isAboveFold = rowIdx < 2;

                return (
                  <div
                    key={`${rowIdx}-${imgIdx}`}
                    className="justified-tile"
                    style={{
                      width: `${imgWidth}px`,
                      height: `${row.height}px`,
                      flexGrow: rowIdx < rows.length - 1 ? 1 : 0,
                      flexShrink: 1,
                      flexBasis: `${imgWidth}px`,
                    }}
                    onClick={() => openLightbox(image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openLightbox(image);
                    }}
                  >
                    {image.href ? (
                      <a
                        href={image.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justified-tile-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          alt={image.alt}
                          src={image.src}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          priority={isAboveFold}
                          loading={isAboveFold ? "eager" : "lazy"}
                          quality={75}
                          className="justified-tile-image"
                        />
                      </a>
                    ) : (
                      <Image
                        alt={image.alt}
                        src={image.src}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        priority={isAboveFold}
                        loading={isAboveFold ? "eager" : "lazy"}
                        quality={75}
                        className="justified-tile-image"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="justified-tile-overlay">
                      <span className="justified-tile-caption">{image.alt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={closeLightbox} />
      )}
    </section>
  );
};
