import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { CssBaseline, Paper } from '@material-ui/core';
import PermanentDrawerLeft from '../material/SideNav';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ControlledOpenSelect from '../material/OpenSelect';
import { Typography } from '@material-ui/core';
import Card from '../material/Card';
import CustomizedDialogs from '../material/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const [history, setHistory] = useState([]);
  const [historyLength, setHistoryLength] = useState(3);

  useEffect(() => {
    let isFetched = true;
    try {
      ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
      ipcRenderer.once('data-reply', (event, arg) => {
        setLabel(arg);

        if (isFetched) setHistory(arg.history);
        if (arg.historyLength) setHistoryLength(arg.historyLength);
      });
    } catch (e) {
      console.log(e);
    }

    // cancel async otherwise to prevent memory leak
    return () => (isFetched = false);
  }, []);

  const classes = useStyles();

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light);
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark);
  if (label.theme === 'Blue DOS Mode') theme = createTheme(label.blue);
  if (label.theme === 'Purple SQL Injection Mode') theme = createTheme(label.purple);
  if (label.theme === 'Green Forest Mode') theme = createTheme(label.green);

  const clearItem = (index) => {
    ipcRenderer.send('clearItem', index);
    ipcRenderer.once('itemCleared', (event, arg) => {
      setHistory(arg);
    });
  };
  //console.log(history);
  const pastStats = history.slice(0, historyLength).map((el, i) => {

    console.log(el);

    return (
      <div className='whole-cards'>
        <div key={i} className='historyCard'>
          <Card
            // className='results-grid-history'
            style={{ width: '50%' }}
            url={el.url}
            currentTime={el.currentTime}
            innerHTML={el.innerHTMLtest}
            jsXSS={
              el.cookieTest
                ? 'Not safe from XSS in javascript'
                : 'Safe from XSS in javascript'
            }
            jqueryXSS={
              el.jqueryTest ? 'Not safe from XSS in jQuery' : 'Safe from XSS in jQuery'
            }
            cookieExample={el.cookieTest}
          />
        </div>
        <div className='history-flex'>

          {/* <CustomizedDialogs className='history-button-margin' info={el} text='Expand' /> */}
          <CustomizedDialogs className='history-button-margin' info={el} text='Defend' />

          <Button
            variant='outlined'
            size='small'
            color='primary'
            // className='history-button-margin'
            // className={classes.margin}
            onClick={() => clearItem(i)}
          >
            <FontAwesomeIcon icon={['fas', 'minus-square']} />
          </Button>
        </div>
      </div>
    );
  });

  const clearHistory = () => {
    ipcRenderer.send('clearHistory');
    ipcRenderer.once('historyCleared', (event, arg) => {
      setHistory(arg);
    });
  };

  const historyLengths = [1, 2, 4, 6, 8];

  const clicked = () => {
    ipcRenderer.send('getHistoryLength');
    ipcRenderer.once('length', (event, arg) => {
      setHistoryLength(arg);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id='historyDiv'>
        <center>
          <Typography variant='h3' color='textSecondary' className='history-title-margin'>
            History
          </Typography>
        </center>
        <center>
          <Paper elevation={3} className='history-bottom'>
            <ControlledOpenSelect options={historyLengths} className='history-input' />
            <Button variant='contained' color='primary' size='small' onClick={clicked}>
              <FontAwesomeIcon icon={['fas', 'save']} />
            </Button>
            <Button
              variant='contained'
              size='small'
              color='primary'
              className={classes.margin}
              onClick={clearHistory}
            >
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </Button>
            <Button variant='contained' size='small' color='secondary' id='export-button'>
              <FontAwesomeIcon icon={['fas', 'download']} />
            </Button>
            <PermanentDrawerLeft />
          </Paper>
        </center>
        <ul className='history-grid'>{pastStats}</ul>
      </div>
    </ThemeProvider>
  );
}

export default History;
