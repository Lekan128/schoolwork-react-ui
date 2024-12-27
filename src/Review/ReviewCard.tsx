import React from "react";
import { ReviewType } from "../Entities/Review.type";
import FormattedText from "../components/FormattedText";

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
      <FormattedText label="Review" text={review.review} />
      <FormattedText label="Test Tips" text={review.testTips} />
      <FormattedText label="Exam Tips" text={review.examTips} />
    </div>
  );
};

export default ReviewCard;
