import React, { useState, useEffect } from "react";
import PermanentDrawerLeft from "../material/SideNav";
import { ipcRenderer } from "electron";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

function History() {
  const [label, setLabel] = useState({});

  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {
      setLabel(arg);
    });
  }, "");

  console.log("label", label);

  let theme;

  if (label.theme === "Regular Hacker Mode") theme = createTheme(label.light);
  if (label.theme === "Dark XSS Mode") theme = createTheme(label.dark);

  const pastURLs = ["url1", "url2", "url3", "url4"];
  const pastStats = pastURLs.map((el, i) => {
    return (
      <li>
        <h3>{el}</h3>
        <p>Lots of Stats</p>
      </li>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="historyDiv">
        <center>
          <h1>History</h1>
        </center>
        <ul>{pastStats}</ul>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default History;
