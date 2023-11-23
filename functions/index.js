/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const fb = require("firebase-admin");
fb.initializeApp();


exports.createUser = functions.https.onCall(async (data) => {
  try {
    const newUserData = await fb.auth().createUser(data);
    if (data.email.includes("IWantAdmin")) {
      createAdmin(newUserData.uid);
    }

    return newUserData;
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

const createAdmin = (uid) => {
  fb.auth()
      .setCustomUserClaims(uid, {
        admin: true,
      })
      .then(() => {
        console.log(uid + " is now a admin");
      })
      .catch((error) => {
        console.log("Error " + error);
      });
};

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
