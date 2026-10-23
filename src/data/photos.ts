import type { ImageMetadata } from 'astro';
import ananthagiri from '@/assets/photos/ananthagiri.jpg';
import campfire from '@/assets/photos/campfire.jpg';
import forestTrek from '@/assets/photos/forest-trek.jpg';
import tents from '@/assets/photos/tents.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Visible label: these are not photos of the campsites and must never be presented as such. */
  label: string;
  author: string;
  license: string;
  source: string;
}

/**
 * Stock and area photos, used only until real campsite photos are added to
 * src/assets/campsites/<package-id>/ (see src/lib/gallery.ts).
 */
export const photos = {
  campfire: {
    src: campfire,
    alt: 'A lit tent under a starry night sky (illustrative stock photo, not the campsite)',
    label: 'Illustrative photo, not this campsite',
    author: 'Joshua Tree National Park',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Campers_and_tent_underneath_a_night_sky_(49950611437).jpg',
  },
  ananthagiri: {
    src: ananthagiri,
    alt: 'Forested Ananthagiri Hills near Vikarabad (area view, not the campsite)',
    label: 'Ananthagiri Hills area, not the campsite',
    author: 'Praveen120',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ananthagiri_Hills.JPG',
  },
  tents: {
    src: tents,
    alt: 'Camping tents pitched on open ground (illustrative stock photo, not the campsite)',
    label: 'Illustrative photo, not this campsite',
    author: 'USFWSAlaska',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Field_camp_tents_(53707969369).jpg',
  },
  'forest-trek': {
    src: forestTrek,
    alt: 'A forest trail through tall trees (illustrative stock photo, not the campsite)',
    label: 'Illustrative photo, not this campsite',
    author: 'Framesnlight',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Jungle_trek.jpg',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];
