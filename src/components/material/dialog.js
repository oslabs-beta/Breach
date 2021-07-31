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
    margin: 0,
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
      console.log('inside if statement');
      return (
        <Typography className={classes.title} color='textPrimary' gutterBottom>
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

  const secureCookie = cookieTest.some(
    (cookie) => cookie.secure === false || cookie.httpOnly === false
  );

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>
        {/* <FontAwesomeIcon icon="fa-solid fa-user-shield" /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-shield-blank" /> */}
        <FontAwesomeIcon icon={['fas', 'user-shield']} />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          How to defend your front-end ?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{disclaimer()}</Typography>
          <Typography gutterBottom>{jqueryTest ? 'jquery' : ''}</Typography>
          <Typography gutterBottom>{secureCookie ? 'cookie' : 'no cookie'}</Typography>
          <Typography gutterBottom>
            {innerHTMLtest ? 'innerHTML' : 'no innerHTML'}
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
