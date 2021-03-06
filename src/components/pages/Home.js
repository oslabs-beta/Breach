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
import { default as Logo } from '../../../Logo.svg'
import CustomizedDialogs from '../material/Dialog';


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
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    ipcRenderer.send('load-data');
    ipcRenderer.once('data-reply', (event, arg) => {
      setLabel(arg);
    });
  }, []);

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light);
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark);
  if (label.theme === 'Blue DOS Mode') theme = createTheme(label.blue);
  if (label.theme === 'Purple SQL Injection Mode') theme = createTheme(label.purple);
  if (label.theme === 'Green Slow Loris Mode') theme = createTheme(label.green);

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
      setVisible(true);
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
              testStats.cookieTest = res.data;
              cookieResult = res.data;
            })
            .then(() => {
              axios
                .post('http://localhost:5000/innerHTML', userObject)
                .then((res) => {
                  testStats.innerHTMLtest = res.data;
                })
                .then(() => {
                  ipcRenderer.send('url', testStats);
                  ipcRenderer.once('testOutput', (event, arg) => {
                    arg.url = link
                    arg.jsXSS = testStats.jsXSS
                    arg.jqueryTest = testStats.jqueryTest
                    setVisible(false);
                    setTestResults(
                      <div>
                      <Card
                        url={link}
                        currentTime={arg.currentTime}
                        innerHTML={arg.innerHTMLtest}
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
                        cookieExample={arg.cookieTest}
                      />
                      <CustomizedDialogs className='home-button-margin' info={arg} text='Defend' />
                      </div>
                    );
                  });
                })

                .catch((error) => {
                  console.log(error);
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
              testStats.jqueryTest = res.data;
              jqueryResult = res.data;
            })

            .catch((error) => {
              console.log(error);
            });
        });
    };

    //track promise, invoke spinner
    trackPromise(fetches());
  };

  const disclaimer = () => {
    return document.getElementsByName('url')[0].value.includes('q=')
      ? ''
      : 'For XSS testing please input a url containg a q= query';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className='homeDiv'>
        <Paper elevation={3} square>
          <div className='mainContainer'>
            <center>
              <Typography variant='h3' color='textPrimary'>
                Scan Link
              </Typography>
            </center>
            <br></br>
            <center>
              <Paper elevation={2} variant='outlined' className='inside-paper'>
                <form>
                  <TextField
                    color='textSecondary'
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
              <Typography variant='h3' color='textPrimary'>
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
                <Spinner visible={isVisible} />
              </Paper>
            </center>
          </div>
        </Paper>
        {/* <svg><img src={Logo} className='logo-bottom' /></svg> */}
        <div className="center-logo">{
      (label.theme === 'Regular Hacker Mode') ?
      <Logo className='logo-bottom-regular'/> :
      <Logo className='logo-bottom'/>
      }
      {/* <div><Logo className='logo-top'/></div> */}
      </div>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default Home;
