import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NestedList from './List';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 10,
    height: '100%',
    width: '100%',
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

        <Typography
          style={{ wordWrap: 'break-word' }}
          className={classes.pos}
          color='textSecondary'
        >
          <NestedList primary={props.cookieExample} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
