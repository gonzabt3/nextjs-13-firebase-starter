import {onRequest} from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as cors from "cors";
import axios from "axios";
import { savePayment } from "./common";

const corsOptions = {
  origin: true,
};

const corsMiddleware = cors(corsOptions);
admin.initializeApp();

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

const getRestauranstByUserId = async (userId:string) => {
  return admin.firestore()
  .collection("restaurants")
  .where("ownerId", "==", userId)
  .get()
  .then((querySnapshot : any) => {
    const restaurants = querySnapshot.docs.map((doc: any) => (
      {
        id: doc.id,
        data: doc.data()
      }
    )
  );
    return restaurants
  })
  .catch((error : any) => {
    console.error(error);
  });
};

const getMenusByRestaurantId = async (restaurantId:string) => {
  admin.firestore()
  .collection("menus")
  .where("restaurantId", "==", restaurantId)
  .get()
  .then((querySnapshot : any) => {
    const menus = querySnapshot.docs.map((doc: any) => (
      {
        id: doc.id,
        data: doc.data()
      }
    )
  );
  console.log("Menus:", menus);
    return menus
  })
  .catch((error : any) => {
    console.error(error);
  });
};

const updateMenuPayed = async (menuId:string) => {
  admin.firestore()
  .collection("menus")
  .doc(menuId)
  .update({
    payed: true
  })
}

const updateSubscriptionPayedOnMenus = async (currentUserId:string) => {
  
   await getRestauranstByUserId(currentUserId).then((restaurants:any) => {
   restaurants.forEach((restaurant:any) => {
    getMenusByRestaurantId(restaurant.id).then((menus:any) => {
     menus.forEach((menu:any) => {
      updateMenuPayed(menu.id)
     })
   })
  })
  }
  )
}


export const pay = onRequest((request, response) => {
  corsMiddleware(request, response, () => {
    const data = request.body;
    const userUid = data.userUid;
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
      savePayment(response.data, userUid);
      updateSubscriptionPayedOnMenus(userUid)
    })
    .catch(error => {
      console.error(error);
    });
  });
});