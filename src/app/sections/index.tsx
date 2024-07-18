import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { CloseButton, Flex, Spacer, Box, List, ListItem, Stack, Heading, Text, CardFooter, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import SectionModal from './SectionModal'
import { useState } from 'react';
import Section from './Section';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const Sections = ({menu, onGetMenu}:any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [idSectionForEdit, setIdSectionForEdit] = useState();


  const edit = (id:any) => {
    setIdSectionForEdit(id)
    openModal()
  }

  const deleteSection = async (id:any) => {
    const db = getFirestore(firebase_app);

    try {
      const menuDocRef = doc(db, 'menus', menu.id);
      const array = menu.sections;

      // Find the index of the object to update
      const newSections = array.filter((item:any) => item.id !==  id);

      // Update the document with the modified array
      await updateDoc(menuDocRef, {
        sections: newSections
      });   
      onGetMenu()
      console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return(
    <>
      <Flex direction={'column'}>   
          <Button
            justifyContent={'center'}
            margin={'2'}
            width={['45%','30%']}
            onClick={openModal}>
              Agregar Seccion
          </Button>      
        <List  display="flex" flexDirection={'column'}>
          {menu.sections.map((section:any) => (
          <ListItem margin={2} display="flex" width={'100%'} justifyContent={'center'} key={section.id}>
            <Section width={['90%','90%','70%','70%']}  onEdit={edit} onDelete={deleteSection} section={section}/> 
          </ListItem>
          ))} 
        </List>
      </Flex>
      <SectionModal isOpen={isOpen} close={closeModal} menu={menu} idSection={idSectionForEdit} />
    </>
  )
}

export default Sections;
