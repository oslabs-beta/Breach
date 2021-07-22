import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PermanentDrawerLeft from "../material/SideNav";
import Button from "@material-ui/core/Button";
import { ipcRenderer } from "electron";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from "@material-ui/core";
import { Typography, TextField } from '@material-ui/core';

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

  let theme;

  if (label.theme === "Regular Hacker Mode") theme = createTheme(label.light);
  if (label.theme === "Dark XSS Mode") theme = createTheme(label.dark);
  if (label.theme === "Blue DOS Mode") theme = createTheme(label.blue);
  if (label.theme === "Purple SQL Injection Mode") theme = createTheme(label.purple);
  if (label.theme === "Green Forest Mode") theme = createTheme(label.green);

  const classes = useStyles();

  const sendURL = () => {
    let link = document.getElementsByName("url")[0].value
    // console.log(Axios.get('https://whatthehackserver.herokuapp.com/cookieTester', {'url': arg}))
    ipcRenderer.send("url", link)
    ipcRenderer.once("testOutput", (event, arg) => {
      console.log(arg)
      setTestResults(
        <div>
          <h2 color='primary'>URL Tested</h2>
          <Typography variant='body2' color='secondary'>{arg.url}</Typography>
          <Typography variant='h5' color='primary'>Cookie Test Results</Typography>
          <Typography variant='body2' color='secondary'>{arg.cookieTest ? 'Cookies are secure' : 'Cookies are not secure'}</Typography>
          <Typography variant='h5' color='primary'>Jquery XSS results</Typography>
          <Typography variant='body2' color='secondary'>{arg.JqueryTest? 'Safe from XSS in jQuery' : 'Not safe from XSS in jQuery'}</Typography>
        </div>
      )
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div>
      <center>
        <Typography variant='h4' color='textPrimary'>Home</Typography>
      </center>
      <form>
      {/* <Typography variant='h4'>URL</Typography> */}
      <TextField color='primary' id="filled-basic" name='url' label="Input URL here" variant="filled" />
        <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={sendURL}>
          Hack Em Up
        </Button>      
      </form>
      <br></br>
      <Typography variant='h5' color='textSecondary'>Results</Typography>
      {testResults}
      <PermanentDrawerLeft />
    </div>

    </ThemeProvider>
  );
}

export default Home;
