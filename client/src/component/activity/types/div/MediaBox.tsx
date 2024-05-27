function MediaBox(props: any) {
  const { activity } = props;
  console.log(activity);
  if (activity.hasMedia === "video") {
    return (
      <div className="mediaBox">
        <iframe src={activity.media} title="video"></iframe>
      </div>
    );
  }
  return <div></div>;
}

export default MediaBox;
