import { Box, Typography } from "@mui/material";

export default function Labels(props) {
  const data = props.data;
  console.log(props);

  const filteredData = Object.entries(data).filter(([key, value]) => {
    return key !== "openfda";
  });

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mb={2}>
      {filteredData.map(([key, value]) => (
        <Typography key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {Array.isArray(value)
            ? value.join(", ")
            : typeof value === "object"
            ? JSON.stringify(value)
            : value}
        </Typography>
      ))}
    </Box>
  );
}
