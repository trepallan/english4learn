import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true });

const html =
  "| Singular |    | Plural  |     |    |     |\n" +
  "| ---------- | ------- | ---------- | -------- | ------- | --------- |\n" +
  "| I    | am  | a student. | We  | are | students. |\n" +
  "| You   | are | You   | are  |    |     |\n" +
  "| He She | is  | They  | are  |    |     |\n" +
  "| It   | is  | a pencil. | They | are | pencils. |";

const markdown = md.render(html);

function TableDiv(props: any) {
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
