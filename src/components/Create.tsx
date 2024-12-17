import { Link, useNavigate } from "react-router-dom";
import { Global } from "../Util/Global";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Admin Create Hub</h1>
      <p>Select an entity to create:</p>
      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => navigate(Global.create + Global.faculty)}
          style={buttonStyle}
        >
          Create Faculty
        </button>
        <button
          onClick={() => navigate(Global.create + Global.department)}
          style={buttonStyle}
        >
          Create Department
        </button>
        <button
          onClick={() => navigate(Global.create + Global.course)}
          style={buttonStyle}
        >
          Create Course
        </button>
        <button
          onClick={() => navigate(Global.create + Global.level)}
          style={buttonStyle}
        >
          Create Level
        </button>
        <button
          onClick={() => navigate(Global.create + Global.review)}
          style={buttonStyle}
        >
          Add Review
        </button>
      </div>
      <br />
      <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
};

const buttonStyle = {
  padding: "1rem 2rem",
  margin: "0.5rem",
  fontSize: "1.2rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
};

export default Create;
