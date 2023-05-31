import React, { useEffect, useState } from "react";
import withContext from "../../contexts/withContext";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import BlueprintCard from "./blueprintCard/BlueprintCard";
import AppBarTop from "../appBar/AppBarTop";
import ManufacturingTree from "./ManufaturingTree/ManufacturingTree";
import OptionsCard from "./Options/OptionsCard";

const drawerWidth = 300;

function AppContainer(props) {
  const fb = { ...props.value };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    fb.setCurrentItemByID(638);
    fb.generateTreeForID(638);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarTop
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <ManufacturingTree
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "4em",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12}>
            <OptionsCard />
          </Grid>
          <Grid xs={12}>
            {fb.currentItem ? (
              <BlueprintCard itemID={fb.currentItem.typeID} multiplier={1} />
            ) : (
              <div>No item</div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default withContext(AppContainer);
