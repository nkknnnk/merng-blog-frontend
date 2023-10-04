import React, { useState } from "react";
import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { authStyles } from "../style/auth-styles";
import { ImBlogger } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_SIGNUP } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const [login] = useMutation(USER_LOGIN);
  const [signup] = useMutation(USER_SIGNUP);
  const [isSignup, setIsSignup] = useState(false);
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down);

  const onResReceived = (data: any) => {
    console.log(data);
    if (data.signup) {
      const { id, email, name } = data.signup;
      localStorage.setItem("userData", JSON.stringify({ id, name, email }));
    } else {
      const { id, email, name } = data.login;

      localStorage.setItem("userData", JSON.stringify({ id, name, email }));
    }
    dispatch(authActions.login());
    navigate("/blogs")
  };
  const onSubmit = async ({ name, email, password }: Inputs) => {
    if (isSignup) {
      //signup
      try {
        const res = await signup({ variables: { name, email, password } });
        if (res.data) {
          onResReceived(res.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      // login
      try {
        const res = await login({ variables: { email, password } });
        if (res.data) {
          onResReceived(res.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.logoTitle}>
        <ImBlogger
          size="40px"
          style={{
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: "#6c5252",
          }}
        />
        <Typography sx={authStyles.logoText}>devBlog</Typography>
      </Box>
      <Box
        sx={{ ...authStyles.formContainer, width: isBelowMd ? "50%" : "300px" }}
      >
        <Typography sx={authStyles.logoText}>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {/* @ts-ignore */}
        <form style={authStyles.form} onSubmit={handleSubmit(onSubmit)}>
          {isSignup && (
            <>
              <InputLabel aria-label="name"></InputLabel>
              <TextField
                InputProps={{ style: { borderRadius: 20 } }}
                aria-label="name"
                label="name"
                {...register("name", { required: true })}
              />
            </>
          )}
          <InputLabel aria-label="email"></InputLabel>
          <TextField
            helperText={Boolean(errors.email) ? "Invalid Email" : ""}
            error={Boolean(errors.email)}
            InputProps={{ style: { borderRadius: 20 } }}
            aria-label="email"
            label="email"
            // type="email"
            {...register("email", {
              required: true,
              validate: (val: string) =>
                /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val),
            })}
          />
          <InputLabel aria-label="password"></InputLabel>
          <TextField
            helperText={
              Boolean(errors.password) ? "Length Should be Grater than 5" : ""
            }
            error={Boolean(errors.password)}
            InputProps={{ style: { borderRadius: 20 } }}
            aria-label="password"
            label="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <Button sx={authStyles.submitBtn} variant="contained" type="submit">
            Submit
          </Button>
          <Button
            // @ts-ignore
            sx={{ ...authStyles.submitBtn, ...authStyles.switchBtn }}
            onClick={() => setIsSignup((prev) => !prev)}
          >
            Switch to {isSignup ? "Login" : "Signup"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Auth;
