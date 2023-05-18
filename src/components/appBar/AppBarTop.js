import React, { useState } from "react";
import withContext from "../../contexts/withContext";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Menu, SearchRounded } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AppBarTop(props) {
  const fb = { ...props.value };

  const [queryResponse, setQueryResponse] = useState([]);
  async function searchQuery(e) {
    const data = await fb.getBlueprintsByNamePartial(e);
    console.log(data);
    setQueryResponse(data);
  }
  function selectBlueprint(bp) {
    //fb.setViewingBlueprint(bp);
    fb.setCurrentItemByID(bp.products.typeid);
    fb.generateTreeForID(bp.products.typeid);
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={queryResponse}
          autoHighlight
          getOptionLabel={(option) => option.products.typeName}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              onClick={() => {
                selectBlueprint(option);
              }}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://images.evetech.net/types/${option.products.typeid}/icon`}
                alt=""
              />
              {option.products.typeName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find a blueprint"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              onChange={(event) => {
                searchQuery(event.target.value);
              }}
            />
          )}
        />
      </Toolbar>
    </AppBar>
  );
}

export default withContext(AppBarTop);
