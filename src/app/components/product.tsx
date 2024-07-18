'use client'

import { Box, Flex, Heading, Spacer, Image, Text, Card, Button, CardBody, CardFooter, Stack, Badge} from "@chakra-ui/react";

const Product = ({product} : any) => {
  return (
    //i need to put the image at the end of the card

    <>
      <Card
        margin={2}
        display={'flex'}
        direction={{ base: 'row', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Stack>
          <CardBody>
            <Heading size='md'>{product.name}</Heading>
            <Text py='2'>
              {product.description}
            </Text>
          </CardBody>
          <CardFooter>
            <Box borderRadius='md' bg='tomato' color='white' px={2} py={1} >
             $ {product.price}
            </Box>
          </CardFooter>
        </Stack>
        <Spacer/>
        <Image
          objectFit='cover'
          width={{ base: '30%', sm: '200px' }}
          height={{ base: '30%', sm: '200px' }}
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          alt='Caffe Latte'
        />
      </Card>
    </>
  );
}

export default Product;