export default function EvidenceCard({ clip }) {
  return (
    <article className="evidence-card">
      <div className="evidence-thumbnail">
        <span
          className="play-icon"
          aria-hidden="true"
        >
          ▶
        </span>

        <span className="clip-duration">
          {clip.duration}
        </span>
      </div>

      <div className="evidence-card-body">
        <span className="clip-category">
          {clip.category}
        </span>

        <h4>{clip.title}</h4>

        <p>{clip.description}</p>

        <span className="clip-id">
          {clip._id}
        </span>
      </div>
    </article>
  );
}