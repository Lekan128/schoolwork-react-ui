import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Global } from "../Util/Global";
import { useParams } from "react-router";
import { ReviewType } from "../Entities/Review.type";
import ReviewCard from "./ReviewCard";
import NotificationPopup from "../components/NotificationPopup";
import { NotificationType } from "../Entities/Notification.type";

export const Review = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [unableToLoadError, setUnableToLoadError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  useEffect(() => {
    fetch(Global.base_url + Global.review + "/" + courseId)
      .then((response) => response.json())
      .then((response: ReviewType[]) => {
        if (response.length > 0) {
          setReviews(response);
          return;
        }
        const error = "No Review availabe to load";
        handleSetNotificaton(error);
        setUnableToLoadError(error);
      })
      .catch((error) => {
        console.log(error);
        handleSetNotificaton("An error occoured: " + error, "danger");
      });
  }, []);

  const handleSetNotificaton = (
    notification: string,
    notificationType: NotificationType = "primary"
  ) => {
    setNotification(notification);
    setNotificationType(notificationType);
  };

  const handleClearNotification = () => {
    setNotification("");
    setNotificationType("primary");
  };

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
          <Loader errorMessage={unableToLoadError} />
        )}
        {notification && (
          <NotificationPopup
            message={notification}
            type={notificationType}
            onClose={() => handleClearNotification()}
          />
        )}
      </ul>
    </div>
  );
};
