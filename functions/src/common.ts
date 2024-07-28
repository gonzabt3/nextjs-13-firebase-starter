import { firestore } from "firebase-admin";

export const addDocumentToCollection = async (collectionPath: string, data: any) => {
  const db = firestore();
  const collectionRef = db.collection(collectionPath);
  const docRef = await collectionRef.add(data);
  console.log(`Document added with ID: ${docRef.id}`);
}

export const savePayment = async (dataFromMercadoPago:any,userId:number) => {
  //TODO: save the payment in firebase
  await addDocumentToCollection("subscriptions", {
    userId,
    data: dataFromMercadoPago
  });
  console.log("savePayment");
}