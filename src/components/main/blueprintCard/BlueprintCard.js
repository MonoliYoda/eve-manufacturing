import React, { useEffect, useState } from "react";
import withContext from "../../../contexts/withContext";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import MaterialList from "./MaterialList";

function BlueprintCard(props) {
  const fb = { ...props.value };
  const [blueprint, setBlueprint] = useState();
  const [item, setItem] = useState();
  useEffect(() => {
    async function getBP() {
      let bp = await fb.getBlueprintForID(props.itemID);
      //console.log(bp);
      setBlueprint(bp);
    }
    if (!blueprint) {
      getBP();
    } else if (blueprint.products.itemid !== props.itemID) {
      getBP();
    }
    async function getItem() {
      let i = await fb.getItemByID(props.itemID);
      //console.log(i);
      setItem(i);
    }
    if (!item) {
      getItem();
    }
    return () => {};
  }, [props.itemID]);

  return (
    <Card variant="outlined" sx={{ maxWidth: "40em" }}>
      <CardHeader
        avatar={
          <Avatar
            src={`https://images.evetech.net/types/${props.itemID}/icon`}
            sx={{ width: 100, height: 100 }}
          />
        }
        title={
          item ? (
            <><Typography variant="h3">{item.typeName}</Typography><Typography variant="h5">{'X' + props.multiplier}</Typography></>
          ) : (
            <Skeleton variant="text" width={200} height={50} />
          )
        }
      ></CardHeader>
      <CardContent sx={{ padding: { xs: "0.25em", md: "1em" } }}>
        {blueprint ? (
          <MaterialList blueprint={blueprint} multiplier={props.multiplier} />
        ) : (
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={300} height={40} />
            <Skeleton variant="rounded" width={300} height={40} />
            <Skeleton variant="rounded" width={300} height={40} />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default withContext(BlueprintCard);
