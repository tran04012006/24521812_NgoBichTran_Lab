import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { categories, photos } from './photos.js';

const filters = [{ id: '', label: 'All photos' }, ...categories];

export default function PhotoGalleryLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const lastOpenedPhotoId = useRef(null);

  const requestedCategory = searchParams.get('category');
  const activeCategory = categories.some(({ id }) => id === requestedCategory)
    ? requestedCategory
    : '';

  const visiblePhotos = activeCategory
    ? photos.filter((photo) => photo.category === activeCategory)
    : photos;

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
                aria-current={id === activeCategory ? 'true' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="photo-grid" aria-label="Photos">
        {visiblePhotos.map((photo) => (
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
                  src={`${photo.imageUrl}?auto=format&fit=crop&w=640&h=480&q=75`}
                  alt={photo.alt}
                  width={640}
                  height={480}
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
              src={`${selectedPhoto.imageUrl}?auto=format&w=1280&q=80`}
              alt={selectedPhoto.alt}
            />
          </>
        )}
      </dialog>
    </>
  );
}