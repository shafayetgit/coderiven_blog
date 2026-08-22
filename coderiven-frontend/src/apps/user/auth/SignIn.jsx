import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Container,
  Grid2,
  Link,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useSignInMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useLocation, useNavigate } from "react-router";
import GoogleSignin from "./partials/GoogleSignin";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.userAuth);

  const location = useLocation();

  const next = location.state || "/";

  const [signIn, { error, isLoading, isError, isSuccess }] =
    useSignInMutation();

  useEffect(() => {
    isAuth && navigate(next);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Use `unwrap` to get the resolved response
      const response = await signIn({ email, password }).unwrap();
      // Save tokens to localStorage and state
      dispatch(setCredentials(response));
      // window.location.href = '/'
      navigate(next);
    } catch (err) {
      // console.error("Sign-In Error:", err);
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            backgroundColor: "transparent",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Sign In
          </Typography>

          <Stack direction="row" justifyContent="center">
            {isError && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error?.data?.detail || "An error occurred during sign in."}
              </Typography>
            )}
            {isSuccess && (
              <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
                Sign in successful!
              </Typography>
            )}
          </Stack>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              aria-label="Email Address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              aria-label="Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
              aria-label="Sign In"
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <GoogleSignin next={next} />
            <Grid2 container justifyContent="space-between">
              <Grid2 item="true">
                <Link href="#" variant="body2" aria-label="Forgot password">
                  Forgot password?
                </Link>
              </Grid2>
              <Grid2 item="true">
                <Link href="#" variant="body2" aria-label="Sign Up">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;
