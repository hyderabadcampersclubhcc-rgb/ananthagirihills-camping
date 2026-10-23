import type { ImageMetadata } from 'astro';
import ananthagiri from '@/assets/photos/ananthagiri.jpg';
import campfire from '@/assets/photos/campfire.jpg';
import forestTrek from '@/assets/photos/forest-trek.jpg';
import tents from '@/assets/photos/tents.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  author: string;
  license: string;
  source: string;
}

/**
 * Stock and area photos, labelled as such: none of them shows the actual campsites.
 * Replace with real campsite photos from the owner when available.
 */
export const photos = {
  campfire: {
    src: campfire,
    alt: 'A lit tent under a starry night sky (illustrative stock photo, not the campsite)',
    author: 'Joshua Tree National Park',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Campers_and_tent_underneath_a_night_sky_(49950611437).jpg',
  },
  ananthagiri: {
    src: ananthagiri,
    alt: 'Forested Ananthagiri Hills near Vikarabad (area view, not the campsite)',
    author: 'Praveen120',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ananthagiri_Hills.JPG',
  },
  tents: {
    src: tents,
    alt: 'Camping tents pitched on open ground (illustrative)',
    author: 'USFWSAlaska',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Field_camp_tents_(53707969369).jpg',
  },
  'forest-trek': {
    src: forestTrek,
    alt: 'A forest trail through tall trees (illustrative)',
    author: 'Framesnlight',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Jungle_trek.jpg',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];
