import "../App.css";
import { CourseMaterialType } from "../Entities/CourseMaterial.type";
import CourseMaterialInput from "./CourseMaterialInput";

interface Props {
  header?: string;
  tag?: string;
  placeHolder1?: string;
  placeHolder2?: string;
  onListChange: (list: CourseMaterialType[]) => void;
  preloadedCourseMaterials?: CourseMaterialType[];
}

const CourseMaterialInputCard = ({
  header = "",
  tag = ">",
  placeHolder1 = "name",
  placeHolder2 = "link",
  onListChange,
  preloadedCourseMaterials = [{ name: "", link: "" }],
}: Props) => {
  return (
    <div className="card">
      {header !== "" && <div className="card-header">{header}</div>}
      <div className="card-body">
        <CourseMaterialInput
          tag={tag}
          placeHolder1={placeHolder1}
          placeHolder2={placeHolder2}
          onListChange={onListChange}
          preloadedCourseMaterials={preloadedCourseMaterials}
        />
      </div>
    </div>
  );
};

export default CourseMaterialInputCard;
