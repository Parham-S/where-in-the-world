import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function BackBtn() {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ textTransform: "capitalize", letterSpacing: 1 }}
      onClick={() => router.back()}
    >
      <KeyboardBackspaceIcon fontSize="small" sx={{ mr: 1 }} />
      Back
    </Button>
  );
}

export default BackBtn;
