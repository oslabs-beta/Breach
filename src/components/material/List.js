import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // height: 200,
    overflowY: 'hidden',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {
  const classes = useStyles();

  // console.log('list 26 ', props.primary);
  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      className={classes.root}
    >
      <ListItem button>
        Cookie Name:&nbsp;
        <ListItemText primary={props.primary.name} />
      </ListItem>

      <ListItem button>
        Domain:&nbsp;
        <ListItemText primary={props.primary.domain} />
      </ListItem>
      <ListItem button>
        httpOnly:&nbsp;
        <ListItemText primary={props.primary.httpOnly ? 'true' : 'false'} />
      </ListItem>
      <ListItem button>
        Secure:&nbsp;
        <ListItemText primary={props.primary.secure ? 'true' : 'false'} />
      </ListItem>
      <ListItem button>
        Same Party:&nbsp;
        <ListItemText primary={props.primary.sameParty ? 'true' : 'false'} />
      </ListItem>
      <ListItem button>
        Source Port:&nbsp;
        <ListItemText primary={props.primary.sourcePort} />
      </ListItem>
    </List>
  );
}
