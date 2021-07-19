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
    ipcRenderer.send('load-data', console.log('40, OpenSelect.js'));
    ipcRenderer.once('data-reply', (event, arg) => {
      setLabel(arg);
    });
  }, []);
  console.log('label', label);

  // const [color, setColor] = useState(label.theme);

  let theme;

  if (label.theme === 'Regular Hacker Mode') theme = createTheme(label.light); //setColor(createTheme(label.light))
  if (label.theme === 'Dark XSS Mode') theme = createTheme(label.dark); //setColor(createTheme(label.dark))
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

  //const store = new Store();

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
          <h1>Settings</h1>
        </center>
        <h3>Color Themes</h3>
        <ControlledOpenSelect options={modes} />
        <br></br>
        <h3>Change Text Size</h3>
        <br></br>
        <ControlledOpenSelect options={fontSizes} />
        {/* <form>
          <input type="text" placeholder="Font Size" name="size" />
          <input type="submit" value="Change Font Size" />
        </form> */}
        <br></br>
        <Button variant='contained' color='primary' onClick={clicked}>
          Save Changes
        </Button>
        <br></br>
        <br></br>
        <button>Export Data</button>
        <PermanentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

{
  /* <img src='' onerror='alert(`dialogue`)'> */
}

export default Settings;
