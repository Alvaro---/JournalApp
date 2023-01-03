import { CircularProgress, Grid } from "@mui/material"

export const ChekingAuth = () => {
  return (
    <Grid
            container
            spacing={0} //Sin espacio entre los hijos
            direction="column" //Como flex
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }} // style extended
        >
            <Grid container
                direction='row'
                justifyContent='center'
            >
                <CircularProgress color='warning'/>
            </Grid>
        </Grid>
  )
}
