import { useEffect, useState, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { markerIcons } from "../../utils/markerIcons";
import "./MarkerLayer.css";

function MarkerLayer({ activeTypes = [] }) {
  const [allMarkers, setAllMarkers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "markers"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllMarkers(data);
    });
    return () => unsub();
  }, []);

  const visibleMarkers = useMemo(() => {
    // Show all markers when no filters active
    if (!activeTypes.length) return allMarkers;

    return allMarkers.filter(marker =>
      activeTypes.includes(marker.type)
    );
  }, [allMarkers, activeTypes]);

  return (
    <>
      {visibleMarkers.map((marker) => {
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
