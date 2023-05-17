import { useRef } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, Input, Button, ModalFooter, ModalBody, ModalCloseButton, SimpleGrid, Flex } from '@chakra-ui/react';

const AddressPicker = ({ isOpen, onClose }) => {

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
                        <Input placeholder='First name' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input placeholder='Last name' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input placeholder='Phone Number' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input placeholder='Flat/House Number' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                    </SimpleGrid>

                    <Input placeholder='Flat/House Number' mt={4} _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />

                    <Flex mt={4} gap={2} >
                        <Input placeholder='Pincode' w={["100%", "35%", "35%", "35%"]} _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Flex bg="black" color="white" cursor="pointer" whiteSpace="nowrap" fontWeight="medium" py={2} px={2} justifyContent="center" borderRadius={8} w="120px">
                            GET DETAILS
                        </Flex>
                    </Flex>

                    <SimpleGrid columns={[1, 2, 2, 2]} rowGap={4} columnGap={2} mt={4} >
                        <Input placeholder='State' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                        <Input placeholder='City' _placeholder={{ color: "#757575" }} fontSize={17} _focusVisible={false} _hover={{ borderColor: "black" }} />
                    </SimpleGrid>

                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Flex bg="black" color="white" whiteSpace="nowrap" fontWeight="medium" py={2} px={4} borderRadius={8} cursor="pointer">
                        SAVE AND CONTINUE
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export { AddressPicker }