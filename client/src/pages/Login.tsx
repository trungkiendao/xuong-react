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
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axiosInstance from "src/api/instance";
import { RegisterForm } from "src/types/Product";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoading } from "src/context/loading";

const Login = () => {
  const defaultTheme = createTheme();

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const {loading,setLoading} = useLoading()
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const res = await axiosInstance.post("http://localhost:3000/login", data);
      const token = res.data.accessToken;
      console.log(token);
      localStorage.setItem("token", token);

      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/admin/products/list");
      }, 3000);
    } catch (error) {
      console.log("Đăng nhập thất bại");

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setError("Email hoặc mật khẩu sai");
        }
      } else {
        setError("Đã xảy ra lỗi vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loading isShow={loading} />

      <ThemeProvider theme={defaultTheme}>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message: "Invalid email address",
                  },
                })}
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
              />
              {error && (
                <Typography color="red" textAlign="left" mb={2}>
                  {error}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors?.password?.message}
                helperText={errors?.password?.message}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" style={{ textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={3000} // Tự động đóng sau 3 giây
                onClose={() => setSnackbarOpen(false)}
              >
                <SnackbarContent message="Đăng nhập thành công, đang chuyển sang trang Products List" />
              </Snackbar>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;