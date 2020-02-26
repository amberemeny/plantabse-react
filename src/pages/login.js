import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RemoveRedEye } from "@material-ui/icons";
import {
  CircularProgress,
  Grid,
  Backdrop,
  Button,
  TextField,
  FormControl,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Link
} from "@material-ui/core";
import PageBase from "./pageBase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  media: {
    height: 140
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(2)
    }
  },
  button: {
    alignSelf: "center",
    margin: theme.spacing(1),
    background: theme.palette.primary.main,
    color: theme.palette.grey[50]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  card: {
    padding: (theme.spacing(2), theme.spacing(3)),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  eye: {
    cursor: "pointer"
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 16px"
  },
  loginLinks: {
    fontWeight: "bold"
  }
}));

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
  const history = useHistory();

  // Masks password for security purposes.
  const togglePasswordMask = () => {
    passwordIsMasked ? setPasswordIsMasked(false) : setPasswordIsMasked(true);
  };

  // An early close of the backdrop loading.
  const handleClose = () => {
    setOpen(false);
  };

  // Toggle the backdrop and redirect after 3s.
  const handleToggle = () => {
    setOpen(!open);
    setTimeout(function() {
      history.push("/dashboard");
    }, 2000);
  };

  // Email field changing.
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  // Password field changing.
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <PageBase showAppBar={false}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {/* Login Div */}
        <Card>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1528067146446-9604dcad3068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            title="Monstera Plant"
          />
          <CardContent className={classes.card}>
            <form className={classes.form} noValidate>
              <FormControl>
                <TextField
                  id="emailField"
                  label="Email"
                  type="email"
                  onChange={handleEmailChange}
                  value={email}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  color="primary"
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="passwordField"
                  label="Password"
                  type={passwordIsMasked ? "password" : "text"}
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveRedEye
                          className={classes.eye}
                          // Password Mask Toggle Here.
                          onClick={togglePasswordMask}
                        />
                      </InputAdornment>
                    )
                  }}
                  color="primary"
                />
              </FormControl>
              {/* Sign Up and Reset Password Links */}
              <div className={classes.linkContainer}>
                <Link
                  className={classes.loginLinks}
                  TypgraphyClasses={{ variant: "subtitle2" }}
                >
                  Sign Up
                </Link>
                <Link
                  className={classes.loginLinks}
                  TypgraphyClasses={{ variant: "subtitle2" }}
                >
                  Reset Password
                </Link>
              </div>
              {/* Sign In Button */}
              <Button
                onClick={handleToggle}
                className={classes.button}
                variant="contained"
              >
                {" "}
                Sign In{" "}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {/* Backdrop for Loading */}
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageBase>
  );
}
