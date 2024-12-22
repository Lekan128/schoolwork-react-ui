import { CourseMaterialType } from "./CourseMaterial.type";
import { DepartmentType } from "./Department.type";
import { LevelType } from "./Level.type";

export type CourseType = {
  id: string;
  title: string;
  code: string;
  reviews?: [string];
  semester: string;
  level: LevelType;
  department: DepartmentType;
  courseMaterials: CourseMaterialType[];
};
