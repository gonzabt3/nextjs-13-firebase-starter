'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import CustomerMenu from "../components/CustomerMenu";


const replaceSpaces = (string: string) => string.replace(/%20/g, ' ');
export default function Menu() {
  const restaurantName : any = useParams().restaurantName;
  const [menu, setMenu] = useState<any>(null)
  const [showErrorNotFound, setShowErrorNotFound] = useState(false);
  const  [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const db = getFirestore(firebase_app);
        const queryRestaurantName = replaceSpaces(restaurantName);

        console.log(queryRestaurantName);
        const q = query(collection(db, "menus"), where("restaurantName", "==", queryRestaurantName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one restaurant with the given name
          const restaurantData :any = querySnapshot.docs[0].data();
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

