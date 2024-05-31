import MarkdownIt from "markdown-it";
import { ActivityContext } from "../../activityContext";
import { useContext } from "react";

const md = new MarkdownIt({ html: true });

function TableDiv() {
  const { activity } = useContext(ActivityContext);
  const markdown = md.render(activity.table);

  return (
    <>
      <div
        className="activityTable"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    </>
  );
}

export default TableDiv;
