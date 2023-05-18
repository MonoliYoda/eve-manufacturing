import React, { useEffect } from "react";
import withContext from "../../../contexts/withContext";
import { TreeItem, TreeView } from "@mui/lab";
import { ChevronRight, ExpandMore, Visibility } from "@mui/icons-material";
import { Box, Drawer } from "@mui/material";

function ManufacturingTree(props) {
  const fb = { ...props.value };
  const { window } = props;

  const handleViewClick = (id) => {
    fb.setViewingBlueprintByID(id);
  };

  const renderTree = (nodes) => {
    if (!fb.treeStructure) {
      return <></>;
    }
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        icon={Array.isArray(nodes.children) ? <Visibility /> : <></>}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  const searchTreeByID = (element, id) => {
    if (element.id === id) {
      return element;
    } else if (element.children != null) {
      let res = false;
      let currentChild;
      for (let i = 0; i < element.children.length; i++) {
        currentChild = element.children[i];
        res = searchTreeByID(currentChild, id);
        if (res) {
          return res;
        }
      }
      return false;
    }
  };

  const selectNode = (event, node) => {
    const nodeObject = searchTreeByID(fb.treeStructure, node);
    console.log("Found node object: ", nodeObject);
    fb.setViewingBlueprintByID(nodeObject.typeid);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer =
    typeof fb.treeStructure !== "undefined" ? (
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMore />}
        expanded={fb.treeStructure.expandableIDs}
        defaultExpandIcon={<ChevronRight />}
        onNodeSelect={selectNode}
        sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(fb.treeStructure)}
      </TreeView>
    ) : (
      <div>Skeletons go here</div>
    );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default withContext(ManufacturingTree);
