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

----suscriptions-------
todo
  el token de acceso a la api no puede estar en el back


mepa---
codea que el cliente solicite un token para hacer la transacion
con ese token crear un suscripcion a un plan

hacer una tabla de suscripcciones
  userId
  suscriptionsId

si no tiene suscripcion vigente mostrar el coso de mercado pago

implementar formulario para genera el card_token
 con checkout bricks

 crear el plan

 https://github.com/mercadopago/sdk-react