import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NestedList from './List';
import CustomizedDialogs from './Dialog';
import SimpleAccordion from './Accordion';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 10,
    height: '100%',
    width: '100%',
    textAlign: 'center',
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

  console.log('38 cookies ', props.cookieExample);

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
          {props.jsXSS}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.jqueryXSS}
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
      {/* <CardActions>
        <CustomizedDialogs info={props}/>
      </CardActions> */}
    </Card>
  );
}
