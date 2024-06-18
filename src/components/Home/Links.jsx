import Box from "@mui/material/Box";
import EastIcon from "@mui/icons-material/East";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export function Links(props) {
  const dense = true;
  const secondary = false;

  // const handleInputValue = (value) => {
  //   const syntheticEvent = {
  //     target: {
  //       value: value,
  //     },
  //   };
  //   props.handleQuery(syntheticEvent, props.setQuery, "term");
  // };

  // const handleSearchLink = (linkText) => {
  //   return (e) => {
  //     e.preventDefault();
  //     handleInputValue(linkText);
  //     props.handleSearch(e);
  //   };
  // };
  return (
    <Box>
      <Typography variant="h6">Enlaces rápidos</Typography>
      <List dense={dense}>
        {props.links.map((link, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <EastIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Link
                  color="inherit"
                  underline="hover"
                  // onClick={handleSearchLink(link)}
                  onClick={props.handleSearch}
                >
                  {link}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
