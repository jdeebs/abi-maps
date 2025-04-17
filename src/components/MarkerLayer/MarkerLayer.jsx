import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import markerIcons from "../../utils/markerIcons";
import "./MarkerLayer.css";

function MarkerLayer() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "markers"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarkers(data);
    });
    return () => unsub();
  }, []);

  return (
    <>
      {markers.map((marker) => {
        const iconPath =
          markerIcons[marker.type] || "src/assets/icons/default.svg";

        return (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={L.divIcon({
              className: `marker-icon ${marker.type}`,
              html: `<img src="${iconPath}" />`,
              iconAnchor: [16, 16],
            })}
          >
            <Tooltip>{marker.label}</Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkerLayer;
