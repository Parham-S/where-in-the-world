import Typography from "@mui/material/Typography";

interface LabelProps {
  label: string;
  text: string;
}

const TextWithLabel: React.FunctionComponent<LabelProps> = ({
  label,
  text,
}) => {
  return (
    <Typography color="text.secondary" gutterBottom>
      <Typography
        component="span"
        color="text.primary"
        sx={{ fontWeight: 600 }}
      >
        {label}:{" "}
      </Typography>
      {text || "--"}
    </Typography>
  );
};

export default TextWithLabel;
