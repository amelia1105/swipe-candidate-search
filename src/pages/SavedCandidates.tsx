import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import SavedCandidatesList from '../components/SavedCandidatesList';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  const fetchSavedCandidates = () => {
    const savedList = JSON.parse(localStorage.getItem('savedList') || '[]');
    setSavedCandidates(savedList);
  };

  useEffect(() => {
    fetchSavedCandidates();
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <SavedCandidatesList savedCandidates={savedCandidates} updateSavedList={fetchSavedCandidates} />
    </>
  );
};

export default SavedCandidates;
