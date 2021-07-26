
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { CssBaseline } from "@material-ui/core";
import PermanentDrawerLeft from "../material/SideNav";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';


function About() {
  const [label, setLabel] = useState({});

  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {

      setLabel(arg);
    });
  }, []);

  let theme

  if (label.theme === "Regular Hacker Mode") theme=createTheme(label.light)
  if (label.theme === "Dark XSS Mode") theme=createTheme(label.dark)
  if (label.theme === "Blue DOS Mode") theme = createTheme(label.blue);
  if (label.theme === "Purple SQL Injection Mode") theme = createTheme(label.purple);
  if (label.theme === "Green Forest Mode") theme = createTheme(label.green);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>
      <center>
        <Typography variant='h3'>About</Typography>
      </center>
      <ul>
        <li>
        <Typography variant='h4'>Version</Typography>
        <Typography variant='body2'>1.0</Typography>
        </li>
        <li>
        <Typography variant='h4'>How it Works?</Typography>
        <Typography variant='body2'>
            Place a URL on the home page and watch the security readings once
            the load finishes
          </Typography>
        </li>
        <li>
        <Typography variant='h4'>Who it's for?</Typography>
        <Typography variant='body2'>
            This app is for any developer looking to test their front end
            application for Cross-Site-Scripting vulnerabilities
          </Typography>
        </li>
        <li>
        <Typography variant='h4'>Disclaimer</Typography>
        <Typography variant='body2'>Only for use on URLs that you have permission to test XSS</Typography>
        </li>
      </ul>
      <PermanentDrawerLeft />
    </div>
    </ThemeProvider>
  );
}

export default About;
