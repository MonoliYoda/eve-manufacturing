import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import withContext from "../../../contexts/withContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function OptionsCard(props) {
  const [inputFacility, setInputFacility] = useState(1);
  const [inputSecStatus, setInputSecStatus] = useState(3);
  const [inputStructureSize, setInputStructureSize] = useState(0);
  const [inputMaterialRig, setInputMaterialRig] = useState(0);
  const [inputTimeRig, setInputTimeRig] = useState(0);
  const [inputME, setInputME] = useState(0);
  const [inputTE, setInputTE] = useState(0);

  const handleFacilityChange = (event) => {
    setInputFacility(event.target.value);
  };

  const handleSecStatusChange = (event) => {
    setInputSecStatus(event.target.value);
  };

  const handleStructureSizeChange = (event) => {
    setInputStructureSize(event.target.value);
  };

  const handleMaterialRigChange = (event) => {
    setInputMaterialRig(event.target.value);
  };
  const handleTimeRigChange = (event) => {
    setInputTimeRig(event.target.value);
  };

  const handleTEChange = (event) => {
    setInputTE(event.target.value);
  };

  const handleMEChange = (event) => {
    setInputME(event.target.value);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: "40em" }}>
      <CardHeader title={"Options"}></CardHeader>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 sm={12} md={6}>
            <FormControl size="small">
              <InputLabel id="facility-select-label">Facility</InputLabel>
              <Select
                value={inputFacility}
                onChange={handleFacilityChange}
                labelId="facility-select-label"
                label={"Facility"}
                sx={{ minWidth: "15em" }}
              >
                <MenuItem value={1}>Engineering Complexs</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 sm={12} md={6}>
            <FormControl size="small">
              <InputLabel id="sec-status-select-label">Sec Status</InputLabel>
              <Select
                value={inputSecStatus}
                onChange={handleSecStatusChange}
                labelId="sec-status-select-label"
                label={"Sec Status"}
                sx={{ minWidth: "15em" }}
              >
                <MenuItem value={3}>HS</MenuItem>
                <MenuItem value={2}>LS</MenuItem>
                <MenuItem value={1}>NS</MenuItem>
                <MenuItem value={0}>WH</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <FormControl size="small">
            <InputLabel id="structure-size-select-label">
              Structure Size
            </InputLabel>
            <Select
              value={inputStructureSize}
              onChange={handleStructureSizeChange}
              labelId="structure-size-select-label"
              label="Structure Size"
              sx={{ minWidth: "15em" }}
            >
              <MenuItem value={2}>X-Large</MenuItem>
              <MenuItem value={1}>Large</MenuItem>
              <MenuItem value={0}>Medium</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="material-rig-select-label">ME Rig</InputLabel>
            <Select
              value={inputMaterialRig}
              onChange={handleMaterialRigChange}
              labelId="material-rig-select-label"
              label="ME Rig"
              sx={{ minWidth: "15em" }}
            >
              <MenuItem value={0}>No Rig</MenuItem>
              <MenuItem value={1}>T1 Rig</MenuItem>
              <MenuItem value={2}>T2 Rig</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="time-rig-select-label">TE Rig</InputLabel>
            <Select
              value={inputTimeRig}
              onChange={handleTimeRigChange}
              labelId="time-rig-select-label"
              label="TE Rig"
              sx={{ minWidth: "15em" }}
            >
              <MenuItem value={0}>No Rig</MenuItem>
              <MenuItem value={1}>T1 Rig</MenuItem>
              <MenuItem value={2}>T2 Rig</MenuItem>
            </Select>
          </FormControl>
          <Grid2 xs={12} md={6}>
            <Typography id="me-slider-label">Blueprint ME</Typography>
            <Slider
              aria-labelledby="me-slider-label"
              value={inputME}
              onChange={handleMEChange}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={1}
              marks
            ></Slider>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Typography id="te-slider-label">Blueprint TE</Typography>
            <Slider
              aria-labelledby="te-slider-label"
              value={inputTE}
              onChange={handleTEChange}
              valueLabelDisplay="auto"
              min={0}
              max={15}
              step={1}
              marks
            ></Slider>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}

export default withContext(OptionsCard);
