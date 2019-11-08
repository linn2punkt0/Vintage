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
export const getFilteredEvents = async (
  order,
  region,
  timeperiods
  // categories
) => {
  const tempArray = [];
  let query = db.collection("events");

  query = query.orderBy("startDate", order);

  // console.log(order, region, timeperiods, categories);

  if (region !== "") {
    query = query.where("region", "==", region);
  }

  if (timeperiods.length > 0) {
    timeperiods.forEach(period => {
      query = query.where("timeperiods", "array-contains", period);
    });
  }

  // ADD SOLUTION FOR MULTIPLE ARRAY-CONTAINS
  //   if (categories !== []) {
  //     query = query.where("categories", "array-contains", categories);
  //   }
  const querySnapshot = await query.get();
  querySnapshot.forEach(doc => {
    tempArray.push({ id: doc.id, ...doc.data() });
  });
  // console.log(tempArray);
  return tempArray;
};
