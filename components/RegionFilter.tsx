import { memo } from "react";
import { SelectChangeEvent } from "@mui/material";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface FilterProps {
  region: string;
  handleRegionChange: (e: SelectChangeEvent) => void;
}

const RegionFilter: React.FunctionComponent<FilterProps> = ({
  region,
  handleRegionChange,
}) => {
  return (
    <Paper sx={{ p: 2, width: { xs: "70%", sm: "100%" } }}>
      <FormControl fullWidth>
        <Select
          variant="standard"
          label="Filter by Region"
          sx={{ ml: 2 }}
          displayEmpty
          disableUnderline
          value={region}
          onChange={handleRegionChange}
        >
          <MenuItem value="">Filter by Region</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default memo(RegionFilter);
