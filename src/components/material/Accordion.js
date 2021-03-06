import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NestedList from './List';
import { props } from 'bluebird';
import AccordionMult from './AccordionMult'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            Open for Cookie Results
          </AccordionSummary>

          <AccordionDetails className='accordion-column'>
            <AccordionMult cookiesArr={props.cookiesArr}></AccordionMult>
          </AccordionDetails>

        </Accordion>
        <br></br>
      </div>
    );
}
