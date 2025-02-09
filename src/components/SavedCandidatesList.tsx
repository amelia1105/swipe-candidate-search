import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import '../styles/SavedCandidatesList.css';

type SavedCandidatesListProps = {
  savedCandidates: Candidate[];
  updateSavedList: () => void;
};

const SavedCandidatesList: React.FC<SavedCandidatesListProps> = ({ savedCandidates, updateSavedList }) => {
  return (
    <div className="savedCandidatesList">
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Company</th>
              <th>Reject</th> {/* Column for actions like remove */}
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.Username}>
                <td>
                  {candidate.Avatar ? (
                  <img src={candidate.Avatar} alt={`${candidate.Name}'s avatar`} width="80" height="80" />
                  ) : (
                  'No image available'
                  )}
                </td>
                <td>{candidate.Name || 'Unknown'}</td>
                <td>{candidate.Username || 'Unknown'}</td>
                <td>{candidate.Location || 'Unknown'}</td>
                <td>{candidate.Email || 'N/A'}</td>
                <td>
                  <a href={candidate.HtmlUrl || '#'} target="_blank" rel="noopener noreferrer">
                  {candidate.HtmlUrl ? 'View profile' : 'No profile available'}
                  </a>
                </td>
                <td>{candidate.Company || 'Unknown'}</td>
                <td>
                  <button
                    onClick={() => {
                      // Remove the candidate from the list
                      const updatedList = savedCandidates.filter((c) => c.Username !== candidate.Username);
                      localStorage.setItem('savedList', JSON.stringify(updatedList));
                      updateSavedList();
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </div>
  );
};

export default SavedCandidatesList;