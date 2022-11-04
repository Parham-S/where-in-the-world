import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

interface SearchBoxProps {
  handleSearch: React.ChangeEventHandler;
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
  handleSearch,
}) => {
  return (
    <Paper sx={{ px: 3, py: 2 }}>
      <TextField
        variant="standard"
        fullWidth
        InputProps={{
          startAdornment: <SearchIcon color="disabled" sx={{ mr: 2 }} />,
          placeholder: "Search for a country..",
          disableUnderline: true,
        }}
        onChange={handleSearch}
      />
    </Paper>
  );
};

export default SearchBox;
