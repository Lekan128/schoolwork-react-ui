import { MouseEvent, useEffect, useState } from "react";

interface Props {
  items: string[];
  title: string;
  onSelectItem: (item: string) => void;
}

// function ListGroup(props: Props) {
function ListGroup({ items, title, onSelectItem }: Props) {
  //   let items = ["New York", "Lagos", "London", "Azaba Gaun"];

  /*
  //   const message = items.length === 0 ? <p>NO item found</p> : null;
  const message = items.length === 0 && <p>NO item found</p>;
  //in the above code for jsx if you have a condition && a constant, if the condition is true the constant is returned
  //If the condition is false then it will return false

  */

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{title}</h1>
      {/* {message} */}
      <ul className="list-group">
        {items.map((item, index) => (
          //in the real world the key will be the items id = item.id
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            // onClick={() => console.log(index + " " + item)}
            onClick={(event) => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

/*
function ListGroup() {
  //localhost:8080/whatever
  const items = ["New York", "Lagos", "London", "Azaba Gaun"];

  const [listOfUser, setListOfUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   const baseUrl = "http://localhost:8080/faculty/hello";
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  //   try{
  //       const data = fetch(baseUrl).then((got) => got.json()).catch();
  //   }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      // Parse the JSON response into a JavaScript object
      const result = await response.json();

      setListOfUsers(result);

      console.log(result);
    } catch (err: { error: string }) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //triggers automatically after browser is opened
    fetchData();
  }, []);

  return (
    <>
      <h1>List of something</h1>
      <ul className="list-group">
        {listOfUser.map((item) => (
          //in the real world the key will be the items id = item.id
          <li className="list-group-item" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}
*/
export default ListGroup;
