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
import CustomizedDialogs from '../material/dialog';

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
    return (
      <div key={i} className='historyCard'>
        <Card
          style={{ width: '50%' }}
          url={el.url}
          currentTime={el.currentTime}
          // jsXSS={
          //   el.cookieTest
          //     ? 'Not safe from XSS in javascript'
          //     : 'Safe from XSS in javascript'
          // }
          jqueryXSS={
            el.jqueryTest ? 'Not safe from XSS in jQuery' : 'Safe from XSS in jQuery'
          }
          cookieExample={el.cookieTest[0]}
        />
        <CustomizedDialogs props={el} />
        <Button
          variant='contained'
          size='small'
          color='primary'
          className={classes.margin}
          onClick={() => clearItem(i)}
        >
          Clear Item
        </Button>
      </div>
    );
  });

  const clearHistory = () => {
    ipcRenderer.send('clearHistory');
    ipcRenderer.once('historyCleared', (event, arg) => {
      setHistory(arg);
    });
  };

  const historyLengths = [1, 2, 3, 4, 5, 6, 7, 8];

  const clicked = () => {
    ipcRenderer.send('getHistoryLength');
    ipcRenderer.once('length', (event, arg) => {
      setHistoryLength(arg);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*</ThemeProvider> <div className='historyDiv'>
         <center>
           <Typography variant='h3'>History</Typography>
         </center>
         <ControlledOpenSelect options={historyLengths} />
         <Button variant='contained' color='primary' size='small' onClick={clicked}>
           Change Length
         </Button>
         <ul>{pastStats}</ul>
         <Button
           variant='contained'
           size='small'
           color='primary'
           className={classes.margin}
           onClick={clearHistory}
         >
           Clear History
         </Button>
         <PermanentDrawerLeft /> </div>*/}
      <div id='historyDiv'>
        <center>
          <Typography variant='h4' color='textSecondary' className='history-title-margin'>
            History
          </Typography>
        </center>
        <ul className='history-grid'>{pastStats}</ul>
        <center>
          <Paper elevation={3} className='history-bottom'>
            <ControlledOpenSelect options={historyLengths} className='history-input' />
            <Button variant='contained' color='primary' size='small' onClick={clicked}>
              Change Length
            </Button>

            <Button
              variant='contained'
              size='small'
              color='primary'
              className={classes.margin}
              onClick={clearHistory}
            >
              Clear History
            </Button>
            <PermanentDrawerLeft />
          </Paper>
        </center>
      </div>
    </ThemeProvider>
  );
}

export default History;
