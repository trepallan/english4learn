import ReactMarkdown from "react-markdown";

function HeaderDiv(props: any) {
  const { activity } = props;
  return (
    <>
      <div className="activityHeader">
        <h4>
          <ReactMarkdown>{activity.header}</ReactMarkdown>
        </h4>
      </div>
    </>
  );
}

export default HeaderDiv;
