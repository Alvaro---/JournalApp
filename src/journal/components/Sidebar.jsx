import { TurnedInNot } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, ListItem, List, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"
import { useSelector } from "react-redux"

export const Sidebar = ({ drawerWidth }) => {

    const {displayName}=useSelector(state=>state.auth)
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary si se mostrara de manera condicional
                open//open={true} 
                // ModalProps={{}}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        ['Enero', 'F', 'M', 'A'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary='lorem ipsumasd asd asd asd as dasd' />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
