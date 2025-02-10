import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/CandidateCard.css";

// Utility function to get saved list from localStorage
const getSavedList = (): Candidate[] => {
  return JSON.parse(localStorage.getItem("savedList") || "[]");
};

// Utility function to update saved list in localStorage
const updateLocalStorageSavedList = (updatedList: Candidate[]) => {
  localStorage.setItem("savedList", JSON.stringify(updatedList));
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
  moveToNextCandidate,
}) => {
  const handleSave = () => {
    const savedList = getSavedList();
    if (!savedList.some((c) => c.Username === candidate.Username)) {
      savedList.push(candidate);
      updateLocalStorageSavedList(savedList);
    }
    moveToNextCandidate?.();
  };

  const handleRemove = () => {
    const savedList = getSavedList();
    const updatedSavedList = savedList.filter(
      (c) => c.Username !== candidate.Username
    );
    updateLocalStorageSavedList(updatedSavedList);

    updateSavedList?.();
    moveToNextCandidate?.();
  };

  return (
    <div className="candidate-container" >
      {/* Candidate Card */}
      <Card className="candidate-card">
        {/* Candidate Image */}
        <Card.Img
          variant="top"
          src={candidate.Avatar || ""}
          alt={candidate.Username || "Unknown Candidate"}
          className="candidate-avatar"
        />

        {/* Candidate Details */}
        <Card.Body>
            <Card.Title className="candidate-title">
            {candidate.Name || "Unknown"}
            </Card.Title>
          <Card.Text className="candidate-text">
            <strong>Username:</strong> {candidate.Username || "Unknown"} <br />
            <strong>Location:</strong> {candidate.Location || "Unknown"} <br />
            <strong>Email:</strong> {candidate.Email || "N/A"} <br />
            <strong>Company:</strong> {candidate.Company || "Unknown"} <br />
            <strong>Bio:</strong> {candidate.Bio || "No bio available"} <br />
            <strong>Profile:</strong>{" "}
            <a
              href={candidate.HtmlUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              GitHub
            </a>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Accept / Reject Buttons (Outside the Card) */}
      <div className="button-container">
        <Button onClick={handleRemove} className="reject-button">
          <AiOutlineMinus size={30} />
        </Button>

        {!onSavedList && (
          <Button onClick={handleSave} className="save-button">
            <AiOutlinePlus size={30} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;