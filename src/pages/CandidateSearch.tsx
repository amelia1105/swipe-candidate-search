import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API'; // Make sure you're importing the API function
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [outOfCandidates, setOutOfCandidates] = useState<boolean>(false); // New state to track if all candidates are viewed

  // Fetch candidates from the GitHub API
  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      const mappedCandidates = data.map((user: { name: string; login: string; location: string; avatar_url: string; email: string; html_url: string; company: string; bio: string; }) => ({
        Name: user.name || 'Unknown',
        Username: user.login || 'Unknown',
        Location: user.location || 'Unknown',
        Avatar: user.avatar_url || 'https://via.placeholder.com/150',
        Email: user.email || 'N/A',
        HtmlUrl: user.html_url || '#',
        Company: user.company || 'Unknown',
        Bio: user.bio || 'No bio available',
      }));
      setCandidates(mappedCandidates);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setError('Failed to fetch candidates.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const moveToNextCandidate = () => {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setOutOfCandidates(true); // We've gone through all candidates
    }
  };

  return (
    <div className="candidateSearch">
      <h1>Candidate Search</h1>

      {loading ? (
        <p>Loading candidates...</p>
      ) : error ? (
        <p>{error}</p>
      ) : candidates.length === 0 ? (
        <p>There are no candidates available to review.</p>
      ) : outOfCandidates ? (
        <p>There are no more candidates to review. Please refresh the page or come back later.</p>
      ) : (
        <CandidateCard 
          candidate={candidates[currentIndex]} 
          moveToNextCandidate={moveToNextCandidate} 
        />
      )}
    </div>
  );
};

export default CandidateSearch;