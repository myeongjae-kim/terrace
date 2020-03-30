import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(37.5)
  },
  form: {
    "& > div": {
      margin: `${theme.spacing(1)}px 0`
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

interface Props {
  onChangeEmail(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onChangePassword(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

const SignIn: React.FC<Props> = ({ onChangeEmail, onChangePassword, onSubmit }) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        label="Email"
        type="text"
        onChange={onChangeEmail}
        autoFocus
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          name: "identifier",
          autoComplete: "username",
          id: "identifierId",
        }} />
      <TextField
        label="Password"
        type="password"
        onChange={onChangePassword}
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          name: "identifier",
          autoComplete: "current-password",
          id: "password-text-field",
        }} />
      <div className={classes.buttonContainer}>
        <Button type="submit" variant="contained" color="primary">
          다음
        </Button>
      </div>
    </form>
  </div>;
};

export default SignIn;