import React, { PureComponent } from 'react';
import { styles } from '../styles/TextFieldEdit';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { resetOverFlowY } from '../../../utils/styleResets';

class TextFieldEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.textFieldValue = null;
  }

  handleClick = ({ confirm = false }, e) => {
    const { onClickHandler } = this.props;

    e.preventDefault();
    onClickHandler({ confirm, textFieldValue: this.textFieldValue });
  };

  handleChange = event => {
    this.textFieldValue = event.target.value;
  };

  render() {
    const {
      classes: styles,
      bodyText,
      secondaryText,
      trigger,
      titleText,
      defaultValue,
      label,
      multiline,
      fullWidthDialog,
      maxWidthDialog,
      fullWidthTextField,
      autoFocus,
      required,
      id,
      btnPositiveText,
      btnNegativeText,
      errors
    } = this.props;

    return (
      <Dialog
        className={styles.root}
        open={trigger}
        fullWidth={fullWidthDialog}
        maxWidth={maxWidthDialog}
        onExited={() => {
          resetOverFlowY();
        }}
      >
        <DialogTitle>{titleText}</DialogTitle>
        <form
          onSubmit={e => this.handleClick({ confirm: true }, e)}
          noValidate
          autoComplete="off"
        >
          <DialogContent>
            <DialogContentText className={styles.dialogContentText}>
              {bodyText}
              <Typography variant="caption">
                {typeof secondaryText !== 'undefined' && secondaryText !== null
                  ? secondaryText
                  : ''}
              </Typography>
            </DialogContentText>
            <TextField
              id={id}
              required={required}
              label={errors.toggle ? errors.message : label}
              fullWidth={fullWidthTextField}
              autoFocus={autoFocus}
              autoComplete="off"
              defaultValue={defaultValue}
              multiline={multiline}
              onChange={e => this.handleChange(e)}
              error={errors.toggle}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={e => this.handleClick({ confirm: true }, e)}
              color="secondary"
            >
              {btnPositiveText}
            </Button>
            <Button
              onClick={e => this.handleClick({ confirm: false }, e)}
              color="secondary"
            >
              {btnNegativeText}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TextFieldEdit);
