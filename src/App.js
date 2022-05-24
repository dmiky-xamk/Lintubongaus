import "./App.css";
import "@fontsource/roboto";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NewSighting from "./pages/NewSighting";
import DeleteSighting from "./pages/DeleteSighting";
import EditSighting from "./pages/EditSighting";

function App() {
  const [sightings, setSightings] = useState(() => {
    const sightings = localStorage.getItem("sightings");

    // Palauttaa joko havainnot (jos localStoragessa), tai tyhjän taulukon.
    return sightings ? JSON.parse(sightings) : [];
  });

  const saveSightings = () => {
    localStorage.setItem("sightings", JSON.stringify(sightings));
  };

  useEffect(saveSightings, [sightings]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home sightings={sightings} />} />
        <Route
          path="uusi"
          element={<NewSighting onNewSighting={setSightings} />}
        />
        <Route
          path="poista/:id"
          element={
            <DeleteSighting
              sightings={sightings}
              onDeleteSighting={setSightings}
            />
          }
        />
        <Route
          path="muokkaa/:id"
          element={
            <EditSighting sightings={sightings} onEditSighting={setSightings} />
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
