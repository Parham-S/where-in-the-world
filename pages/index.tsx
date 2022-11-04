import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect, useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "@mui/utils/debounce";
import InfiniteScroll from "react-infinite-scroll-component";

import { API_URL } from "../constants";
import SearchBox from "../components/SearchBox";
import RegionFilter from "../components/RegionFilter";
import CountryCard from "../components/CountryCard";
import ScrollToTopBtn from "../components/ScrollToTopBtn";

interface Country {
  flags: { svg: string };
  alpha2Code: string;
  name: string;
  region: string;
  capital: string;
  population: number;
}

type Regions = "" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";
const fieldsToInclude = "name,capital,region,population,flags,alpha2Code";
const ITEMS_PER_PAGE = 12;

const Home: NextPage<{ countriesData: Country[]; error: string }> = ({
  countriesData,
  error,
}) => {
  const [region, setRegion] = useState<Regions>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchData, setSearchData] = useState<Country[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [itemsToShow, setItemsToShow] = useState<Country[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!isSearching && !region && countriesData) {
      setCountries(countriesData);
      setItemsToShow(countriesData.slice(0, ITEMS_PER_PAGE));
    }

    if (region) {
      setIsFiltering(true);
      setHasMore(true);
      const dataByRegion = (isSearching ? searchData : countriesData).filter(
        (country) => country.region === region
      );

      dataByRegion.length <= ITEMS_PER_PAGE && setHasMore(false);
      setItemsToShow(dataByRegion.slice(0, ITEMS_PER_PAGE));
      setCountries(dataByRegion);
    } else {
      setIsFiltering(false);
      setHasMore(true);

      const dataBeingShown = isSearching ? searchData : countriesData;
      setItemsToShow(dataBeingShown.slice(0, ITEMS_PER_PAGE));
      dataBeingShown.length <= ITEMS_PER_PAGE && setHasMore(false);
    }
  }, [countriesData, region, searchData, isSearching]);

  const handleRegionChange = useCallback((e: SelectChangeEvent) => {
    setRegion(e.target.value as Regions);
  }, []);

  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value.trim().toLowerCase();

      if (searchTerm) {
        setHasMore(true);
        const searchResults = countriesData.filter((country) =>
          country.name.toLowerCase().includes(searchTerm)
        );

        searchResults.length <= ITEMS_PER_PAGE && setHasMore(false);
        setItemsToShow(searchResults.slice(0, ITEMS_PER_PAGE));
        setSearchData(searchResults);
        setIsSearching(true);
        return;
      }

      setSearchData([]);
      setIsSearching(false);
    },
    1000
  );

  const addMoreCountries = () => {
    const dataBeingShown = isSearching && !isFiltering ? searchData : countries;

    if (itemsToShow.length >= dataBeingShown.length) {
      setHasMore(false);
      return;
    }

    setItemsToShow((prevValue) => {
      const newItems = dataBeingShown.slice(
        prevValue.length,
        prevValue.length + ITEMS_PER_PAGE
      );

      return [...prevValue, ...newItems];
    });
  };

  return (
    <Container maxWidth="xl">
      {error ? (
        <Box display="flex" justifyContent="center">
          <Alert severity="error" sx={{ width: { xs: "100%", sm: "50%" } }}>
            {error}
          </Alert>
        </Box>
      ) : (
        <Box sx={{ px: { lg: 10 } }}>
          <Grid container spacing={4} mb={7} justifyContent="space-between">
            <Grid item xs={12} sm={7} md={6}>
              <SearchBox handleSearch={handleSearch} />
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3}>
              <RegionFilter
                region={region}
                handleRegionChange={handleRegionChange}
              />
            </Grid>
          </Grid>

          <InfiniteScroll
            dataLength={itemsToShow.length}
            next={addMoreCountries}
            hasMore={hasMore}
            loader={
              <Box textAlign="center" my={5}>
                <CircularProgress color="inherit" size={30} />
              </Box>
            }
          >
            <Grid container spacing={10} mb={5} justifyContent="center">
              {itemsToShow.map((country) => (
                <Grid
                  item
                  key={country.alpha2Code}
                  xs={11}
                  sm={6}
                  md={4}
                  xl={3}
                >
                  <CountryCard
                    code={country.alpha2Code}
                    image={country.flags.svg}
                    name={country.name}
                    region={country.region}
                    capital={country.capital}
                    population={country.population.toLocaleString()}
                  />
                </Grid>
              ))}

              {((isSearching && !searchData.length) ||
                (isFiltering && !countries.length)) && (
                <Grid item mt={10}>
                  <Typography color="text.secondary">No results</Typography>
                </Grid>
              )}
            </Grid>
          </InfiniteScroll>
        </Box>
      )}

      <ScrollToTopBtn />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const countries = await axios.get(
      `${API_URL}/all?fields=${fieldsToInclude}`
    );
    return {
      props: {
        countriesData: countries?.data || [],
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

export default Home;
