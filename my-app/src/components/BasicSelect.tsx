import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface BasicSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicSelect({ value, onChange }: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select">Select</InputLabel>
        <Select
          labelId="simple-select"
          id="simple-select"
          value={value}
          label="Select"
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
