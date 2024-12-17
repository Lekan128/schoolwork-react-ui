interface Props {
  items: string[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector = ({ items, handleSelectChange }: Props) => {
  return (
    <>
      <select
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectChange}
      >
        {items.length > 0 &&
          items.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
    </>
  );
};

export default Selector;
