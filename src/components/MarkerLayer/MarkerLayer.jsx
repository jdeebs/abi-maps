import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

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
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={L.divIcon({
            className: `custom-marker ${marker.type}`,
            html: "📄", // change later
            iconSize: [30, 30],
          })}
        >
          <Tooltip>{marker.label}</Tooltip>
        </Marker>
      ))}
    </>
  );
}

export default MarkerLayer;
