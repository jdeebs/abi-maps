import { db } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === SELECT MARKER TYPE TO UPLOAD ===
// Only change filePath and sharedData

const filePath = resolve(__dirname, "../data/valley/document_boxes.json");

const sharedData = {
  type: "document_box",
  icon: "document_box",
  label: "Document Box",
  map: "valley",
};

async function uploadMarkers() {
  let data;

  try {
    const jsonData = await fs.promises.readFile(filePath, "utf-8");
    data = JSON.parse(jsonData);
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
      console.log(`Uploaded ${sharedData.label} at [${pos.lat}, ${pos.lng}]`);
    } catch (err) {
      console.error("Failed to upload marker:", err);
    }
  }
}

uploadMarkers()
  .then(() => {
    console.log("Marker upload complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Upload failed:", err);
    process.exit(1);
  });
