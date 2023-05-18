import React, { useEffect, useState } from "react";
import withContext from "../../../contexts/withContext";
import MaterialListItem from "./MaterialListItem";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function MaterialList(props) {
  const fb = { ...props.value };
  const [materials, setMaterials] = useState([]);
  const [totalBuildCost, setTotalBuildCost] = useState(0);
  const [buildCostList, setBuildCostList] = useState([]);

  useEffect(() => {
    setTotalBuildCost(buildCostList.reduce((a, b) => a + b, 0));
    return () => {};
  }, [buildCostList]);

  useEffect(() => {
    async function calculatePrice(material) {
      let data = await fb.getPrice(material.typeid);
      //console.log(data);
      if (data === undefined) {
        data = { sellAvgFivePercent: 0 };
      }
      const unitPrice = data.sellAvgFivePercent;
      const totalPrice =
        parseFloat(data.sellAvgFivePercent) *
        parseFloat(material.quantity) *
        props.multiplier;
      return [unitPrice, totalPrice];
    }
    async function processMaterialPrices(mats) {
      const procMats = await Promise.all(
        mats.map(async (material) => {
          const materialCost = await calculatePrice(material);
          return {
            ...material,
            unitPrice: materialCost[0],
            totalPrice: materialCost[1],
          };
        })
      );
      //console.log("Procmats:", procMats);
      setMaterials(procMats);
    }

    processMaterialPrices(props.blueprint.materials);

    return () => {};
  }, [props.blueprint.materials]);

  useEffect(() => {
    const costList = materials.map((material) => {
      return material.totalPrice;
    });
    setBuildCostList(costList);
  }, [materials]);

  return (
    <List dense={true}>
      {materials.map((material) => {
        return (
          <MaterialListItem
            key={material.typeid}
            typeid={material.typeid}
            quantity={material.quantity * props.multiplier}
            totalPrice={material.totalPrice}
            unitPrice={material.unitPrice}
          />
        );
      })}
      <ListItem
        sx={{ paddingTop: "2em" }}
        secondaryAction={
          <ListItemText
            primary={
              <Typography variant="h5">
                {"Total material cost: " +
                  totalBuildCost.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  }) +
                  " ISK"}
              </Typography>
            }
          />
        }
      ></ListItem>
      <ListItem></ListItem>
    </List>
  );
}

export default withContext(MaterialList);
