import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NestedList from './List';

import SimpleAccordion from './Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Logo } from '../../../Logo.svg'

const useStyles = makeStyles({
  root: {
    // backgroundImage: 'url(Logo.svg)',
    minWidth: 275,
    fontSize: 10,
    minHeight: 350,
    width: '100%',
//     height: 'fit-content',
    // width: '100%',
    // margin: '0% 0% 6% 0%'
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
    if (!props.url.includes('=')) {
      return (
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          <br></br>* XSS attack tests require a query ('=') in the url *<br></br>
          <br></br>
        </Typography>
      );
    }
  };
  const domain = () => {
    let count = 0;
    let split = props.url;
    let output = '';
    for (let i = 0; i < split.length; i++) {
      if (split[i] === '/') count += 1;
      if (count >= 3) {
        break;
      }
      output += split[i];
    }
    return output;
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Results for {domain()}
        </Typography>

        <Typography className={classes.pos} color='textPrimary'>
          <FontAwesomeIcon icon={['fas', 'clock']} />: {props.currentTime}
        </Typography>

        <Typography className={classes.pos} color='textPrimary'>
          {disclaimer() ? '' : props.jsXSS}
        </Typography>
        {disclaimer()}
        <Typography className={classes.pos} color='textPrimary'>
          {disclaimer() ? '' : props.jqueryXSS}
        </Typography>
        <Typography className={classes.pos} color='textPrimary'>
          {`Instances of InnerHTML in scripts: ${props.innerHTML}`}
        </Typography>

        <Typography
          style={{ wordWrap: 'break-word' }}
          className={classes.pos}
          color='textPrimary'
        >
          {props.cookieExample ? (
            <SimpleAccordion cookiesArr={props.cookieExample} />
          ) : (
            <Typography variant='body2' color='textSecondary'>No Cookies Available</Typography>
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
