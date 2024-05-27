import ReadType from "./types/ReadType";

function SelectActivityType(props: any) {
  const { activity } = props;

  switch (activity.type) {
    case "concentration":
      return <div>SelectActivityType</div>;
    case "mutioption":
      return <div>SelectActivityType</div>;
    case "quiz":
      return <div>SelectActivityType</div>;
    case "read":
      return <ReadType activity={activity} />;
    case "pronunciation":
      return <div>SelectActivityType</div>;
    case "spelling":
      return <div>SelectActivityType</div>;
    case "listen":
      return <div>SelectActivityType</div>;
    case "vocabulary":
      return <div>SelectActivityType</div>;
    case "selectImage":
      return <div>SelectActivityType</div>;
    default:
      return <div>SelectActivityType</div>;
  }
}

export default SelectActivityType;
