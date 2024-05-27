import MediaBox from "./div/MediaBox";
function ReadType(props: any) {
  const { activity } = props;

  return <>{activity.hasMedia && <MediaBox activity={activity} />}</>;
}

export default ReadType;
