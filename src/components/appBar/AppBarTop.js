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
import { Menu, SearchRounded } from "@mui/icons-material";

function AppBarTop(props) {
  const fb = { ...props.value };
  const [queryResponse, setQueryResponse] = useState([]);

  async function searchQuery(e) {
    if (e === "") {
      setQueryResponse([])
      return
    }
    const data = await fb.getBlueprintsByNamePartial(e);
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
              sx={{backgroundColor: "white"}}
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
