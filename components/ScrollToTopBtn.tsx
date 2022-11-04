import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

function ScrollToTopBtn() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 20, sm: 50 },
          right: { xs: 20, sm: 50 },
        }}
      >
        <Fab
          size="small"
          color="secondary"
          aria-label="scroll back to top"
          disableRipple
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollToTopBtn;
