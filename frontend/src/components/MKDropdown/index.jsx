import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.css";

export default function MKDropdown(props) {
  const [type, setType] = React.useState("");

  console.log("___1", props);

  const handleChange = (event) => {
    setType(event.target.value);
    if (props.onChange) props.onChange(event?.target?.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{ height: "100%" }}>
          Select User Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Select User Type"
          onChange={handleChange}
          required={props.required}
        >
          <MenuItem value={"Doctor"}>Doctor</MenuItem>
          <MenuItem value={"Patient"}>Patient</MenuItem>
          <MenuItem value={"Researcher"}>Researcher</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
