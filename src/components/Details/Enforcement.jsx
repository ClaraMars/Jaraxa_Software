import { Box, Chip, Typography } from "@mui/material";

export default function Enforcement(props) {
  const data = props.data;
  console.log(props);
  const filteredData = Object.entries(data).filter(([key, value]) => {
    return key !== "openfda";
  });

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mb={2}>
      <Chip
        style={{ width: "100px", marginLeft: "auto" }}
        label={data.status}
        color={
          data.status === "Completed"
            ? "success"
            : data.status === "Terminated"
            ? "info"
            : "warning"
        }
        variant="outlined"
      />
      {filteredData.map(([key, value]) => (
        <Typography key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {Array.isArray(value)
            ? value.join(", ")
            : typeof value === "object"
            ? JSON.stringify(value)
            : value || "No disponible"}
        </Typography>
      ))}
    </Box>
  );
}
