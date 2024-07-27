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


 La solucion definitiva es esta:

Esto es lo que deben hacer (es muy 🥴):

En tu cuenta personal de MP creas una Integracion y dentro de esa integracion se crean 2 users de prueba.
Ir a mercadopago.cl o .ar (depende de tu pais) y se inicia sesion con cada uno de los users de prueba (distintos navegadores)
Crear un plan en el user de prueba 1.
En el user de prueba 1 se crea otra integracion y se usan las credenciales de PRODUCCION.
Ir al mercado pago de user de prueba 2 y copiar su email.
Usar ese email para suscribirse al plan del user 1.
La api te retornará un json con una URL de checkout.
Ir a esa url con el user de prueba 2
confirmar suscripcion