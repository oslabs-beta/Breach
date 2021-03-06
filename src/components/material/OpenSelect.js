import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { ipcRenderer } from 'electron';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [option, setOption] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState('');

  const options = props.options.map((el, i) => {
    return (
      <MenuItem key={i} value={el}>
        {el}
      </MenuItem>
    );
  });

  //on load get values from local storage database
  useEffect(() => {
    ipcRenderer.send('load-data', props);
    ipcRenderer.once('data-reply', (event, arg) => {
      if (
        typeof options[0].props.value === 'number' &&
        options[0].props.value.toString().length === 1
      ) {
        setLabel(arg.historyLength);
      } else if (options[0].props.value === 'Regular Hacker Mode') {
        let cut = arg.theme.split(' ');
        setLabel(cut[0]);
      } else {
        setLabel(arg.fontSize);
      }
    });
  }, []);

  //sends msg to update local storage upon change
  const handleChange = (event) => {
    setOption(event.target.value);

    ipcRenderer.once('asynchronous-reply', (event, arg) => {});

    ipcRenderer.send('asynchronous-message', event.target);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl width='auto' className={classes.formControl} value={option}>
        <InputLabel id='demo-controlled-open-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {options}
        </Select>
      </FormControl>
    </div>
  );
}
