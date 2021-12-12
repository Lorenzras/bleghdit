import { Checkbox, Typography, Link as MuiLink } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { NextPage } from "next";

import React, { FormEvent, useState } from "react";
import CButton from "../components/CButton";
import CTextField from "../components/CTextField";

const Register: NextPage = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", user);
      console.log(res.data);
    } catch (err: any) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.imageContainer}></Box>

      <Box className={classes.formContainer}>
        <Box className={classes.labels}>
          <Typography variant="h6">Sign up</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            By continuing, you are setting up a Reddit account and agree to our
            <MuiLink underline="none"> User Agreement </MuiLink>
            and
            <MuiLink underline="none"> Privacy Policy </MuiLink>.
          </Typography>
        </Box>

        <Box className={classes.checkboxContainer}>
          <Checkbox size="small" disableRipple className={classes.checkbox} />
          <Typography variant="subtitle2" color="textSecondary">
            I agree to get emails about cool stuff on Reddit
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <CTextField
            variant="outlined"
            label="email address"
            fullWidth
            error={errors.email ? true : false}
            value={user.email}
            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.email}
          </Typography>

          <CTextField
            variant="outlined"
            label="username"
            fullWidth
            error={errors.username ? true : false}
            value={user.username}
            onChange={(e: any) => setUser({ ...user, username: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.username}
          </Typography>

          <CTextField
            variant="outlined"
            label="password"
            type="password"
            fullWidth
            error={errors.password ? true : false}
            value={user.password}
            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
          />
          <Typography color="error" variant="subtitle2">
            {errors.password}
          </Typography>

          <CButton type="submit" variant="contained" fullWidth>
            REGISTER
          </CButton>
        </Box>

        <Typography>
          Already a ledditor? <MuiLink underline="none">Log in</MuiLink>
        </Typography>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((_) => ({
  root: {
    display: "flex",
    background: "white",
  },
  imageContainer: {
    width: "10%",
    height: "100vh",
    backgroundImage: "url('/images/bricks.jpg') ",
  },
  formContainer: {
    maxWidth: "23rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0rem 1.5rem",
    paddingBottom: "5rem",
  },
  checkboxContainer: {
    display: "flex",
  },
  checkbox: {
    marginRight: "0.3rem",
    padding: 0,
  },
  labels: {
    paddingBottom: "3rem",
  },
}));

export default Register;
