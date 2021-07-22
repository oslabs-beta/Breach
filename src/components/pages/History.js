
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { CssBaseline } from "@material-ui/core";
import PermanentDrawerLeft from "../material/SideNav";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ControlledOpenSelect from '../material/OpenSelect';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


function History() {
  const [label, setLabel] = useState({});
  const [history, setHistory] = useState([])
  const [historyLength, setHistoryLength] = useState(3)

  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {
      console.log(arg)
      setLabel(arg);
      setHistory(arg.history)
      if (arg.historyLength) setHistoryLength(arg.historyLength)
    });
  }, []);

  const classes = useStyles();

  let theme

  if (label.theme === "Regular Hacker Mode") theme=createTheme(label.light)
  if (label.theme === "Dark XSS Mode") theme=createTheme(label.dark)
  if (label.theme === "Blue DOS Mode") theme = createTheme(label.blue);
  if (label.theme === "Purple SQL Injection Mode") theme = createTheme(label.purple);
  if (label.theme === "Green Forest Mode") theme = createTheme(label.green);


  const clearItem = (index) => {
    ipcRenderer.send("clearItem", index)
    ipcRenderer.once("itemCleared", (event, arg) => {
      setHistory(arg)
    });
  }
  console.log(history)
  const pastStats = history.slice(0, historyLength).map((el, i) => {
    return (
      <li key={i}>
        <Typography variant='h5'>URL Tested:</Typography>
        <Typography variant='body2'> {el.url} </Typography>
        <Typography variant='h5'>Cookie Test Results</Typography>
        <Typography variant='body2'>{el.cookieTest ? 'Cookies are secure' : 'Cookies are not secure'}</Typography>
        <Typography variant='h5'>Jquery XSS results</Typography>
        <Typography variant='body2'>{el.JqueryTest ? 'Safe from XSS in jQuery' : 'Not safe from XSS in jQuery'}</Typography>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={() => clearItem(i)}>
          Clear Item
        </Button>
      </li>
    );
  });

  const clearHistory = () => {
    ipcRenderer.send("clearHistory")
    ipcRenderer.once("historyCleared", (event, arg) => {
      setHistory(arg)
    });
  }

  const historyLengths = [1, 2, 3, 4, 5, 6]

  const clicked = () => {
    ipcRenderer.send('getHistoryLength');
    ipcRenderer.once('length', (event, arg) => {
      setHistoryLength(arg);
    });
  };

  return (
    <ThemeProvider theme={theme}>

    <CssBaseline />
    <div className="historyDiv">
      <center>
      <Typography variant='h3'>History</Typography>
      </center>
      <ControlledOpenSelect options={historyLengths} />
      <Button variant='contained' color='primary' size="small" onClick={clicked}>
          Change Length
        </Button>
      <ul>
        {pastStats}
      </ul>
      <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={clearHistory}>
          Clear History
        </Button>      
       <PermanentDrawerLeft />
    </div>
    </ThemeProvider>
  );
}

export default History;
