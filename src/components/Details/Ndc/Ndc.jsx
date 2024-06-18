export default function Ndc(props) {
  const data = props.data;
  console.log(props);
  return (
    <div>
      <h2>NDC</h2>
      <p>{data.product_ndc}</p>
    </div>
  );
}
