import api from "../../../authentication/api";

document.addEventListener("DOMContentLoaded", () => {
  // Handle Enter key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const NextButton = document.querySelector<any>("#NextCourse");
      if (NextButton) NextButton.click();
    }
  });
});
function CourseConcuded(props: any) {
  const { course } = props;

  async function handleButtonClick(event: any) {
    const action = event.target.dataset.action;
    switch (action) {
      case "back":
        window.location.replace(`/select/unit/${course._id}`);
        break;
      case "home":
        window.location.replace("/");
        break;
      case "next":
        const response = await api.post(`/activities/nextCourse/${course._id}`);

        if (response.status !== 200) {
          console.log(response.message);
          return;
        }

        if (response.theme)
          // If there is a next Course
          return window.location.replace(`/activity/${response.theme}`);
        else window.location.replace("/");
        break;
    }
  }

  return (
    <div className="CourseConcuded">
      <h1>Course Concluded</h1>

      <div className="Concluded ClassConcuded">
        <h3 className="text-success">Well Done!</h3>
        <h3>{course.name}</h3>
        <p>Score : {course.score}</p>
      </div>
      <div className="ConcludedButtons">
        <button
          className="btn btn-success"
          data-action="back"
          onClick={handleButtonClick}
        >
          &#8592; Back to Course
        </button>

        <button
          className="btn btn-success"
          data-action="home"
          onClick={handleButtonClick}
        >
          Home
        </button>

        <button
          id="NextCourse"
          className="btn btn-success"
          data-action="next"
          onClick={handleButtonClick}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default CourseConcuded;
