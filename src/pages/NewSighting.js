import classes from "./NewSighting.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import SightingForm from "../components/SightingForm";

export default function NewSighting(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    const sighting = {
      id: uuid(),
      name: name,
      location: location,
      date: Date.now(),
    };

    props.onNewSighting((oldSightings) => [...oldSightings, sighting]);

    navigate("/", { replace: true });
  };

  return (
    <section className={classes["section-new-sighting"]}>
      <h1 className="heading-primary">Lisää havainto</h1>
      <SightingForm
        name={name}
        location={location}
        dateAndTime={false}
        btnText="Lisää havainto"
        onNameChange={setName}
        onLocationChange={setLocation}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </section>
  );
}
