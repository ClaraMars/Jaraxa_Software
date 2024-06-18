import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function DrugCard(props) {
  const navigate = useNavigate();

  const handleCardDetails = () => {
    const applicationNumber = props.results.application_number;
    navigate(`/drug/${applicationNumber}`, { state: { data: props.results } });
  };

  return (
    <Card sx={{ width: 275, margin: 1, border: "1px solid #454545" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.results.sponsor_name}
        </Typography>
        <Typography variant="h5" component="div">
          Productos
        </Typography>
        <Typography mb={1.5} color="text.secondary">
          {props.results.application_number}
        </Typography>
        <Divider />
        <Typography variant="body2">
          {props.results?.products.map((product) => (
            <li key={product.product_number}>
              <Typography component="span">{product.brand_name}</Typography>
            </li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleCardDetails}>
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
