import { useNavigate } from "react-router-dom";
import SearchCourse from "../Course/SearchCourse";

const HomePage = () => {
  const navigate = useNavigate();

  const handleFacultiesClick = () => {
    navigate("/faculty");
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 className="roboto-flex">Get to know your</h1>

      <div className="floating_text_holder_container">
        <div className="floating_text_holder">
          <h1 className="sansita-swashed">COURSES</h1>

          <div className="floating_image"></div>
        </div>
      </div>

      <br />
      <br />
      <SearchCourse />
      <br />
      <br />
      <br />

      <p>
        You can also explore faculties and departments to find the information
        you need.
      </p>
      <button
        onClick={handleFacultiesClick}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        Go to Faculties
      </button>

      {/* Hidden or less obvious "Create" option */}
      <div
        onClick={handleCreateClick}
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#aaa",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        title="Admin only"
      >
        (Admin Access)
      </div>
    </div>
  );
};

export default HomePage;
