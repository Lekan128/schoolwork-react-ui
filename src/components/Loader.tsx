interface Props {
  errorMessage?: string;
}

const Loader = ({ errorMessage = "" }: Props) => {
  return <div>{errorMessage ? errorMessage : "Loading ..."}</div>;
};

export default Loader;
