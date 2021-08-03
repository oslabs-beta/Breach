import React, { useEffect, useState } from 'react';
import PermanentDrawerLeft from '../material/SideNav';
import ControlledOpenSelect from '../material/OpenSelect';
import { Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as Logo } from '../../../Logo.svg'

function Settings() {
  const [label, setLabel] = useState({});
  const [dummyState, setDummy] = useState(0);

  useEffect(() => {
    let isFetched = true;
    try {
      ipcRenderer.send('load-data');
      ipcRenderer.on('data-reply', (event, arg) => {
        if (isFetched) setLabel(arg);
      });
    } catch (e) {
      console.log(e);
    }

    //  cancel async otherwise to prevent memory leak
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
    ipcRenderer.send('load-data');
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
        <Typography variant='h3' color='textPrimary'>Settings</Typography>
        </center>
      <Paper elevation={3} className='settings-paper'>
        <Typography variant='h4' color='textSecondary'>Color Themes</Typography>
        <ControlledOpenSelect options={modes} />
        <br></br>
        <Typography variant='h4' color='textSecondary'>Text Size</Typography>
        <br></br>
        <ControlledOpenSelect options={fontSizes} />
        <br></br>
        <Button variant='contained' size='small' color='primary' onClick={clicked}>
          <FontAwesomeIcon icon={['fas', 'save']} />
        </Button>
      </Paper>
      {/* <svg><img src={Logo} className='logo-bottom' /></svg> */}
      <div className="center-logo">{
      (label.theme === 'Regular Hacker Mode') ?
      <Logo className='logo-bottom-regular'/> :
      <Logo className='logo-bottom'/>
      }
      <div><Logo className='logo-top'/></div>
      </div>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default Settings;
