try {
  const ai = require("firebase/ai");
  console.log("Firebase AI exists!");
  console.log(Object.keys(ai));
} catch(e) {
  console.error("Firebase AI does not exist", e.message);
}
