import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

interface UserInfo {
  key: number;
  name?: string;
  email?: string;
  phone?: string;
}

function Item(boxProps: BoxProps) {
  const { sx, ...other } = boxProps;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#c18df2" : "#dfc3fa",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        borderRadius: 2,
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function UserInfoItem(props: UserInfo) {
  return (
    <div>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <Item>{props.name} </Item>
        <Item> {props.email} </Item>
        <Item> {props.phone} </Item>
      </Box>
    </div>
  );
}
