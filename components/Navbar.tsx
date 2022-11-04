import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Navbar: React.FunctionComponent<{ toggleTheme: () => void }> = ({
  toggleTheme,
}) => {
  return (
    <>
      <AppBar color="inherit" elevation={3} sx={{ px: { lg: 10 } }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton href="/" color="inherit" sx={{ borderRadius: 0 }}>
                <Typography variant="h6" color="inherit">
                  Where in the world?
                </Typography>
              </IconButton>
            </Box>

            <IconButton
              color="inherit"
              sx={{ borderRadius: 0 }}
              onClick={toggleTheme}
            >
              <DarkModeOutlinedIcon />
              <Typography ml={1}>Dark Mode</Typography>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
      <Toolbar />
    </>
  );
};

export default Navbar;
