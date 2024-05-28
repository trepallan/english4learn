function AudioDiv(props: any) {
  const { activity } = props;
  return (
    <div className="AudioDiv">
      <audio src={"/audio/" + activity.audio} controls />
    </div>
  );
}

export default AudioDiv;
