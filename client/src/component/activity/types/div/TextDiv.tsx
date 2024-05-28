import ReactMarkdown from "react-markdown";

function textDiv(props: any) {
  const { activity } = props;
  return (
    <>
      <div className="activityText">
        <ReactMarkdown>{activity.text}</ReactMarkdown>
      </div>
    </>
  );
}

export default textDiv;
