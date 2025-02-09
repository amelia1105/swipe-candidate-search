import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';

type CandidateCardProps = {
  candidate: Candidate;
  onNextCandidate: () => void; // Function to fetch the next candidate
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onNextCandidate }) => {
  const handleAccept = () => {
    const savedList: Candidate[] = JSON.parse(localStorage.getItem('savedList') || '[]');
    
    if (!savedList.some((c) => c.Name === candidate.Name)) {
      localStorage.setItem('savedList', JSON.stringify([...savedList, candidate]));
    }

    onNextCandidate(); // Move to the next candidate
  };

  const handleReject = () => {
    onNextCandidate(); // Simply move to the next candidate without saving
  };

  return (
    <section className="candidateCard">
      <figure>
        <img src={candidate.Image || ''} alt={candidate.Name || 'Unknown Candidate'} />
      </figure>
      <article className="details">
        <h2>{candidate.Name || 'Unknown Name'}</h2>
        <p>{candidate.Location || 'Unknown Location'}</p>
        <p>{candidate.Email || 'Unknown Email'}</p>
        <p>{candidate.Company || 'Unknown Company'}</p>
        <p>{candidate.Bio || 'No bio available'}</p>
      </article>
      <aside className="icons">
        <ImCross
          style={{ fontSize: '40px', cursor: 'pointer', color: 'red' }}
          onClick={handleReject} // Reject the candidate
        />
        <CgPlayListAdd
          style={{ fontSize: '50px', cursor: 'pointer', color: 'green' }}
          onClick={handleAccept} // Save the candidate
        />
      </aside>
    </section>
  );
};

export default CandidateCard;
