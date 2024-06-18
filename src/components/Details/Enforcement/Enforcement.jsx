export default function Enforcement(props) {
  const data = props.data;
  console.log(props);
  return (
    <div>
      <h2>Enforcement</h2>
      <p>{data.classification}</p>
    </div>
  );
}
