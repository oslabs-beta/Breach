import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PermanentDrawerLeft from "../material/SideNav";
import Button from "@material-ui/core/Button";
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
  const [testResults, setTestResults] = useState('...Awaiting test results...')

  
  useEffect(() => {
    ipcRenderer.send("load-data", console.log("40, OpenSelect.js"));
    ipcRenderer.once("data-reply", (event, arg) => {
      setLabel(arg);
    });

  }, []);

  // console.log("label", label);


  let theme;

  if (label.theme === "Regular Hacker Mode") theme = createTheme(label.light);
  if (label.theme === "Dark XSS Mode") theme = createTheme(label.dark);
  if (label.theme === "Blue DOS Mode") theme = createTheme(label.blue);
  if (label.theme === "Purple SQL Injection Mode") theme = createTheme(label.purple);
  if (label.theme === "Green Forest Mode") theme = createTheme(label.green);

  const classes = useStyles();

  const sendURL = () => {
    let link = document.getElementsByName("url")[0].value
    ipcRenderer.send("url", link)
    ipcRenderer.once("testOutput", (event, arg) => {
      console.log(arg)
      setTestResults(
        <div>
          <h5>URL Tested</h5>
          <p>{arg.url}</p>
          <h5>Cookie Test Results</h5>
          <p>{arg.cookieTest ? 'Cookies are secure' : 'Cookies are not secure'}</p>
          <h5>Jquery XSS results</h5>
          <p>{arg.JqueryTest? 'Safe from XSS in jQuery' : 'Not safe from XSS in jQuery'}</p>
        </div>
      )
    });
  }


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
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={sendURL}>
          Hack Em Up
        </Button>      



      </form>
      <br></br>
      <h3>Ports in Use</h3>
      <br></br>
      <h3>Results</h3>
      {testResults}
      <PermanentDrawerLeft />
    </div>

    </ThemeProvider>
  );
}

export default Home;
