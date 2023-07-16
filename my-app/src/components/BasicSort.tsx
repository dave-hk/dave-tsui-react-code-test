import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface BasicSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicSort({ value, onChange }: BasicSortProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-sort">Sort By</InputLabel>
        <Select
          labelId="simple-sort"
          id="simple-sort"
          value={value}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem>Default</MenuItem>
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
