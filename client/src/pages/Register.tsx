/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axiosInstance from "src/api/instance";
import { RegisterForm } from "src/types/Product";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLoading } from "src/context/loading";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();
  const defaultTheme = createTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const res = await axiosInstance.get("http://localhost:3000/users");
      const users = res.data;
      const userExits = users.some((user: any) => user.email === data.email);
      if (userExits) {
        setError("Email đã tồn tại trong hệ thống");
      } else {
        await axiosInstance.post("http://localhost:3000/register", data);
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <>
      <Loading isShow={loading} />
      {/* <ThemeProvider theme={defaultTheme}> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    {...register("username", {required: "Username is required",
                    })}
                    error={!!errors?.username?.message}
                    helperText={errors?.username?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password is minimum length 6 characters",
                      },
                    })}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    error={!!errors?.confirmPassword?.message}
                    helperText={errors?.confirmPassword?.message}
                  />
                </Grid>
              </Grid>
              {error && (
                <Typography color="red" textAlign="left" mb={2}>
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="By creating an account, you agree to our Terms "
                sx={{ mt: 2 }} 
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up</Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
              >
                <SnackbarContent message="Đăng ký thành công, đang chuyển sang trang đăng nhập" />
              </Snackbar>
            </Box>
          </Box>
        </Container>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Register;