import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { Global } from "./Util/Global";
import Department from "./Department/Department";
import CreateFaculty from "./Faculty/CreateFaculty";
import CreateDepartment from "./Department/CreateDepartment";
import Course from "./Course/Course";
import CreateCourse from "./Course/CreateCourse";
import CreateLevel from "./Level/CreateLevel";
import Faculty from "./Faculty/Faculty.tsx";
import NotFound from "./components/NotFound.tsx";
import HomePage from "./components/HomePage.tsx";
import Create from "./components/Create.tsx";
import CreateReview from "./Review/CreateReview.tsx";
import { Review } from "./Review/Review.tsx";
import ViewCourse from "./Course/ViewCourse.tsx";
import UpdateCourse from "./Course/UpdateCourse.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: Global.faculty,
    element: <Faculty />,
  },
  {
    path: Global.faculty + Global.department,
    element: <Department />,
  },
  {
    path: Global.faculty + Global.department + Global.course,
    element: <Course />,
  },
  {
    path: Global.review + Global.paramCourseId,
    element: <Review />,
  },
  {
    path: Global.create,
    element: <Create />,
  },
  {
    path: Global.create + Global.faculty,
    element: <CreateFaculty />,
  },
  {
    path: Global.create + Global.department,
    element: <CreateDepartment />,
  },
  {
    path: Global.create + Global.course,
    element: <CreateCourse />,
  },
  {
    path: Global.create + Global.level,
    element: <CreateLevel />,
  },
  {
    path: Global.create + Global.review,
    element: <CreateReview />,
  },
  {
    path: Global.view + Global.course + Global.paramCourseId,
    element: <ViewCourse />,
  },
  {
    path: Global.update + Global.course + Global.paramCourseId,
    element: <UpdateCourse />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter> */}
  </StrictMode>
);
