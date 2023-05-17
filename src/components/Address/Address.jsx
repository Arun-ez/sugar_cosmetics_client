import { AddressPicker } from '../AddressPicker/AddressPicker';
import { useState, useEffect } from 'react';
import { Flex, Box, SimpleGrid, useDisclosure, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Address = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading, set_loading] = useState(true);
    const [data, set_data] = useState([]);
    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const load = () => {

    }

    return (
        <Box width="100%">
            <Flex h="50px" w="100%" justifyContent="flex-end" alignItems="flex-end" mt="20px" pr="30px">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    w="180px" bg="black"
                    p="10px" fontWeight="400"
                    color="white" fontSize="14px"
                    letterSpacing="2px"
                    borderRadius="5px"
                    onClick={onOpen}
                    cursor="pointer"
                > ADD NEW ADDRESS </Flex>
            </Flex>

            <AddressPicker isOpen={isOpen} onClose={onClose} />

            <SimpleGrid>

            </SimpleGrid>

        </Box>
    )
}

export { Address }
