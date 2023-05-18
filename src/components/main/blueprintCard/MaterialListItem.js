import React, { useEffect, useState } from "react";
import withContext from "../../../contexts/withContext";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function MaterialListItem(props) {
  const fb = { ...props.value };
  const theme = useTheme();
  const [itemName, setItemName] = useState();

  useEffect(() => {
    async function getName() {
      let n = await fb.getNameByID(props.typeid);
      setItemName(n);
    }
    if (!itemName) {
      getName();
    }

    return () => {};
  }, []);

  return (
    <ListItem
      key={props.typeid}
      disableGutters={useMediaQuery(theme.breakpoints.only("xs"))}
    >
      <ListItemButton
        sx={{
          paddingLeft: { xs: "0", md: "1em" },
        }}
        onClick={() => fb.setCurrentItemByID(props.typeid)}
      >
        <ListItemIcon sx={{ display: { xs: "none", md: "none", lg: "block" } }}>
          <NavigateBefore />
        </ListItemIcon>
        <ListItemAvatar>
          <Avatar
            src={`https://images.evetech.net/types/${props.typeid}/icon`}
          />
        </ListItemAvatar>
      </ListItemButton>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <ListItemText
          primary={
            itemName ? (
              itemName
            ) : (
              <Skeleton variant="text" width={200} height={"2rem"} />
            )
          }
          secondary={props.quantity.toLocaleString("en-US")}
        />
        <ListItemText
          primary={
            props.totalPrice
              ? "Total:" +
                props.totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) +
                " ISK"
              : "na"
          }
          secondary={
            props.unitPrice
              ? "Unit: " +
                props.unitPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) +
                " ISK"
              : "na"
          }
          sx={{ textAlign: "right" }}
        />
      </Stack>
    </ListItem>
  );
}

export default withContext(MaterialListItem);
