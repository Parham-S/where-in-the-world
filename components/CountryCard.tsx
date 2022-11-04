import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import TextWithLabel from "../components/TextWithLabel";

interface CountryProps {
  code: string;
  name: string;
  image: string;
  population: string;
  region: string;
  capital: string;
}

const CountryCard: React.FunctionComponent<CountryProps> = ({
  code,
  name,
  image,
  population,
  region,
  capital,
}) => {
  return (
    <Link href={`/country/${code}`} passHref>
      <Card
        sx={{
          cursor: "pointer",
          height: "100%",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="country flag"
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ p: 4 }}>
          <Typography gutterBottom noWrap variant="h5" mb={2} fontWeight="bold">
            {name}
          </Typography>

          <TextWithLabel label="Population" text={population} />
          <TextWithLabel label="Region" text={region} />
          <TextWithLabel label="Capital" text={capital} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
