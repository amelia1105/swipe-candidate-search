import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';

type CandidateCardProps = {
  candidate: Candidate;
  onSavedList?: boolean;
  updateSavedList?: () => void;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {

  return (
    <section className="candidateCard">
      <figure>
        <img src={candidate.Avatar || ''} alt={candidate.Username || 'Unknown Candidate'} />
      </figure>
      <article className="details">
        <p><strong>Name:</strong> {candidate.Name || 'Unknown name'}</p>
        <p><strong>Username:</strong> {candidate.Username || 'Unknown username'}</p>
        <p><strong>Location:</strong> {candidate.Location || 'Unknown location'}</p>
        <p><strong>Email:</strong> {candidate.Email || 'N/A'}</p>
        <p><strong>Company:</strong> {candidate.Company || 'Unknown company'}</p>
        <p><strong>Bio:</strong> {candidate.Bio || 'No bio available'}</p> {/* Display Bio */}
        <p><strong>Profile:</strong> <a href={candidate.HtmlUrl || '#'} target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </article>
    </section>
  );
};

export default CandidateCard;
