/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as cors from "cors";

const corsOptions = {
  origin: true,
};

const corsMiddleware = cors(corsOptions);
admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello 111!", {structuredData: true});
  response.send("Hello from a111sd!");
});

export const suscriptions = onRequest((request, response) => {
  corsMiddleware(request, response, () => {
    const userId = request.query.userId;
    // Query the Firestore database
    admin.firestore()
      .collection("subscriptions")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot : any) => {
        const subscription = querySnapshot.docs[0].data();
        response.send(subscription);
      })
      .catch((error : any) => {
        console.error(error);
        response.status(500).send(error.message);
      });
  });
});
