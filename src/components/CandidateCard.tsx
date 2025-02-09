import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import '../styles/CandidateCard.css';

// Utility function to get saved list from localStorage
const getSavedList = (): Candidate[] => {
  return JSON.parse(localStorage.getItem('savedList') || '[]');
};

// Utility function to update saved list in localStorage
const updateLocalStorageSavedList = (updatedList: Candidate[]) => {
  localStorage.setItem('savedList', JSON.stringify(updatedList));
};

type CandidateCardProps = {
  candidate: Candidate;
  onSavedList?: boolean;
  updateSavedList?: () => void;
  moveToNextCandidate?: () => void;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onSavedList = false, 
  updateSavedList, 
  moveToNextCandidate 
}) => {

  const handleSave = () => {
    const savedList = getSavedList();
    // Only add if not already in saved list
    if (!savedList.some((c) => c.Username === candidate.Username)) {
      savedList.push(candidate);
      updateLocalStorageSavedList(savedList);
    }

    moveToNextCandidate?.();
  };

  const handleRemove = () => {
    const savedList = getSavedList();
    const updatedSavedList = savedList.filter((c) => c.Username !== candidate.Username);
    updateLocalStorageSavedList(updatedSavedList);

    updateSavedList?.();
    moveToNextCandidate?.();
  };

  return (
    <section className="candidateCard">
      <figure>
        <img src={candidate.Avatar || ''} alt={candidate.Username || 'Unknown Candidate'} />
      </figure>
      <article className="details">
        <p><strong>Name:</strong> {candidate.Name || 'Unknown'}</p>
        <p><strong>Username:</strong> {candidate.Username || 'Unknown'}</p>
        <p><strong>Location:</strong> {candidate.Location || 'Unknown'}</p>
        <p><strong>Email:</strong> {candidate.Email || 'N/A'}</p>
        <p><strong>Company:</strong> {candidate.Company || 'Unknown'}</p>
        <p><strong>Bio:</strong> {candidate.Bio || 'No bio available'}</p>
        <p><strong>Profile:</strong> <a href={candidate.HtmlUrl || '#'} target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </article>

      <aside className="icons">
        <AiOutlineMinus 
          style={{ fontSize: '30px', cursor: 'pointer' }} 
          onClick={handleRemove} 
        />
        {!onSavedList && (
          <AiOutlinePlus 
            style={{ fontSize: '40px', cursor: 'pointer' }} 
            onClick={handleSave} 
          />
        )}
      </aside>
    </section>
  );
};

export default CandidateCard;
