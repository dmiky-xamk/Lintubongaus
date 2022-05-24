import { Button, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import DTPicker from "./DTPicker";

export default function SightingForm(props) {
  const [errors, setErrors] = useState({});
  const [DTPickerError, setDTPickerError] = useState(false);

  // Tarkistetaan, ettei mikään syöttökenttä ole tyhjä formin lähetyksen aikana.
  const inputsLeftEmpty = () => {
    let errMessages = {};

    if (!props.name.trim()) {
      errMessages = { ...errMessages, bird: "Lintulajin nimi on pakollinen." };
    }

    if (!props.location.trim()) {
      errMessages = {
        ...errMessages,
        location: "Havainnon sijainti on pakollinen.",
      };
    }

    if (props.dateAndTime && props.date === undefined) {
      errMessages = {
        ...errMessages,
        date: "Ajankohta on pakollinen.",
      };
    }

    if (Object.values(errMessages).length > 0) {
      setErrors(errMessages);
      return true;
    }

    setErrors({});
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Jos DateTimePicker on nostanut oman virheilmoituksen, niin poistutaan.
    if (DTPickerError) return;

    // Tarkistetaan, ettei mikään syöttökenttä ole tyhjänä.
    if (inputsLeftEmpty()) return;

    props.onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gridTemplateRows="repeat(3, 1fr)"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <TextField
          name="bird"
          id="bird"
          label="Lintulajin nimi"
          value={props.name}
          onChange={(e) => props.onNameChange(e.target.value)}
          error={Boolean(errors.bird)}
          helperText={errors.bird}
        />
        <TextField
          name="location"
          id="location"
          label="Havainnon sijainti"
          value={props.location}
          onChange={(e) => props.onLocationChange(e.target.value)}
          error={Boolean(errors.location)}
          helperText={errors.location}
        />
        {props.dateAndTime && (
          <DTPicker
            date={props.date}
            errors={errors}
            onDateChange={props.onDateChange}
            onDTPickerError={setDTPickerError}
            onError={setErrors}
          />
        )}
        <Button
          sx={{ justifySelf: "end", width: "50%", height: "70%" }}
          variant="contained"
          type="submit"
        >
          {props.btnText}
        </Button>
        <Button
          sx={{ width: "50%", height: "70%" }}
          variant="outlined"
          component={RouterLink}
          to="/"
        >
          Peruuta
        </Button>
      </Box>
    </form>
  );
}
