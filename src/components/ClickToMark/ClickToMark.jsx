import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

import "./ClickToMark.css";

function ClickToMark() {
  const [position, setPosition] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useMapEvents({
    click(e) {
      const coords = {
        lat: parseFloat(e.latlng.lat.toFixed(2)),
        lng: parseFloat(e.latlng.lng.toFixed(2)),
      };

      const formattedCoords = JSON.stringify(coords, null, 2);

      // Copy to clipboard
      navigator.clipboard
        .writeText(formattedCoords)
        .then(() => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 1500);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });

      // Update state
      setPosition(coords);
    },
  });

  return (
    <>
        {showAlert && <div className="copy-alert">Coordinates copied to clipboard</div>}

        {position && (
            <Marker position={position}>
                <Popup>
                    Coordinates:<br />
                    {position.lat.toFixed(2)}, {position.lng.toFixed(2)}
                </Popup>
            </Marker>
        )}
    </>
  );
}

export default ClickToMark;
