import React, { useState, } from "react";
import { MenuList,MenuItem,MenuDivider,Text,useDisclosure, Box } from "@chakra-ui/react";
import { MdAdd } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { useDispatch } from "react-redux";
import { set_Authentication } from "../../Redux/Authentication/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function Menubar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [slide,setSlide] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setSlide(true);
    setIsModalOpen(true);
  };

  const HandleLogout = () =>{
        dispatch(set_Authentication({
            name:"",
            isAuthenticated:"false",


        }))
        localStorage.clear();

        navigate('/login')
        setIsModalOpen(false);
        
  }




  return (
    <>
    <MenuList fontSize="md" zIndex={5} >
    <MenuItem icon={<MdAdd />}  >

      <Text color={'black'}>Profile</Text>
    </MenuItem>
    <MenuDivider />
    <MenuItem icon={<AiOutlineArrowRight />} onClick={handleModal}>
      <Text  color={'red'}  >Logout</Text>
    </MenuItem>
  </MenuList>

  <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="md" style={{overflow: 'hidden' }}> 
      <Modal.Header closeButton>
        <Modal.Title>ZORPIA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to Logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={HandleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
      </>
  )
}

export default Menubar;
