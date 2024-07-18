import firebase_app from '@/firebase/config';
import { Button, FormControl, Input, Flex } from '@chakra-ui/react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Field, Form, Formik } from 'formik';
import React from 'react';


const FormMenu = ({menu, menuId}:any) => {


  const handleSubmit = async (values :any) => {
    try {
        console.log(menu)
        const db = getFirestore(firebase_app);
        const menuDocRed = doc(db, 'menus', menuId);
        await updateDoc(menuDocRed, values);   
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  };
  
  return (
    <Flex marginLeft={2}>
        <Formik
        initialValues={{ 
          name: menu.name,
          type: '',
          description: menu.description,
        }}
        onSubmit={handleSubmit}
      >
          {(formik) => (

        <Form >
              <FormControl margin={2}>
                <Field as={Input}  name="name" type="text" placeholder="Nombre" />
              </FormControl>
              <FormControl margin={2}>
                <Field as={Input}  name="description" placeholder="Descripcion"/>
              
              </FormControl>
          <Button margin={2} type='submit' color="orange" variant={'solid'}>
            Guardar
          </Button>
        </Form>
          )}
      </Formik>
    </Flex>
  );
};

export default FormMenu;
function firestore() {
  throw new Error('Function not implemented.');
}

