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
    async function getItem() {
      let i = await fb.getItemByID(fb.viewingBlueprint.products.typeid);
      //console.log(i);
      setItem(i);
    }
    if (fb.viewingBlueprint) {
      getItem();
    }
    return () => {};
  }, [fb.viewingBlueprint]);

  return (
    <Card variant="outlined" sx={{ maxWidth: "40em" }}>
      <CardHeader
        avatar={
          fb.viewingBlueprint ? (
            <Avatar
              src={`https://images.evetech.net/types/${fb.viewingBlueprint.products.typeid}/icon`}
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <></>
          )
        }
        title={
          item ? (
            <>
              <Typography variant="h3">{item.typeName}</Typography>
              <Typography variant="h5">
                {Math.ceil(fb.viewingBlueprint.multiplier) + " runs"}
              </Typography>
            </>
          ) : (
            <Skeleton variant="text" width={200} height={50} />
          )
        }
      ></CardHeader>
      <CardContent sx={{ padding: { xs: "0.25em", md: "1em" } }}>
        {fb.viewingBlueprint ? (
          <MaterialList
            blueprint={fb.viewingBlueprint}
            multiplier={fb.viewingBlueprint.multiplier}
          />
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
