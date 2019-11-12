import app from "./firebase";

const db = app.firestore();

// GET ALL START DATA - Only fetch once
export const getAllStartData = async collection => {
  const tempArray = [];

  const querySnapshot = await db.collection(collection).get();
  querySnapshot.forEach(doc => {
    tempArray.push({ id: doc.id, ...doc.data() });
  });

  return tempArray;
};

// Fetch many times when sorting and filtering
export const getFilteredEvents = async (order, region, tags) => {
  const tempArray = [];
  let query = db.collection("events");

  query = query.orderBy("startDate", order);

  if (region !== "") {
    query = query.where("region", "==", region);
  }

  if (tags.length > 0) {
    query = query.where("tags", "array-contains-any", tags);
  }

  const querySnapshot = await query.get();
  querySnapshot.forEach(doc => {
    tempArray.push({ id: doc.id, ...doc.data() });
  });
  return tempArray;
};
