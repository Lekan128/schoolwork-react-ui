import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Global } from "../Util/Global";
import { useParams } from "react-router";
import { ReviewType } from "../Entities/Review.type";
import ReviewCard from "./ReviewCard";

export const Review = () => {
  const params = useParams();
  console.log(params);
  const courseId = params.courseId;
  console.log(courseId);

  console.log(Global.base_url + Global.review + "/" + courseId);

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  //   const [error, setStateError] = useState({});

  useEffect(() => {
    fetch(Global.base_url + Global.review + "/" + courseId)
      .then((response) => response.json())
      .then((response: ReviewType[]) => {
        if (response.length > 0) {
          setReviews(response);
        }
      })
      .catch((error) => {
        console.log(error);
        // setStateError(error);
      });
  }, []);

  return (
    <div>
      <ul className="list-group">
        {reviews.length > 0 ? ( //if faculty is not empty
          reviews.map((review: ReviewType) => (
            <li className="list-group-item" key={review.id} value={review.id}>
              <ReviewCard review={review} />
            </li>
          ))
        ) : (
          //else
          <Loader />
        )}
      </ul>
    </div>
  );
};
