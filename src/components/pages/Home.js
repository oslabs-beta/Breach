import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PermanentDrawerLeft from '../material/SideNav';
import Button from '@material-ui/core/Button';
import { ipcRenderer } from 'electron';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

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
  const [testResults, setTestResults] = useState('...Awaiting test results...');

  useEffect(() => {
    ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
    ipcRenderer.once('data-reply', (event, arg) => {
      setLabel(arg);
    });
  }, []);

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light);
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark);
  if (label.theme === 'Blue DOS Mode') theme = createTheme(label.blue);
  if (label.theme === 'Purple SQL Injection Mode') theme = createTheme(label.purple);
  if (label.theme === 'Green Forest Mode') theme = createTheme(label.green);

  const classes = useStyles();

  const sendURL = () => {
    let link = document.getElementsByName('url')[0].value;

    let userObject = {
      url: link,
    };

    let testStats = { url: link };

    const fetches = () => {
      axios
        .post('https://whatthehackserver.herokuapp.com/javascriptXSS', userObject)
        .then((res) => {
          console.log(res.data);
          testStats.jsXSS = res.data;
        })
        // .catch((error) => {
        //   console.log(error);
        // });

        .then(() => {
          axios
            .post('https://whatthehackserver.herokuapp.com/cookieTester', userObject)
            .then((res) => {
              console.log(res.data);
              testStats.cookieTest = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })

        .then(() => {
          axios
            .post('https://whatthehackserver.herokuapp.com/jqueryXSS', userObject)
            .then((res) => {
              console.log(res.data);
              testStats.jqueryTest = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })

        .then(() => {
          ipcRenderer.send('url', testStats);
          ipcRenderer.once('testOutput', (event, arg) => {
            console.log(arg);
            setTestResults(
              <div>
                <h2 color='primary'>URL Tested</h2>
                <Typography variant='body2' color='secondary'>
                  {arg.url}
                </Typography>
                <Typography variant='h5' color='primary'>
                  Cookie Test Results
                </Typography>
                <Typography variant='body2' color='secondary'>
                  {arg.cookieTest}
                </Typography>
                <Typography variant='h5' color='primary'>
                  Jquery XSS results
                </Typography>
                <Typography variant='body2' color='secondary'>
                  {arg.jqueryTest
                    ? 'Not safe from XSS in jQuery'
                    : 'Safe from XSS in jQuery'}
                </Typography>
                <Typography variant='h5' color='primary'>
                  Javascript XSS results
                </Typography>
                <Typography variant='body2' color='secondary'>
                  {arg.jsXSS
                    ? 'Not safe from XSS in javascript'
                    : 'Safe from XSS in javascript'}
                </Typography>
              </div>
            );
          });
        });
    };

    fetches();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
      {/* <center>
          <Typography variant='h3' color='textPrimary'>
            Home Page
          </Typography>
        </center> */}
      <Paper elevation={3} square>

        <div className="mainContainer">
        <center>
          <Typography variant='h4' color='textPrimary'>
            Scan Link
          </Typography>
        </center>
        <br></br>
        <center>
        <Paper elevation={2} variant="outlined" className="inside-paper">
        <form>
          <TextField
            color='primary'
            id='filled-basic'
            name='url'
            label='Input URL here'
            variant='filled'
          />
          <Button
            variant='contained'
            size='medium'
            color='primary'
            className={classes.margin}
            onClick={sendURL}
          >
            Hack 'Em Up
          </Button>
        </form>
        </Paper>
        </center>
        <br></br>
        <center>
        <Typography variant='h4' color='textSecondary'>
          Results
        </Typography>
        </center>
        <center>
        <Paper elevation={2} variant="outlined" className="inside-paper inside-paper-bottom">

        {testResults}
        </Paper>
        </center>
        </div>
        </Paper>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default Home;
