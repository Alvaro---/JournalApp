import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "login" }) => {
  return (
    <Grid
      container
      spacing={0} //Sin espacio entre los hijos
      direction="column" //Como flex
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }} // style extended
      // xs // tamaño
    >
      <Grid
        item
        className="box-shadow" //Estilos globales
        xs={3} //md, xl, etc
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
