import api from "../../../authentication/api";
function LessonConcuded(props: any) {
  const { lesson } = props;

  async function handleButtonClick(event: any) {
    const action = event.target.dataset.action;
    switch (action) {
      case "back":
        window.location.replace(`/select/theme/${lesson._id}`);
        break;
      case "home":
        window.location.replace("/");
        break;
      case "next":
        const response = await api.post(`/activities/nextLesson/${lesson._id}`);

        if (response.status !== 200) {
          console.log(response.message);
          return;
        }
        window.location.replace(`/activity/${response.theme}`);

        break;
    }
  }

  return (
    <div className="LessonConcuded">
      <h1>Lesson Concluded</h1>

      <div className="Concluded">
        <h3>{lesson.name}</h3>
        <p>Score : {lesson.score}%</p>
      </div>
      <div className="ConcludedButtons">
        <button
          className="btn btn-success"
          data-action="back"
          onClick={handleButtonClick}
        >
          &#8592; Back to Lesson
        </button>
        <button
          className="btn btn-success"
          data-action="home"
          onClick={handleButtonClick}
        >
          Home
        </button>
        <button
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

export default LessonConcuded;
