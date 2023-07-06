import { AddressPicker } from '../AddressPicker/AddressPicker';
import { useState, useEffect } from 'react';
import { Flex, Box, SimpleGrid, useDisclosure, Text, Heading, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify';


const Address = () => {

    const [patch_id, set_patch_id] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [prefill, set_prefill] = useState({
        firstName: "",
        lastName: "",
        number: "",
        flat_no: "",
        locality: "",
        pincode: "",
        state: "",
        city: ""
    })

    const [loading, set_loading] = useState(false);
    const [data, set_data] = useState([]);
    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const notify = (message) => {
        toast(message);
    }

    const load = async () => {

        set_loading(true);

        try {
            let resposne = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            let base = await resposne.json();
            set_data(base.data);
        } catch (error) {
            console.log(error)
        }

        set_loading(false);
    }

    const trigger_edit = (data, id) => {
        set_prefill(data);
        set_patch_id(id);
        onOpen();
    }

    const trigger_delete = async (id) => {
        try {
            let resposne = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            load();
            notify("Address Deleted Successfully");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        load();
        setTimeout(() => {
            set_loading(false);
        }, 3000)
    }, [])

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
                    onClick={() => {
                        set_prefill({ firstName: "", lastName: "", number: "", flat_no: "", locality: "", pincode: "", state: "", city: "" });
                        set_patch_id(null);
                        onOpen();
                    }}
                    cursor="pointer"
                > ADD NEW ADDRESS </Flex>
            </Flex>

            <AddressPicker reload={load} isOpen={isOpen} onClose={onClose} prefill={prefill} id={patch_id} />

            <Flex width="100%" mt="30px" justifyContent="center">

                {data.length ? (
                    <SimpleGrid columns={[1, 1, 2, 2]} w="90%" gap="20px">
                        {data.map(({ name, number, flatno, locality, pincode, city, state, _id }, idx) => {
                            return (
                                <Flex key={idx} direction="column" boxShadow="0 2px 5px rgba(0,0,0,.1)" py={4} px={6} borderRadius="10px">

                                    <Flex w="100%" justifyContent="space-between">
                                        <Text fontWeight="medium"> {name} </Text>
                                        <Flex fontSize="18px" gap="20px" color="#757575">
                                            <MdOutlineModeEditOutline cursor="pointer" onClick={() => { trigger_edit({ firstName: name.split(" ")[0], lastName: name.split(" ")[1], number: number, flat_no: flatno, locality: locality, pincode: pincode, state: state, city: city }, _id) }} />
                                            <RiDeleteBinLine cursor="pointer" onClick={() => { trigger_delete(_id) }} />
                                        </Flex>
                                    </Flex>

                                    <Flex direction="column" mt={2}>
                                        <Text fontSize="14px" fontWeight="medium" color="#757575"> {flatno} </Text>
                                        <Text fontSize="14px" fontWeight="medium" color="#757575"> {locality} </Text>
                                        <Text fontSize="14px" fontWeight="medium" color="#757575"> {`${city}, ${state}, ${pincode}`} </Text>
                                        <Text fontSize="14px" fontWeight="medium" color="#757575"> {`Phone Number ${number}`} </Text>

                                    </Flex>

                                </Flex>
                            )
                        })}
                    </SimpleGrid>) : (

                    loading ? (
                        <SimpleGrid columns={[1, 1, 2, 2]} w="90%" gap="20px">
                            <Skeleton w={'100%'} h={40} borderRadius="10px" />
                            <Skeleton w={'100%'} h={40} borderRadius="10px" />
                            <Skeleton w={'100%'} h={40} borderRadius="10px" />
                            <Skeleton w={'100%'} h={40} borderRadius="10px" />
                        </SimpleGrid>
                    ) : (
                        <Heading> No Addresses Found </Heading>
                    )

                )}

            </Flex>



        </Box >
    )
}

export { Address }
