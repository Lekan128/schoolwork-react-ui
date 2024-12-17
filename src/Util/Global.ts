export class Global{

    static base_url = import.meta.env.VITE_REACT_APP_BASE_URL;
    // static base_url = "http://localhost:8080";
    static faculty = "/faculty";
    static department = "/department";
    static course = "/course";
    static level = "/level"
    static review = "/review"


    static create = "/create";


    static paramCourseId = "/:courseId";

    static semesters = ["FIRST", "SECOND"];

    // static handleSave = (object : string) => {
    //     fetch(Global.base_url + Global.faculty, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: object,
    //     })
    //       .then(() => {
    //         console.log("Complete");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
 }
