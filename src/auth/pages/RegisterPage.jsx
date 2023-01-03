import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  email: "alvaro@google.com",
  password: "123456",
  displayName: "Alvaro",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe tener una arroba"],
  password: [
    (value) => value.length >= 6,
    "La clave debe tener mas de 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isChekingAuthentication = useMemo(() => status === "cheking", [status]);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
    formValidation,
  } = useForm(formData, formValidations);

  // console.log(formValidation)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    console.log(formState);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Registro">
      <h1>FormValid {isFormValid ? "Valido" : "Incorrect"}</h1>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre y apellido"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              {/* La configuracion por defecto es para pantallas pequeñas- mobilFirst */}
              <Button
                variant="contained"
                disabled={isChekingAuthentication}
                fullWidth
                type="submit"
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            {/* Este es el link de material UI */}
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
