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

const drawerWidth = 300;

function AppContainer(props) {
  const fb = { ...props.value };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    fb.setCurrentItemByID(19722);
    fb.generateTreeForID(19722);
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
        }}
      >
        {fb.currentItem ? (
          <BlueprintCard itemID={fb.currentItem.typeID} multiplier={1} />
        ) : (
          <div>No item</div>
        )}
      </Box>
    </Box>
  );
}

export default withContext(AppContainer);
