// import React from 'react'

import { createBrowserRouter } from "react-router";
import App from "../App";
import Faculty from "../Faculty/Faculty";

// const BrowserRouter = () => {
//   return (
//     <div>BrowserRouter</div>
//   )
// }

// export default BrowserRouter

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router";
// import App from "../App";

// const root:HTMLEle = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//     </Routes>
//   </BrowserRouter>
// );

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/faculty",
        element: <Faculty />,
      },
    ],
  },
]);
