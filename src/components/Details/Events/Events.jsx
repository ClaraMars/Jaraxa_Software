export default function Events(props) {
  const data = props.data;
  console.log(props);
  return (
    <div>
      <h2>Events</h2>
      <p>{data.duplicate}</p>
    </div>
  );
}
