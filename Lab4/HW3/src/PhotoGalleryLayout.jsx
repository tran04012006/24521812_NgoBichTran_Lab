import { Link, useSearchParams } from 'react-router';
import { categories, photos } from './photos.js';

const filters = [{ id: '', label: 'All photos' }, ...categories];

export default function PhotoGalleryLayout() {
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get('category');
  const activeCategory = categories.some(({ id }) => id === requestedCategory)
    ? requestedCategory
    : '';

  const visiblePhotos = activeCategory
    ? photos.filter((photo) => photo.category === activeCategory)
    : photos;

  function getFilterLink(categoryId) {
    const nextParams = new URLSearchParams(searchParams);

    if (categoryId) {
      nextParams.set('category', categoryId);
    } else {
      nextParams.delete('category');
    }

    return { search: nextParams.toString() };
  }

  return (
    <>
      <h1>Gallery</h1>

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
            <figure className="photo-card">
              <img
                src={`${photo.imageUrl}?auto=format&fit=crop&w=640&h=480&q=75`}
                alt={photo.alt}
                width={640}
                height={480}
              />
              <figcaption>{photo.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}