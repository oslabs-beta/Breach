import React, { useEffect, useState } from 'react';
import PermanentDrawerLeft from '../material/SideNav';
import ControlledOpenSelect from '../material/OpenSelect';
import { Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';

function Settings() {
  const [label, setLabel] = useState({});
  const [dummyState, setDummy] = useState(0);

  useEffect(() => {
    let isFetched = true;
    try {
      ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
      ipcRenderer.on('data-reply', (event, arg) => {
        if (isFetched) setLabel(arg);
      });
    } catch (e) {
      console.log(e);
    }

    // cancel async otherwise to prevent memory leak
    return () => (isFetched = false);
  }, []);

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light);
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark);
  if (label.theme === 'Blue DOS Mode') theme = createTheme(label.blue);
  if (label.theme === 'Purple SQL Injection Mode') theme = createTheme(label.purple);
  if (label.theme === 'Green Forest Mode') theme = createTheme(label.green);

  const modes = [
    'Regular Hacker Mode',
    'Dark XSS Mode',
    'Blue DOS Mode',
    'Purple SQL Injection Mode',
    'Green Forest Mode',
  ];
  const fontSizes = ['12px', '16px', '20px', '24px'];

  const clicked = () => {
    console.log('state updated');

    ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
    ipcRenderer.once('data-reply', (event, arg) => {
      setLabel(arg);
    });

    setDummy(dummyState + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='settingsDiv'>
        <center>
        <Typography variant='h3' color='textSecondary'>Settings</Typography>
        </center>
      <Paper elevation={3} className='settings-paper'>
        <Typography variant='h4' color='textPrimary'>Color Themes</Typography>
        <ControlledOpenSelect options={modes} />
        <br></br>
        <Typography variant='h4' color='textPrimary'>Text Size</Typography>
        <br></br>
        <ControlledOpenSelect options={fontSizes} />
        <br></br>
        <Button variant='contained' size='small' color='primary' onClick={clicked}>
          Save Changes
        </Button>
      </Paper>
      <center>
        {/* <button id='export-button'>Export Data</button> */}
        <Button variant='contained' size='small' color='secondary' id='export-button'>
          Export Data
        </Button>
      </center>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

{
  /* <img src='' onerror='alert(`dialogue`)'> */
}

export default Settings;
