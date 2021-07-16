
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { CssBaseline } from "@material-ui/core";
import PermanentDrawerLeft from "../material/SideNav";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

function History() {
  const [label, setLabel] = useState({});

  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {

      setLabel(arg);
    });
  }, []);
  console.log("label", label)

  let theme

  if (label.theme === "Regular Hacker Mode") theme=createTheme(label.light)
  if (label.theme === "Dark XSS Mode") theme=createTheme(label.dark)
  if (label.theme === "Blue DOS Mode") theme = createTheme(label.blue);
  if (label.theme === "Purple SQL Injection Mode") theme = createTheme(label.purple);
  if (label.theme === "Green Forest Mode") theme = createTheme(label.green);

  const pastURLs = ["url1", "url2", "url3", "url4"];
  const pastStats = pastURLs.map((el, i) => {
    return (
      <li key={i}>
        <h3>{el}</h3>
        <p>Lots of Stats</p>
      </li>
    );
  });
  return (
    <ThemeProvider theme={theme}>

    <CssBaseline />
    <div className="historyDiv">
      <center>
        <h1>History</h1>
      </center>
      <ul>
        {pastStats}
      </ul>
       <PermanentDrawerLeft />
    </div>
    </ThemeProvider>
  );
}

export default History;
