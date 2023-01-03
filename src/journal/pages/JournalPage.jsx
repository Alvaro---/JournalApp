import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    //No necesita usar elementos como typography gracias al tema, pero si es importante usarlo siempre
    //El component='h1' es lo que aparecera en el html pero no cambiara el tema.
    //Para cambiar el tema se usa variant='h1'
    // <Typography component='h1'>JournalPage</Typography>
    <JournalLayout className="animate__animated animate__fadeIn animate__fast">
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corporis cumque ipsum praesentium beatae veniam error et asperiores vero nihil, molestiae voluptate, quaerat, provident doloribus? Expedita accusantium maxime aspernatur fugit!</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fonstSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
