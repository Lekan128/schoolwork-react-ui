import React from "react";
import { ReviewType } from "../Entities/Review.type";

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      className="card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h5 style={{ marginBottom: "10px", color: "#007bff" }}>
        Lecturer: {review.lecturer}
      </h5>
      <p style={{ marginBottom: "8px" }}>
        <strong>Review:</strong> {review.review}
      </p>
      <p style={{ marginBottom: "8px" }}>
        <strong>Test Tips:</strong> {review.testTips}
      </p>
      <p>
        <strong>Exam Tips:</strong> {review.examTips}
      </p>
    </div>
  );
};

export default ReviewCard;
