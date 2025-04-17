import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

// === SELECT MARKER TYPE TO UPLOAD ===
// Only change filePath and sharedData

const filePath = "./data/valley/document_boxes.json";
const sharedData = {
  type: "document_box",
  icon: "document_box",
  label: "Document Box",
  map: "valley",
};

async function uploadMarkers() {
  let data;

  try {
    const module = await import(filePath, {
      assert: { type: "json" },
    });
    data = module.default;
  } catch (err) {
    console.error(`Failed to import marker data from ${filePath}:\n`, err);
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Marker data is not an array.");
    return;
  }

  for (const pos of data) {
    if (typeof pos.lat !== "number" || typeof pos.lng !== "number") {
      console.warn("Skipping invalid position:", pos);
      continue;
    }
    const marker = {
      ...sharedData,
      position: {
        lat: pos.lat,
        lng: pos.lng,
      },
    };

    try {
      await addDoc(collection(db, "markers"), marker);
      console.log(`Uploaded ${sharedData.label} at [${pos.lat}, ${pos.lng}`);
    } catch (err) {
      console.error("Failed to upload marker:", err);
    }
  }
}

uploadMarkers();
