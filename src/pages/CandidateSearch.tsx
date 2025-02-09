import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const fetchCandidate = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      setCandidate({
        Image: users[0].avatar_url,
        Name: users[0].login,
        Location: users[0].location || 'Unknown',
        Email: users[0].email || 'N/A',
        Company: users[0].company || 'Unknown',
        Bio: users[0].bio || 'No bio available',
      });
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <CandidateCard candidate={candidate} onNextCandidate={fetchCandidate} />
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
