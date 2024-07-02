'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection,doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import CustomerMenu from "../../components/CustomerMenu";

export default function Menu() {
  const restaurantId : any = useParams().restaurantId;
  const [menu, setMenu] = useState<any>(null)
  const [showErrorNotFound, setShowErrorNotFound] = useState(false);
  const  [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const db = getFirestore(firebase_app);
        const docRef = doc(db, 'menus', restaurantId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          // Assuming there's only one restaurant with the given name
          const restaurantData :any = docSnap.data();
          console.log("Restaurant data:", restaurantData);
          setMenu(restaurantData)
          setLoading(false);
        } else {
          console.log("Restaurant not found");
          setShowErrorNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setShowErrorNotFound(true);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []); 


  return (
    <CustomerMenu menu={menu} loading={loading} showErrorNotFound={showErrorNotFound} />  
  );
}
