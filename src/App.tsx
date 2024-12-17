// import { useState } from "react";
// import Message from "./Message";
// import Alert from "./components/Alert";
// import Button from "./components/Button";
// import ListGroup from "./components/ListGroup";
import Faculty from "./Faculty/Faculty";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import { Global } from "./Util/Global";
import Department from "./Department/Department";
import CreateFaculty from "./Faculty/CreateFaculty";
import CreateDepartment from "./Department/CreateDepartment";
import Course from "./Course/Course";
import CreateCourse from "./Course/CreateCourse";
import CreateLevel from "./Level/CreateLevel";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path={Global.faculty} element={<Faculty />}></Route>
        <Route
          path={Global.faculty + Global.department}
          element={<Department />}
        ></Route>
        <Route
          path={Global.faculty + Global.department + Global.course}
          element={<Course />}
        ></Route>
        <Route
          path={Global.create + Global.faculty}
          element={<CreateFaculty />}
        ></Route>
        <Route
          path={Global.create + Global.department}
          element={<CreateDepartment />}
        ></Route>
        <Route
          path={Global.create + Global.course}
          element={<CreateCourse />}
        ></Route>
        <Route
          path={Global.create + Global.level}
          element={<CreateLevel />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
