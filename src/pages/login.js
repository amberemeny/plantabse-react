import React, { useState, useContext } from "react";
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
import { GlobalContext } from '../utils/globalContext'

import API from '../utils/API'

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
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
  const history = useHistory();
  const global = useContext(GlobalContext);

  // Handles login form.
  async function handleLogin(event) {
    event.preventDefault()
    try {
      setOpen(true)
      const response = await API({method: 'post', url: '/rest-auth/login/', data: { username, password}})
      if (response.status === 200) {
        const result = await API({method: 'get', url: '/users/'})
        if (result.status === 200) {
          sessionStorage.setItem('username', result.data.username)
          sessionStorage.setItem('id', result.data.id)
          global.setUserPlants()
        } else {
          console.log(result.data)
        }
        history.push('/dashboard')
      } else {
        console.log(response.data)
      }
    } catch (error) {
      if (error & error.response) {
        console.log(error)
      }
    }
  }

  // Masks password for security purposes.
  const togglePasswordMask = () => {
    passwordIsMasked ? setPasswordIsMasked(false) : setPasswordIsMasked(true);
  };

  // An early close of the backdrop loading.
  const handleClose = () => {
    setOpen(false);
  };

  // Toggle the backdrop and redirect after 3s.
  async function handleSave(event) {
    event.preventDefault()
    try {
      const response = await API({method: 'get', url: '/users/'})
      if (response.status === 200) {
        console.log(response)
      } else {
        console.log(response.data)
      }
    } catch (error) {
      if (error & error.response) {
        console.log(error)
      }
    }
  }

  // Username field changing.
  const handleUsernameChange = event => {
    setUsername(event.target.value);
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
                  id="usernamelField"
                  label="Username"
                  type="text"
                  onChange={handleUsernameChange}
                  value={username}
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
                onClick={handleSave}
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
                onClick={handleLogin}
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
