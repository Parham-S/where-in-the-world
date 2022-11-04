import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { API_URL } from "../../constants";
import Meta from "../../components/Meta";
import BackBtn from "../../components/BackBtn";
import TextWithLabel from "../../components/TextWithLabel";

const CountryOnMap = dynamic(() => import("../../components/CountryOnMap"), {
  ssr: false,
});

interface Country {
  flags: { svg: string };
  alpha2Code: string;
  name: string;
  nativeName: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  topLevelDomain: string[];
  languages: { name: string }[];
  currencies: { name: string }[];
  latlng: [number, number];
}

const fieldsToInclude =
  "name,nativeName,capital,region,subregion,population,flags,alpha2Code,topLevelDomain,languages,currencies,borders,latlng";

const CountryById: NextPage<{
  country: Country;
  borders: string[];
  error: string;
}> = ({ country, error, borders }) => {
  return (
    <Container>
      <BackBtn />

      {error ? (
        <Box display="flex" justifyContent="center">
          <Alert severity="error" sx={{ width: { xs: "100%", sm: "50%" } }}>
            {error}
          </Alert>
        </Box>
      ) : (
        <>
          <Meta title={country.name} />

          <Grid container columnSpacing={12} mt={8} mb={4}>
            <Grid item xs={12} md={6} sx={{ mb: "-8%" }}>
              <img
                src={country.flags.svg}
                alt="Country flag"
                style={{ width: "100%", height: "80%", objectFit: "cover" }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} sx={{ mt: 2 }}>
              <Typography
                variant="h4"
                mb={3}
                gutterBottom
                noWrap
                sx={{ fontWeight: 800, width: { lg: "200%" } }}
              >
                {country.name}
              </Typography>

              <TextWithLabel label="Native Name" text={country.nativeName} />
              <TextWithLabel
                label="Population"
                text={country.population.toLocaleString()}
              />
              <TextWithLabel label="Region" text={country.region} />
              <TextWithLabel label="Sub Region" text={country.subregion} />
              <TextWithLabel label="Capital" text={country.capital} />
            </Grid>

            <Grid item md={6} sx={{ display: { lg: "none" } }} />

            <Grid item xs={12} md={6} lg={3} sx={{ mt: { xs: 4, lg: 10 } }}>
              <TextWithLabel
                label="Top Level Domain"
                text={country.topLevelDomain.join(", ")}
              />
              <TextWithLabel
                label="Currencies"
                text={country.currencies
                  .map((currency) => currency.name)
                  .join(", ")}
              />
              <TextWithLabel
                label="Languages"
                text={country.languages
                  .map((language) => language.name)
                  .join(", ")}
              />
            </Grid>

            <Grid item xs={12} md={6} />

            <Grid item xs={12} md={6} mt={5} display={{ md: "flex" }}>
              <Box mt={0.5} sx={{ whiteSpace: "nowrap" }}>
                <TextWithLabel
                  label="Border Countries"
                  text={borders.length ? " " : ""}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                columnGap={1}
                ml={{ md: 1 }}
              >
                {borders.map((border, index) => (
                  <Paper key={index} sx={{ px: 3, py: 0.5, mb: 1 }}>
                    <Typography>{border}</Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ mb: 5, mt: 10 }}>
        <CountryOnMap
          latitude={country.latlng[0]}
          longitude={country.latlng[1]}
          countryName={country.name}
        />
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const country = await axios.get(
      `${API_URL}/alpha/${context.params?.code}?fields=${fieldsToInclude}`
    );

    const countryBordersCode = country.data.borders;
    let borders = [];
    if (countryBordersCode?.length) {
      for (const alphaCode of countryBordersCode) {
        const border = await axios.get(
          `${API_URL}/alpha/${alphaCode}?fields=name`
        );
        borders.push(border.data.name);
      }
    }

    return {
      props: {
        country: country?.data || {},
        borders,
      },
    };
  } catch (err: any) {
    return {
      props: {
        error: "Something went wrong",
      },
    };
  }
};

export default CountryById;
