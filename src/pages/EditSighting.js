import classes from "./EditSighting.module.css";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import SightingForm from "../components/SightingForm";

export default function EditSighting(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const editableSighting = props.sightings.find(
    (sighting) => sighting.id === id
  );

  const [name, setName] = useState(editableSighting.name);
  const [location, setLocation] = useState(editableSighting.location);
  const [date, setDate] = useState(editableSighting.date);

  const handleSubmitSuccess = () => {
    const sighting = {
      id: editableSighting.id,
      name: name,
      location: location,
      date: date,
    };

    const filteredSightings = props.sightings.filter(
      (sighting) => sighting !== editableSighting
    );

    props.onEditSighting([...filteredSightings, sighting]);

    navigate("/", { replace: true });
  };

  return (
    <section className={classes["section-edit"]}>
      <h1 className="heading-primary">Muokkaa havaintoa</h1>
      <SightingForm
        name={name}
        location={location}
        date={date}
        dateAndTime={true}
        btnText="Tallenna"
        onNameChange={setName}
        onLocationChange={setLocation}
        onDateChange={setDate}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </section>
  );
}
