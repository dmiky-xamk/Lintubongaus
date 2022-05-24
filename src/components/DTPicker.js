import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { fi } from "date-fns/locale";

export default function DTPicker(props) {
  const handleError = (error) => {
    let errorMessage = "";

    switch (error) {
      case "maxTime":
        errorMessage = "Kellonaika ei voi olla tulevaisuudessa";
        break;
      case "invalidDate":
        errorMessage = "Virheellinen päivämäärä.";
        break;
      case "maxDate":
        errorMessage = "Päivämäärä ei voi olla tulevaisuudessa.";
        break;
      case "minDate":
        errorMessage = "Päivämäärä ei voi olla liikaa menneisyydessä.";
        break;
      case "noDate":
        errorMessage = "Syötä päivämäärä.";
        break;
      case null:
        errorMessage = null;
        break;
      default:
        errorMessage = "Odottamaton virhe";
        break;
    }

    props.onError((errors) => {
      return { ...errors, date: errorMessage };
    });

    // Asetetaan state todeksi, jos ratkaisematon virhe päivämäärän kanssa.
    errorMessage === null
      ? props.onDTPickerError(false)
      : props.onDTPickerError(true);
  };

  return (
    <Box gridColumn="span 2">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
        <DateTimePicker
          name="date"
          id="date"
          label="Ajankohta"
          okText="OK"
          cancelText="Peruuta"
          mask=""
          ampm={false}
          maxDateTime={Date.now() + 1}
          value={props.date}
          onError={handleError}
          onChange={(newDate) => props.onDateChange(newDate?.getTime())}
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(props.errors.date)}
              helperText={props.errors.date}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
