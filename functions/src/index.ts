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
import axios from "axios";

const corsOptions = {
  origin: true,
};

const corsMiddleware = cors(corsOptions);
admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const addDocumentToCollection = async (req :any, res:any, projectId:number, collectionName:string) => {
  try {
    // Make a POST request to the Firestore API
    const response = await axios.post(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}`, {
      fields: {
        // Specify the fields you want to save in the document
        // For example, if you have a field called "name":
        name: req.body.name,
        // Add more fields as needed
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.headers.authorization}`,
      },
    });

    // Check if the document was added successfully
    if (response.status === 200) {
      console.log('Document added successfully');
      res.status(200).json({ success: true, message: 'Document added successfully' });
    } else {
      console.error('Error adding document:', response.data.error.message);
      res.status(500).json({ success: false, message: 'Error adding document' });
    }
  } catch (error : any) {
    console.error('Error adding document:', error.message);
    res.status(500).json({ success: false, message: 'Error adding document' });
  }
};


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

const savePayment = (dataFromMercadoPago:any,userId:number) => {
  addDocumentToCollection()
  console.log("savePayment")
}

export const pay = onRequest((request, response) => {
  corsMiddleware(request, response, () => {
    const data = request.body;
    console.log(data)
    const userId = 1
    const rootPath = "https://api.mercadopago.com/preapproval";  
    const payload ={
      "auto_recurring": {
        "frequency": 1,
        "frequency_type": "months",
        "transaction_amount": 100,
        "currency_id": "ARS"
      },
      "back_url": "https://www.mercadopago.com.ar",
      "card_token_id": data.token,
      "external_reference": "YG-1234",
      "payer_email": data.payer.email,
      "preapproval_plan_id": "2c93808490edce740190f279e3290150",
      "reason": "Yoga classes",
      "status": "authorized"
    }
    axios.post(rootPath, payload, {
      headers: {
        'Authorization': 'Bearer APP_USR-4866563516710223-072701-f2f7275706d98adc319f63ee4abc7376-1910961146',
        'Content-Type': 'application/json'
      }
    } )
    .then(response => {
      savePayment(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  });
});