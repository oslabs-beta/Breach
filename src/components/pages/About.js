import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { CssBaseline, Paper } from '@material-ui/core';
import PermanentDrawerLeft from '../material/SideNav';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function About() {
  const [label, setLabel] = useState({});

  useEffect(() => {
    ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
    ipcRenderer.once('data-reply', (event, arg) => {
      setLabel(arg);
    });
  }, []);

  const styles = {
    listStyleType: 'none',
  };

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light);
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark);
  if (label.theme === 'Blue DOS Mode') theme = createTheme(label.blue);
  if (label.theme === 'Purple SQL Injection Mode') theme = createTheme(label.purple);
  if (label.theme === 'Green Forest Mode') theme = createTheme(label.green);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <center>
          <Typography variant='h3' color='textSecondary'>
            About
          </Typography>
        </center>
        <Paper elevation={3} className='about-paper'>
          <Typography variant='h5' color='textSecondary'>
            Version
          </Typography>
          <Typography variant='h6' color='textPrimary'>
            1.0.0
          </Typography>
          <br></br>
          <Typography variant='h5' color='textSecondary'>
            How it Works?
          </Typography>
          <Typography variant='h6' color='textPrimary'>
            Input a URL on the home page and see security readings once the test has loaded.
          </Typography>
          <br></br>
          <Typography variant='h5' color='textSecondary'>
            Who it's for?
          </Typography>
          <Typography variant='h6' color='textPrimary'>
            This app is for any developer looking to test their front end application for
            Cross-Site-Scripting or Cookie vulnerabilities.
          </Typography>
          <br></br>
          <Typography variant='h5' color='textSecondary'>
            Disclaimer
          </Typography>
          <Typography variant='h6' color='textPrimary'>
            Although the tests are non-invasive, it is suggested to only input URLs that the user is authorized to pentest.
          </Typography>
        </Paper>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default About;
