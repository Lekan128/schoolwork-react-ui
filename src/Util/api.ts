import { Global } from "./Global";

export const api = {
  faculty: () => Global.base_url+Global.faculty,
  department: () => Global.base_url+Global.department,
  courses: () => Global.base_url+Global.course,
  reviews: () => Global.base_url+Global.review
};
