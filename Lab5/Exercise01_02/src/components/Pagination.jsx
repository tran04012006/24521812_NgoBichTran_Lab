export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="pagination"
      aria-label="Evidence pagination"
    >
      <button
        type="button"
        className="pagination-button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Previous
      </button>

      <span
        className="page-indicator"
        aria-live="polite"
      >
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        className="pagination-button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
}