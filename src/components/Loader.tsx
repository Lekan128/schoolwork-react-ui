import "../loader.css";

interface Props {
  errorMessage?: string;
}

const Loader = ({ errorMessage = "" }: Props) => {
  return (
    <>
      <div className="centered_container">
        <div className="loader"></div>
        {errorMessage ? errorMessage : "Loading ..."}
      </div>
    </>
  );
};

export default Loader;
