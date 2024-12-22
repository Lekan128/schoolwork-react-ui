import { useState } from "react";

interface Props {
  items: string[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  initialSelectionKey?: number;
}

const Selector = ({
  items,
  handleSelectChange,
  initialSelectionKey = 0,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState(items[initialSelectionKey]);
  const handleSelectionInternal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
    handleSelectChange(e);
  };

  return (
    <>
      <select
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectionInternal}
        value={selectedItem}
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
