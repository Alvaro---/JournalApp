import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from "../../store/auth";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange, formState } = useForm({
    email: "alvaro@google.com",
    password: "123456",
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    // dispatch(checkingAuthentication())
    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("google Sign In");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login!">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          {/* Dentro del mismo grid va en column */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* La configuracion por defecto es para pantallas pequeñas- mobilFirst */}
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* La configuracion por defecto es para pantallas pequeñas- mobilFirst */}
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            {/* Este es el link de material UI */}
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear Una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
