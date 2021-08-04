
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const styles = (theme) => ({
  root: {
    margin: '2%',
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
export default function CustomizedDialogs(props) {
  const { jsXSS, jqueryTest, cookieTest, innerHTMLtest, url } = props.info;
  const disclaimer = () => {
    if (!url.includes('=')) {
      return (
        <Typography  color='textSecondary' gutterBottom>
          * XSS attack tests require a query ('=') in the url *
        </Typography>
      );
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let jQueryDialog = () => {
    if (!disclaimer()) {
      return (jqueryTest) ? 
      <Typography  color='textPrimary' gutterBottom>This website is at risk for jQuery Reflected XSS attacks. Consider sanitizing inputs and search queries.</Typography> 
      : 
      <Typography  color='textPrimary' gutterBottom>The website is not susceptible to jQuery Reflected XSS attacks.</Typography>
    }
    
  }
  let jsXSSDialog = () => {
    if (!disclaimer()) {
      return (jsXSS) ? 
      <Typography  color='textPrimary' gutterBottom>This website is at risk for Javascript Reflected XSS attacks. Consider sanitizing inputs and search queries.</Typography> 
      : 
      <Typography  color='textPrimary' gutterBottom>The website is not susceptible to Javascript Reflected XSS attacks.</Typography>
    }
  }

  const secureCookie = () => {
  if (cookieTest.every((cookie) => cookie.secure === false && cookie.httpOnly === false)) {
    return <Typography  color='textPrimary' gutterBottom>None of your cookies are secure. Consider making cookies with personal information or session information private by marking them as "secure" or "httpOnly".</Typography> 
  }
  else {
    return <Typography  color='textPrimary' gutterBottom>Some of your cookies are secure. Make sure that all cookies with personal information or session information are private.</Typography> 
  }
}

  let innerHTMLDialog = () => {
    if (!innerHTMLtest) {
      return <Typography  color='textPrimary' gutterBottom>No instances of innerHTML found.</Typography> 
    }
    else {
      return <Typography  color='textPrimary' gutterBottom>{innerHTMLtest} instances of innerHTML detected. While this may be a result of your bundler, using this property to change input text can be a security risk. Make sure to sanitize user input before passing data from the front-end to the back-end. This will prevent stored or reflected XSS.</Typography> 
    }
  }

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>
        {/* <FontAwesomeIcon icon="fa-solid fa-user-shield" /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-shield-blank" /> */}
        <FontAwesomeIcon icon={['fas', 'user-shield']} />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' color='textSecondary' onClose={handleClose}>
          <Typography variant='h4' color='textPrimary'>
            Defend Your Front-End
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{disclaimer()}</Typography>



          <Typography gutterBottom>{jsXSSDialog()}</Typography>

          

          <Typography gutterBottom>{jQueryDialog()}</Typography>
        </DialogContent>
          
        <DialogContent dividers>
          <Typography gutterBottom>{secureCookie()}</Typography>
        </DialogContent>
          
        <DialogContent dividers>
          <Typography gutterBottom>{innerHTMLDialog()}</Typography>
        </DialogContent>
          
        
        {/* <DialogActions></DialogActions> */}
      </Dialog>
    </div>
  );
}