import { useRef } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, Input, ModalFooter, ModalBody, ModalCloseButton, SimpleGrid, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddressPicker = ({ reload, isOpen, onClose, prefill, id }) => {

    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const fName = useRef(null);
    const lName = useRef(null);
    const phNumber = useRef(null);
    const flatNo = useRef(null);
    const locality = useRef(null);
    const pincode = useRef(null);
    const state = useRef(null);
    const city = useRef(null);

    const notify = (message) => {
        toast(message);
    }

    const onPatch = async (data) => {
        try {
            let resposne = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            reload();
            onClose();
            notify("Changes updated");
        } catch (error) {
            console.log(error)
        }
    }

    const onSave = async (data) => {

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            reload();
            onClose();
            notify("Address added Successfully");
        } catch (err) {
            console.log(err);
        }
    }

    const input_handler = () => {

        const refs = [fName, lName, phNumber, flatNo, locality, pincode, state, city];

        let status = true;

        refs.forEach(({ current }) => {

            if (current.value === "") {
                status = false;
                current.style.border = "1px solid red"
            } else {
                current.style.border = ""
            }
        })

        if (!status) {
            return;
        }

        const details = {
            name: fName.current.value.trim() + " " + lName.current.value.trim(),
            number: phNumber.current.value,
            flatno: flatNo.current.value,
            locality: locality.current.value,
            pincode: pincode.current.value,
            city: city.current.value,
            state: state.current.value
        }

        if (!id) {
            onSave(details);
        } else {
            onPatch(details);
        }

    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset='slideInBottom'
            size="3xl"

        >
            <ModalOverlay />
            <ModalContent borderRadius="10px" mt={60}>
                <ModalHeader
                    bg="#f2f2f2"
                    borderTopRadius="10px"
                    display="flex"
                    alignItems="center"
                    py={3}
                    px={6}
                    fontSize={16}
                    fontWeight="bold"
                >
                    Add New Address
                    <ModalCloseButton top={1} />
                </ModalHeader>

                <ModalBody p={6} mt={4}>
                    <SimpleGrid columns={[1, 2, 2, 2]} rowGap={4} columnGap={2} >
                        <Input type='text' ref={fName} defaultValue={prefill.firstName} placeholder='First name' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input type='text' ref={lName} defaultValue={prefill.lastName} placeholder='Last name' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input type='number' ref={phNumber} defaultValue={prefill.number} placeholder='Phone Number' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input ref={flatNo} defaultValue={prefill.flat_no} placeholder='Flat/House Number' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                    </SimpleGrid>

                    <Input ref={locality} defaultValue={prefill.locality} placeholder='Appartment/Area/Locality/Road' mt={4} _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />

                    <Flex mt={4} gap={2} >
                        <Input type='number' ref={pincode} defaultValue={prefill.pincode} placeholder='Pincode' w={["100%", "35%", "35%", "35%"]} _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Flex bg="black" color="white" cursor="pointer" whiteSpace="nowrap" fontWeight="medium" py={2} px={2} justifyContent="center" borderRadius={8} w="120px">
                            GET DETAILS
                        </Flex>
                    </Flex>

                    <SimpleGrid columns={[1, 2, 2, 2]} rowGap={4} columnGap={2} mt={4} >
                        <Input ref={state} defaultValue={prefill.state} placeholder='State' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input ref={city} defaultValue={prefill.city} placeholder='City' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                    </SimpleGrid>

                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Flex
                        bg="black"
                        color="white"
                        whiteSpace="nowrap"
                        fontWeight="medium"
                        py={2} px={4}
                        borderRadius={8}
                        cursor="pointer"
                        onClick={input_handler}
                    >
                        SAVE AND CONTINUE
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export { AddressPicker }