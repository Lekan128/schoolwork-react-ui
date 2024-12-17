import { useState } from "react";
import Button from "../components/Button";
import { Global } from "../Util/Global";
import Input from "../components/Input";
import FacultySelect from "../Faculty/FacultySelect";
import DepartmentSelect from "../Department/DepartmentSelect";
import { useNavigate } from "react-router-dom";
import CourseSelect from "../Course/CourseSelect";
import MultiLineInput from "../components/MultiLineInput";

const CreateReview = () => {
  let navitate = useNavigate();

  const [facultyName, setFacultyName] = useState("");

  const [review, setReview] = useState("");
  const [testTips, setTestTips] = useState("");
  const [examTips, setExamTips] = useState("");
  const [lecturer, setLecturer] = useState("");

  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const selectDptMessage = "Plese select a Department";
  const selectFacultyMessage = "Plese select a Faculty";

  const handleFacultySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFacultyName = e.target.value;
    setFacultyName(selectedFacultyName);
  };

  const handleDepartmentSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    setSelectedDepartmentId(selectedId);
  };

  const handleCourseSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    setSelectedCourseId(selectedId);
  };

  const handleSave = () => {
    if (
      lecturer === "" ||
      selectedCourseId === "" ||
      review === "" ||
      testTips === "" ||
      examTips === ""
    ) {
      console.log("Fill up fields");
      return;
      //alert user
    }

    const dto = {
      lecturer: lecturer,
      courseId: selectedCourseId,
      review: review,
      testTips: testTips,
      examTips: examTips,
    };

    fetch(Global.base_url + Global.review, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then(() => {
        console.log("Complete");
        navitate(Global.create);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <FacultySelect
        handleSelectChange={handleFacultySelectChange}
        defaultSelectedMessage={selectFacultyMessage}
      />
      <DepartmentSelect
        facultyName={facultyName}
        defaultSelectDptMessage={selectDptMessage}
        handleSelectChange={handleDepartmentSelectChange}
      />
      <CourseSelect
        departmentId={selectedDepartmentId}
        defaultSelectCourseMessage="Select Course"
        handleSelectChange={handleCourseSelectChange}
      />
      <Input
        tag="Lecturer"
        placeHolder="Who took the course?"
        onTextInput={setLecturer}
      />
      <MultiLineInput
        header="Review :"
        placeholder="Input review here"
        rows={4}
        onTextChange={setReview}
      />
      <MultiLineInput
        header="Test Tips :"
        placeholder="Input some tips for test here"
        rows={2}
        onTextChange={setTestTips}
      />
      <MultiLineInput
        header="Exam Tips :"
        placeholder="Input some tips for exam here"
        rows={2}
        onTextChange={setExamTips}
      />

      <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default CreateReview;
