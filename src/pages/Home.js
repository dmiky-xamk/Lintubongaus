import classes from "./Home.module.css";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import { v4 as uuid } from "uuid";
import format from "date-fns/format";

export default function Home(props) {
  const formatDate = (date) => format(date, "d.M.y HH:mm");
  const sortedSightings = props.sightings.sort((a, b) => b.date - a.date);

  const sightings = sortedSightings.map((sighting) => {
    return (
      <Card key={uuid()} sx={{ minWidth: 300 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography color="text.secondary" fontSize={14}>
                {sighting.location}
              </Typography>
              <Typography color="text.secondary" fontSize={14}>
                {formatDate(sighting.date)}
              </Typography>
            </Box>
            <Box>
              <IconButton component={RouterLink} to={`/muokkaa/${sighting.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton component={RouterLink} to={`/poista/${sighting.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography sx={{ textAlign: "center", paddingTop: 2 }}>
            {sighting.name}
          </Typography>
        </CardContent>
      </Card>
    );
  });

  return (
    <section className={classes["section-home"]}>
      <Box sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
        <Button
          sx={{ marginBottom: 1.8 }}
          component={RouterLink}
          to="uusi"
          variant="contained"
        >
          Uusi lintuhavainto
        </Button>
      </Box>
      <div className={classes.flex}>{sightings}</div>
    </section>
  );
}
