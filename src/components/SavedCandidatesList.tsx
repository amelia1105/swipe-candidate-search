import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from './CandidateCard';

type SavedCandidatesListProps = {
  savedCandidates: Candidate[];
  updateSavedList: () => void;
};

const SavedCandidatesList: React.FC<SavedCandidatesListProps> = ({ savedCandidates, updateSavedList }) => {
  return (
    <div className="savedCandidatesList">
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <CandidateCard 
            key={candidate.Username} 
            candidate={candidate} 
            onSavedList={true} 
            updateSavedList={updateSavedList} 
          />
        ))
      ) : (
        <p>No saved candidates.</p>
      )}
    </div>
  );
};

export default SavedCandidatesList;