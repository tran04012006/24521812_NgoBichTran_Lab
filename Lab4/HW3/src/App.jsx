import { Link, NavLink, Outlet, Route, Routes } from 'react-router';
import PhotoGalleryLayout from './PhotoGalleryLayout.jsx';

function SiteLayout() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

function HomePage() {
  return (
    <>
      <h1>Photo &amp; Evidence Gallery</h1>
      <p>Browse the photo and evidence collection.</p>
      <Link to="/gallery">Open gallery</Link>
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="gallery" element={<PhotoGalleryLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}