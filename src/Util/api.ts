import { Global } from "./Global";

export const api = {
  faculty: () => Global.base_url+Global.faculty,
  department: () => Global.base_url+Global.department,
  courses: () => Global.base_url+Global.course,
  coursesByDepartment: (departmentId : string) => Global.base_url + Global.course + Global.department + "/" + departmentId,
  coursesById: (courseId : string) => Global.base_url + Global.course + "/" + courseId,
  reviews: () => Global.base_url+Global.review
};
