import { Flex, Heading, Text, Image, HStack, Button, Box, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { OrderStepper } from "../OrderStepper/OrderStepper";

import { CheckCircleIcon, CalendarIcon } from '@chakra-ui/icons';
import { useState } from "react";

const OrderCard = ({ order: { order_id, ordered_on, amount, delivered_on, products, status } }) => {

    const navigate = useNavigate();

    const [show, set_show] = useState(false);

    return (
        <Flex
            border="1px solid #f2f2f2"
            w="100%" borderRadius="10px"
            direction="column"
            p="20px" gap="15px"
        >

            <Flex justifyContent="space-between">
                <Heading fontSize={["12px", "12px", "15px", "15px"]}>
                    Order id : <span style={{ fontWeight: "lighter" }}> {order_id} </span>
                    <Text mt="5px" color={'green.600'} fontWeight="medium"> Ordered On : {ordered_on} </Text>
                </Heading>
                <Heading fontSize={["25px", "25px", "32px", "32px"]} color={'gray.700'} > ₹{amount} </Heading>
            </Flex>

            <Box h={show ? 'auto' : 0} overflowY={'hidden'}>
                <OrderStepper active={status} />

                <SimpleGrid w="100%" columns={[1, 1, 2, 2]} gap="10px" >
                    {products.map(({ title, images, category, _id, price }, idx) => {
                        return (
                            <Flex
                                key={idx}
                                bgColor="#f2f2f2"
                                borderRadius="10px"
                                p="10px" gap="10px"
                                cursor="pointer"
                                onClick={() => { navigate(`/collections/${category}/${_id}`) }}
                            >
                                <Image src={images[0]} w={10} h={50} borderRadius="7px" />
                                <Text fontSize={["12px", "12px", "15px", "15px"]}>
                                    {title}
                                    <br />
                                    <b style={{ fontWeight: "500" }}> ₹{price} </b>
                                </Text>
                            </Flex>
                        )
                    })}
                </SimpleGrid>

            </Box>

            <Flex height={10} w={'100%'} justifyContent={'space-between'}>

                <Button
                    fontSize={[12, 12, 14, 16]}
                    bg={'gray.800'}
                    _hover={'none'}
                    color={'white'}
                    justifySelf={'flex-end'}
                    onClick={() => { set_show(!show) }}
                >
                    {show ? 'Close' : 'View Details'}
                </Button>

                {(status === 3) && (
                    <Flex
                        direction={['column', 'column', 'row', 'row']}
                        justifyContent={'flex-end'} gap={[1, 1, 6, 6]}
                        fontSize={[12, 12, 16, 16]} fontWeight={'medium'}
                    >
                        <HStack> <CheckCircleIcon color={'green.300'} /> <Text> Delivered </Text> </HStack>
                        <HStack> <CalendarIcon color={'blue.300'} /> <Text> {delivered_on}  </Text> </HStack>
                    </Flex>
                )}


            </Flex>
        </Flex>
    )
}

export { OrderCard }
