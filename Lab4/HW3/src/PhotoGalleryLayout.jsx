import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  categories,
  getPhotoFilename,
  LIGHTBOX_WIDTH,
  photos,
  THUMBNAIL_WIDTHS,
} from './photos.js';

const filters = [{ id: '', label: 'All photos' }, ...categories];
const fallbackThumbnailWidth = THUMBNAIL_WIDTHS.at(-1);
const thumbnailSizes = [
  '(min-width: 70rem) 16rem',
  '(min-width: 65rem) 25vw',
  '(min-width: 48rem) 33vw',
  '(min-width: 32rem) 50vw',
  'calc(100vw - 2rem)',
].join(', ');

function getPhotoAssetUrl(photoId, width) {
  return `${import.meta.env.BASE_URL}photos/${getPhotoFilename(photoId, width)}`;
}

function getThumbnailSrcSet(photoId) {
  return THUMBNAIL_WIDTHS.map(
    (width) => `${getPhotoAssetUrl(photoId, width)} ${width}w`,
  ).join(', ');
}

export default function PhotoGalleryLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const lastOpenedPhotoId = useRef(null);

  const requestedCategory = searchParams.get('category');
  const activeFilter =
    filters.find(({ id }) => id === requestedCategory) ?? filters[0];

  const visiblePhotos = activeFilter.id
    ? photos.filter((photo) => photo.category === activeFilter.id)
    : photos;

  const photoCount = visiblePhotos.length;
  const photoCountLabel = photoCount === 1 ? 'photo' : 'photos';
  const selectedPhotoId = searchParams.get('photoId');
  const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (selectedPhoto) {
      lastOpenedPhotoId.current = selectedPhoto.id;

      if (!dialog.open) {
        dialog.showModal();
      }

      return;
    }

    if (dialog.open) {
      dialog.close();
    }

    if (lastOpenedPhotoId.current) {
      const photoLink = document.getElementById(
        `gallery-photo-${lastOpenedPhotoId.current}`,
      );

      (photoLink ?? headingRef.current)?.focus();
      lastOpenedPhotoId.current = null;
    }
  }, [selectedPhoto]);

  function getFilterLink(categoryId) {
    const nextParams = new URLSearchParams(searchParams);

    if (categoryId) {
      nextParams.set('category', categoryId);
    } else {
      nextParams.delete('category');
    }

    return { search: nextParams.toString() };
  }

  function getPhotoLink(photoId) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('photoId', photoId);

    return { search: nextParams.toString() };
  }

  function closePhoto() {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('photoId');
    setSearchParams(nextParams, { replace: true });
  }

  function handleDialogClose(event) {
    if (!event.currentTarget.open && selectedPhoto) {
      closePhoto();
    }
  }

  return (
    <>
      <h1 ref={headingRef} tabIndex={-1}>
        Gallery
      </h1>

      <nav className="gallery-filters" aria-label="Photo categories">
        <ul>
          {filters.map(({ id, label }) => (
            <li key={id}>
              <Link
                to={getFilterLink(id)}
                aria-current={id === activeFilter.id ? 'true' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="gallery-status" role="status">
        {activeFilter.label} · {photoCount} {photoCountLabel}
      </p>

      <ul className="photo-grid" aria-label="Photos">
        {visiblePhotos.map((photo, index) => (
          <li key={photo.id}>
            <Link
              id={`gallery-photo-${photo.id}`}
              className="photo-link"
              to={getPhotoLink(photo.id)}
              aria-haspopup="dialog"
              aria-label={`Open photo: ${photo.title}`}
            >
              <figure className="photo-card">
                <img
                  src={getPhotoAssetUrl(photo.id, fallbackThumbnailWidth)}
                  srcSet={getThumbnailSrcSet(photo.id)}
                  sizes={thumbnailSizes}
                  alt={photo.alt}
                  width={640}
                  height={480}
                  fetchPriority={index === 0 && !selectedPhoto ? 'high' : 'auto'}
                />
                <figcaption>{photo.title}</figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="photo-dialog"
        aria-labelledby="photo-dialog-title"
        onClose={handleDialogClose}
      >
        {selectedPhoto && (
          <>
            <div className="photo-dialog-header">
              <h2 id="photo-dialog-title">{selectedPhoto.title}</h2>
              <button
                type="button"
                className="photo-dialog-close"
                onClick={closePhoto}
              >
                Close
              </button>
            </div>

            <img
              className="photo-dialog-image"
              src={getPhotoAssetUrl(selectedPhoto.id, LIGHTBOX_WIDTH)}
              alt={selectedPhoto.alt}
              fetchPriority="high"
            />
          </>
        )}
      </dialog>
    </>
  );
}