import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API'; // Make sure you're importing the API function
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Array of candidates
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current candidate index

  // Fetch candidates from the GitHub API
  const fetchCandidates = async () => {
    const data = await searchGithub();
    const mappedCandidates = data.map((user: { name: string; login: string; location: string; avatar_url: string; email: string; html_url: string; company: string; bio: string; }) => ({
      Name: user.name || 'Unknown name',
      Username: user.login || 'Unknown username',
      Location: user.location || 'Unknown location',
      Avatar: user.avatar_url || 'https://via.placeholder.com/150', // Fallback if avatar is missing
      Email: user.email || 'N/A', // Fallback if email is missing
      HtmlUrl: user.html_url || '#', // Fallback to a dummy link if html_url is missing
      Company: user.company || 'Unknown company', // Fallback if company is missing
      Bio: user.bio || 'No bio available', // Fallback for missing bio
    }));
    setCandidates(mappedCandidates); // Set the candidates data
  };

  // UseEffect to load candidates once on mount
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Update the list of saved candidates when one is added or removed
  const updateSavedList = () => {
    const savedList = JSON.parse(localStorage.getItem('savedList') || '[]');
    setCandidates(savedList); // Update candidates based on the saved list
  };

  // Handle swipe or skip candidate
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Add to saved list if swiped right
      const savedList: Candidate[] = JSON.parse(localStorage.getItem('savedList') || '[]');
      if (!savedList.some((candidate: Candidate) => candidate.Username === candidates[currentIndex].Username)) {
        savedList.push(candidates[currentIndex]);
        localStorage.setItem('savedList', JSON.stringify(savedList));
      }
    }

    // Move to next candidate
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Optionally, fetch more candidates or reset the list
      fetchCandidates();
      setCurrentIndex(0); // Reset to first candidate after finishing
    }
  };

  return (
    <div className="candidateSearch">
      <h1>Candidate Search</h1>

      {candidates.length > 0 ? (
        <CandidateCard candidate={candidates[currentIndex]} updateSavedList={updateSavedList} />
      ) : (
        <p>Loading candidates...</p>
      )}

      <div className="actions">
        <button onClick={() => handleSwipe('left')}>-</button>
        <button onClick={() => handleSwipe('right')}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
