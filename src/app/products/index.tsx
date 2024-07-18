import React,{useEffect, useState}  from 'react'
import ProductModal from './productModal';
import { CardBody, Flex, Spacer, Box, List, ListItem, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import Product from './Product';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const Products = ({menu, onRefreshMenu}:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([])
  const [productForEdit, setProductForEdit] = useState<any>(null);
  const changeIsOpenModal = () => {
    console.log('new product')
    setProductForEdit(null)
    setIsOpen(!isOpen);
  }
  
  const handleRefreshProducts = () => {
    console.log("refresh")
    onRefreshMenu()
  }
  const deleteProduct = async (product : any) => {
    const db = getFirestore(firebase_app);

    try {
        //const newSections = clonedSections.filter((item:any) => item.id !==  id);

        const menuDocRef = doc(db, 'menus', menu.id);
        const newSections = menu.sections;

        // Find the index of the object to update
        console.log("product", product)
        const index = newSections.findIndex((item:any) => item.id === product.section);
    
        const products = menu.sections[index].products.filter((item:any)=> item.id !== product.id)
          
        newSections[index] = { ...newSections[index], products: products };
        // Update the document with the modified array
        await updateDoc(menuDocRef, {
          sections: newSections
        });   
        console.log('Document updated successfully!');
        onRefreshMenu()
      console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  }

  const editProduct = (product:any) => {
    console.log("product", product)
    setProductForEdit(product)
    setIsOpen(true)
  }
  
  const openModal=()=>{
    setIsOpen(true)
  }

  useEffect(() => {
    let newProducts :any= []
    menu.sections.forEach((section :any) => {
      newProducts = newProducts.concat(section.products) 
    });

    setProducts(newProducts)
  }, [menu])

  return(
    <>
      <CardBody>
        <Heading as='h2' size='md'>Productos</Heading>
      </CardBody>
      <Flex direction={'column'}> 
        <Button 
          justifyContent={'center'}
          margin={'2'}
          width={['45%','30%']}
          onClick={changeIsOpenModal}
          color="orange" variant="solid" >
          Nuevo Productos
        </Button>
        {(products.length > 0) ? 
        <List display="flex" flexDirection={'column'}>
          {products.map((product:any) => (
          <ListItem  margin={2} display="flex" width={'100%'} justifyContent={'center'} key={product.id}>
            <Product width={['90%','90%','70%','70%']}  onEdit={editProduct} onDelete={deleteProduct} product={product}/> 
          </ListItem>
          ))} 
        </List> :
        <label> no hay productos</label>
        }
      </Flex>
      <ProductModal 
        product={productForEdit} 
        isOpen={isOpen} 
        close={changeIsOpenModal}  
        refreshList={handleRefreshProducts}  
        menu={menu}/>
    </>
  )
}

export default Products;
