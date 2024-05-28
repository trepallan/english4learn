function MediaBox(props: any) {
  const { activity } = props;

  if (activity.hasMedia === "video") {
    return (
      <div className="mediaBox">
        <iframe src={activity.media} title="video" />
      </div>
    );
  }
  return (
    <div className="mediaBox">
      <img src={"/images/" + activity.media} />
    </div>
  );
}

export default MediaBox;
