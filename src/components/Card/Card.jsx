import { useNavigate } from "react-router-dom";
import { CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function DrugCard(props) {
  const navigate = useNavigate();
  const data = props.results;

  const handleCardDetails = () => {
    const applicationNumber = data.application_number;
    navigate(`/drug/${applicationNumber}`, { state: { data: data } });
  };

  return (
    <Card sx={{ width: 300, margin: 1, border: "1px solid #454545" }}>
      <Box
        display="flex"
        direction="row"
        alignItems="start"
        justifyContent="space-between"
        p={2}
      >
        <CardHeader
          style={{ padding: 0 }}
          title={data.openfda?.generic_name[0] ?? data.products[0].brand_name}
          subheader={data.application_number}
        />
        {data.openfda?.route && (
          <Chip
            label={data.openfda?.route}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>
      <Divider />

      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {data.sponsor_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.openfda
            ? data.openfda.manufacturer_name.slice(0, 2).join(", ") +
              (data.openfda.manufacturer_name.length > 2 ? "..." : "")
            : ""}
        </Typography>
        <Typography variant="subtitle" component="div">
          Productos
        </Typography>
        <Typography variant="body2">
          {data?.products.map((product) => (
            <li key={product.product_number}>
              <Typography component="span">
                {product.active_ingredients
                  .map(
                    (ingredient) => `${ingredient.name} ${ingredient.strength}`
                  )
                  .join(", ")}
              </Typography>
            </li>
          ))}
        </Typography>
        <Typography mt={2} variant="body1">
          Submisiones totales: {data.submissions ? data.submissions.length : 0}
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
