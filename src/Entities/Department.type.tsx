import { FacultyType } from "./Faculty.type";

export type DepartmentType = {
  id: string;
  name: string;
  faculty: FacultyType;
};
