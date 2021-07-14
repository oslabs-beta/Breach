import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { ipcRenderer } from "electron";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [option, setOption] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState("");
  // console.log(props);
  const options = props.options.map((el, i) => {
    return (
      <MenuItem key={i} value={el}>
        {el}
      </MenuItem>
    );
  });

  //on load get values from local storage database

  useEffect(() => {
    console.log("drop down loaded");

    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.on("data-reply", (event, arg) => {
      console.log(arg);
      if (options[0].props.value === "Regular Hacker Mode") {
        let cut = arg.theme.split(" ");
        setLabel(cut[0]);
      } else {
        setLabel(arg.fontSize);
      }

      console.log(label);
    });
  });

  //sends msg to update local storage upon change
  const handleChange = (event) => {
    console.log(event.target);
    setOption(event.target.value);

    ipcRenderer.on("asynchronous-reply", (event, arg) => {
      console.log(arg); // prints "pong"
    });

    ipcRenderer.send("asynchronous-message", event.target);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl width="auto" className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options}
        </Select>
      </FormControl>
    </div>
  );
}
