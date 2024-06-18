export default function Labels(props) {
  const data = props.data;
  console.log(props);
  return (
    <div>
      <h2>Labels</h2>
      <p>{data.abuse}</p>
    </div>
  );
}
