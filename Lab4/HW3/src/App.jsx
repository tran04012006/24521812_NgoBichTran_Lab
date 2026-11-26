import { useEffect, useRef } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
} from 'react-router';
import PhotoGalleryLayout from './PhotoGalleryLayout.jsx';
import './accessibility.css';

function SiteLayout() {
  const { pathname } = useLocation();
  const homeMatch = useMatch('/');
  const galleryMatch = useMatch('/gallery');
  const mainRef = useRef(null);
  const previousPathname = useRef(pathname);

  let pageTitle = 'Page not found';

  if (homeMatch) {
    pageTitle = 'Home';
  } else if (galleryMatch) {
    pageTitle = 'Gallery';
  }

  useEffect(() => {
    document.title = `${pageTitle} | Photo & Evidence Gallery`;
  }, [pageTitle]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      mainRef.current?.focus();
    }
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header>
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1}>
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