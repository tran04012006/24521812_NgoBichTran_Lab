import { useState } from "react";

import EvidenceCard from "./EvidenceCard.jsx";
import Pagination from "./Pagination.jsx";

const PAGE_SIZE = 6;

export default function EvidenceGrid({
  clips = [],
}) {
  const [page, setPage] = useState(1);

  // Derived values

  const totalPages = Math.ceil(
    clips.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(1, totalPages)
  );

  const startIdx =
    (currentPage - 1) * PAGE_SIZE;

  const visibleItems = clips.slice(
    startIdx,
    startIdx + PAGE_SIZE
  );

  function handlePageChange(nextPage) {
    setPage(
      Math.max(
        1,
        Math.min(nextPage, totalPages)
      )
    );
  }

  if (clips.length === 0) {
    return (
      <div className="empty-state">
        <h3>No evidence clips found</h3>

        <p>
          There are currently no evidence clips
          to display.
        </p>
      </div>
    );
  }

  return (
    <div className="evidence-container">
      <div className="evidence-toolbar">
        <div>
          <h3>Evidence Clips</h3>

          <p>
            Browse available evidence recordings.
          </p>
        </div>

        <span className="evidence-count">
          {clips.length} clips
        </span>
      </div>

      <div className="pagination-summary">
        Showing {startIdx + 1}–
        {startIdx + visibleItems.length} of{" "}
        {clips.length} clips
      </div>

      <div className="evidence-grid">
        {visibleItems.map((clip) => (
          <EvidenceCard
            key={clip._id}
            clip={clip}
          />
        ))}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}