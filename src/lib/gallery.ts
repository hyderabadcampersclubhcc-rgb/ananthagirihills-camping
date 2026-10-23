import type { ImageMetadata } from 'astro';

/**
 * Real campsite photos: any image placed in src/assets/campsites/<package-id>/ appears in that package's
 * gallery, sorted by file name. The file name becomes the caption ("01-tents-at-dusk.jpg" -> "Tents at dusk").
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/campsites/*/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export interface CampsitePhoto {
  src: ImageMetadata;
  caption: string;
}

export function campsitePhotos(packageId: string): CampsitePhoto[] {
  return Object.entries(files)
    .filter(([path]) => path.split('/').at(-2) === packageId)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const name = path.split('/').at(-1)!.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
      return { src: mod.default, caption: name.charAt(0).toUpperCase() + name.slice(1) };
    });
}
