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
import Card from '../material/Card';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Spinner from '../material/spinner/Spinner';

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
  const [testResults, setTestResults] = useState('');

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

    setTestResults('');

    let userObject = {
      url: link,
    };

    let jsXssResult, jqueryResult, cookieResult;

    const date = new Date();

    let testStats = {
      url: link,
      jsXSS: null,
      jqueryTest: null,
      cookieTest: null,
      innerHTMLtest: null,
      currentTime: date.toUTCString(),
    };

    testStats.innerHTMLtest = null;

    const fetches = () => {
      trackPromise(
        axios
          .post('http://localhost:5000/javascriptXSS', userObject)
          .then((res) => {
            console.log(res.data);
            testStats.jsXSS = res.data;
            jsXssResult = res.data;
          })

          .then(() => {
            axios
              .post('http://localhost:5000/cookieTester', userObject)
              .then((res) => {
                console.log(res.data);
                testStats.cookieTest = res.data;
                cookieResult = res.data;
              })
              .then(() => {
                axios
                  .post('http://localhost:5000/innerHTML', userObject)
                  .then((res) => {
                    console.log(res.data);
                    testStats.innerHTMLtest = res.data;
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
                    <Card
                      style={{ width: '50%' }}
                      url={link}
                      currentTime={arg.currentTime}
                      jsXSS={
                        testStats.jsXSS
                          ? 'Not safe from XSS in javascript'
                          : 'Safe from XSS in javascript'
                      }
                      jqueryXSS={
                        testStats.jqueryTest
                          ? 'Not safe from XSS in jQuery'
                          : 'Safe from XSS in jQuery'
                      }
                      cookieExample={arg.cookieTest[0]}
                    />
                  );
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })

          .then(() => {
            axios
              .post('http://localhost:5000/jqueryXSS', userObject)
              .then((res) => {
                console.log(res.data);
                testStats.jqueryTest = res.data;
                jqueryResult = res.data;
              })

              .catch((error) => {
                console.log(error);
              });
          })
      );
    };

    //track promise, invoke spinner
    fetches();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='homeDiv'>
        {/* <center>
          <Typography variant='h3' color='textPrimary'>
            Home Page
          </Typography>
        </center> */}
        <Paper elevation={3} square>
          <div className='mainContainer'>
            <center>
              <Typography variant='h3' color='textSecondary'>
                Scan Link
              </Typography>
            </center>
            <br></br>
            <center>
              <Paper elevation={2} variant='outlined' className='inside-paper'>
                <form>
                  <TextField
                    color='textPrimary'
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
                    Test
                  </Button>
                </form>
              </Paper>
            </center>
            <br></br>
            <center>
              <Typography variant='h3' color='textSecondary'>
                Results
              </Typography>
            </center>
            <center>
              <Paper
                elevation={2}
                variant='outlined'
                className='inside-paper inside-paper-bottom'
              >
                {testResults}
                <Spinner className='spin' />
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
