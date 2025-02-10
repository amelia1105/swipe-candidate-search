import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";
import "../styles/SavedCandidatesList.css";
import { AiOutlineMinus } from "react-icons/ai";
import Button from "react-bootstrap/Button";

type SavedCandidatesListProps = {
  savedCandidates: Candidate[];
  updateSavedList: () => void;
};

const SavedCandidatesList: React.FC<SavedCandidatesListProps> = ({
  savedCandidates,
  updateSavedList,
}) => {
  const handleRemove = (username: string) => {
    const updatedList = savedCandidates.filter((c) => c.Username !== username);
    localStorage.setItem("savedList", JSON.stringify(updatedList));
    updateSavedList();
  };

  return (
    <div className="saved-candidates-list">
      {savedCandidates.length > 0 ? (
        <table className="saved-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Company</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.Username}>
                <td>
                  {candidate.Avatar ? (
                    <img
                      src={candidate.Avatar}
                      alt={`${candidate.Name}'s avatar`}
                      className="candidate-avatar"
                    />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td>{candidate.Name || "Unknown"}</td>
                <td>{candidate.Username || "Unknown"}</td>
                <td>{candidate.Location || "Unknown"}</td>
                <td>{candidate.Email || "N/A"}</td>
                <td>
                  <a
                    href={candidate.HtmlUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                  >
                    {candidate.HtmlUrl ? "View profile" : "No profile available"}
                  </a>
                </td>
                <td>{candidate.Company || "Unknown"}</td>
                <td>
                    <Button onClick={() => handleRemove(candidate.Username)} className="reject-button">
                      <AiOutlineMinus />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-candidates">No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidatesList;