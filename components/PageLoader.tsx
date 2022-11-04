import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}

export default Spinner;
