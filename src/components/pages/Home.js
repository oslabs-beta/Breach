import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PermanentDrawerLeft from "../material/SideNav";
import Button from '@material-ui/core/Button';
import { ipcRenderer } from "electron";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home() {

  const [label, setLabel] = useState({});

  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {
      setLabel(arg)
    },{label});
  });
  console.log("label", label)

  let theme

  if (label.theme === "Regular Hacker Mode") theme=createTheme(label.light)
  if (label.theme === "Dark XSS Mode") theme=createTheme(label.dark)

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div>
      <center>
        <h1>Home</h1>
      </center>
      <form>
        <h3>URL</h3>
        <input type="text" placeholder="URL link to be tested" name="url" />
        <input type="submit" value="Hack 'Em Up" />
        <Button variant="contained" size="small" color="primary" className={classes.margin}>
        Hack Em Up
      </Button>      



      </form>
      <br></br>
      <h3>Ports in Use</h3>
      <br></br>
      <h3>Stats</h3>np
      <PermanentDrawerLeft />
    </div>
    </ThemeProvider>
  );
}

export default Home;
