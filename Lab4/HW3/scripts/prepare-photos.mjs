import { mkdir, writeFile } from 'node:fs/promises';
import {
  getPhotoFilename,
  LIGHTBOX_WIDTH,
  photos,
  THUMBNAIL_WIDTHS,
} from '../src/photos.js';

const outputDirectory = new URL('../public/photos/', import.meta.url);
const widths = [...THUMBNAIL_WIDTHS, LIGHTBOX_WIDTH];

await mkdir(outputDirectory, { recursive: true });

for (const photo of photos) {
  for (const width of widths) {
    const isLightbox = width === LIGHTBOX_WIDTH;
    const source = new URL(photo.imageUrl);

    source.searchParams.set('fm', 'webp');
    source.searchParams.set('w', String(width));
    source.searchParams.set('q', isLightbox ? '80' : '72');

    if (!isLightbox) {
      source.searchParams.set('fit', 'crop');
      source.searchParams.set('h', String((width * 3) / 4));
    }

    const filename = getPhotoFilename(photo.id, width);
    const response = await fetch(source, {
      signal: AbortSignal.timeout(30_000),
    });

    if (
      !response.ok ||
      !response.headers.get('content-type')?.startsWith('image/webp')
    ) {
      throw new Error(`Could not fetch ${filename} (HTTP ${response.status}).`);
    }

    const data = Buffer.from(await response.arrayBuffer());
    await writeFile(new URL(filename, outputDirectory), data);
    console.log(`Saved ${filename} (${Math.round(data.length / 1024)} KB)`);
  }
}