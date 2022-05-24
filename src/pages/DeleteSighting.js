import classes from "./DeleteSighting.module.css";
import { useParams, useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function DeleteSighting(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const deletableSighting = props.sightings.find(
    (sighting) => sighting.id === id
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onDeleteSighting((oldSightings) =>
      oldSightings.filter((sighting) => sighting !== deletableSighting)
    );

    navigate("/", { replace: true });
  };

  return (
    <section className={classes["section-delete"]}>
      <h1 className="heading-primary">Poista havainto</h1>
      <form onSubmit={handleSubmit}>
        <Typography sx={{ marginBottom: 1.8 }}>
          Haluatko varmasti poistaa havainnon {deletableSighting.name}?
        </Typography>
        <Button sx={{ marginRight: 1 }} type="submit" variant="contained">
          Poista
        </Button>
        <Button variant="outlined" component={RouterLink} to="/">
          Peruuta
        </Button>
      </form>
    </section>
  );
}
