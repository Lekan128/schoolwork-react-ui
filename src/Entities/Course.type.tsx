import { DepartmentType } from "./Department.type";
import { LevelType } from "./Level.type";

export type CourseType = {
  id: string;
  title: string;
  code: string;
  reviews?: [string];
  materialLinks?: [string];
  semester: string;
  level: LevelType;
  department: DepartmentType;
};
