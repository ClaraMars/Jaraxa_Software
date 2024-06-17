import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//import { styled } from "@mui/material/styles";

export default function DrugCard({ results }) {
  // const CustomCard = styled(Card)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#02294f33" : "#9cccfc33",
  //   border: `qpx solid ${
  //     theme.palette.mode === "dark" ? "#02294f" : "#9CCCFC"
  //   }`,
  // }));

  return (
    <Card sx={{ width: 275, margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {results.sponsor_name}
        </Typography>
        <Typography variant="h5" component="div">
          Productos
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {results.application_number}
        </Typography>
        <Typography variant="body2">
          {results?.products.map((product) => (
            <li key={product.product_number}>
              <Typography component="span">{product.brand_name}</Typography>
            </li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver más</Button>
      </CardActions>
    </Card>
  );
}
