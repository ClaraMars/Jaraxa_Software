import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const BASE_FDA_API_ENDPOINTS = {
  event: `https://api.fda.gov/drug/event.json`,
  label: `https://api.fda.gov/drug/label.json`,
  ncd: `https://api.fda.gov/drug/ndc.json`,
  enforcement: `https://api.fda.gov/drug/enforcement.json`,
  drugsFDA: `https://api.fda.gov/drug/drugsfda.json`,
};

export function GradientCircularProgress() {
  return (
    <Box sx={{ margin: "5% 50%" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Box>
  );
}

export function SpinnerLineal() {}
