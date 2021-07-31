import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NestedList from './List';

import SimpleAccordion from './Accordion';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 10,
    height: 'fit-content',
    width: '100%',
<<<<<<< HEAD
    textAlign: 'center',
=======
    // margin: '0% 0% 6% 0%'
>>>>>>> 403c165f8c057e3b49a748ab4956eec06cefa4cd
    // overflow: 'hidden'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '0.8rem',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const disclaimer = () => {
    console.log('inside function');
    if (!props.url.includes('=')) {
      console.log('inside if statement');
      return (
        <Typography className={classes.title} color='textPrimary' gutterBottom>
          * XSS attack tests require a query ('=') in the url *
        </Typography>
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color='textPrimary' gutterBottom>
          Results for {props.url}
        </Typography>

        <Typography className={classes.pos} color='textSecondary'>
          Timestamp: {props.currentTime}
        </Typography>

        <Typography className={classes.pos} color='textSecondary'>
          {disclaimer() ? '' : props.jsXSS}
        </Typography>
        {disclaimer()}
        <Typography className={classes.pos} color='textSecondary'>
          {disclaimer() ? '' : props.jqueryXSS}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`Instances of InnerHTML in scripts: ${props.innerHTML}`}
        </Typography>

        <Typography
          style={{ wordWrap: 'break-word' }}
          className={classes.pos}
          color='textSecondary'
        >
          {props.cookieExample ? (
            <SimpleAccordion cookiesArr={props.cookieExample} />
          ) : (
            <Typography variant='body2'>No Cookies Available</Typography>
          )}

          {/* {props.cookieExample ? (
            <NestedList primary={props.cookieExample} />
          ) : (
            <Typography variant='body2'>No Cookies Available</Typography>
          )} */}
        </Typography>
      </CardContent>
    </Card>
  );
}
