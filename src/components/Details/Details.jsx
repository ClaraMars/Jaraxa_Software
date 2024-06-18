import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Ndc from "./Ndc/Ndc";
import Enforcement from "./Enforcement/Enforcement";
import Event from "./Events/Events";
import Label from "./Labels/Labels";

// function renderData(data, indent = 0) {
//   return Object.entries(data).map(([key, value]) => {
//     if (typeof value === "object" && value !== null) {
//       return (
//         <div key={key} style={{ marginLeft: `${indent}em` }}>
//           <strong>{key}:</strong>
//           {renderData(value, indent + 1)}
//         </div>
//       );
//     } else {
//       return (
//         <div key={key} style={{ marginLeft: `${indent}em` }}>
//           <strong>{key}:</strong> {value}
//         </div>
//       );
//     }
//   });
// }

export default function Details() {
  const { applicationNumber } = useParams();
  const location = useLocation();
  const data = location.state.data;
  console.log(data);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsState = {
    events: useState(null),
    labels: useState(null),
    ndc: useState(null),
    enforcements: useState(null),
  };

  const components = [
    { data: resultsState.ndc[0]?.data[0], Component: Ndc },
    { data: resultsState.labels[0]?.data[0], Component: Label },
    { data: resultsState.events[0]?.data[0], Component: Event },
    { data: resultsState.enforcements[0]?.data[0], Component: Enforcement },
  ];

  useEffect(() => {
    setIsLoading(true);
    Object.entries(resultsState).forEach(([key, [state, setState]]) => {
      const url = `${BASE_FDA_API_ENDPOINTS[key]}?search=application_number:${applicationNumber}`;
      getDrugsResults(url, setState, setIsLoading, setError);
    });
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4" mb={3}>
          Medicamento {applicationNumber}
        </Typography>
        <Box>
          <Typography variant="h5">
            Número de aplicación: {applicationNumber}
          </Typography>
        </Box>
        {isLoading ? (
          <GradientCircularProgress />
        ) : (
          components.map(({ data, Component }, index) =>
            data ? (
              <Box key={index}>
                <Component data={data} />
              </Box>
            ) : null
          )
        )}

        {/* {renderData(data)} */}
      </Box>
    </>
  );
}
