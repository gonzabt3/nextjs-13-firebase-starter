db structure

restaurants
  id
  name
  description
  address
  phone
  instagramUser
  primaryMenu


menus
  id
  description
  primary,
  restaurantName
  SECTIONS:[
    {
      id:
      name:
      description:
      PRODUCTS:[
        {
          id:
          name:
          description:
          price:
          image
        }
      ]
    }
  ]

qr code---
create menus
create qr code using cloud function, url -> menu/Id
    needs to create a new page and extact all the component from [restaurantName]/page 
store the qr in firestore or something like that.


