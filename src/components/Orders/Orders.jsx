import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flex, Heading, Image, Text, Button, Spinner } from "@chakra-ui/react";

const Orders = () => {

    const navigate = useNavigate();
    const [orders, set_orders] = useState([]);
    const [loading, set_loading] = useState(true);

    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const load = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            set_orders(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = "Sugar Cosmetics - Orders"
        window.scroll(0, 0);
        load();

        if (orders.length > 0) {
            set_loading(false);
        } else {
            setTimeout(() => {
                set_loading(false);
            }, 3000);
        }
    }, [])

    return (
        <Flex w="100%" alignItems="center" p="30px" direction="column">

            {orders.length ?

                <>
                    <Heading fontWeight="bold"> All Orders </Heading>

                    <Flex direction="column" alignItems="center" mt="50px" w={["100%", "100%", "98%", "98%"]} gap="10px">
                        {orders.map(({ orderId, amount, delivery, products }, id) => {
                            return (
                                <Flex key={id} border="1px solid #f2f2f2" w="100%" borderRadius="10px" direction="column" p="20px" gap="15px">

                                    <Flex justifyContent="space-between">
                                        <Heading fontSize={["12px", "12px", "15px", "15px"]}>
                                            Order id : <span style={{ fontWeight: "lighter" }}> {orderId} </span>
                                            <Text mt="5px" color="#38A169" fontWeight="medium"> Expected Delivery : {delivery} </Text>
                                        </Heading>
                                        <Heading fontSize={["25px", "25px", "35px", "35px"]}> ₹{amount} </Heading>
                                    </Flex>

                                    <Flex w="100%" direction="column" gap="10px">
                                        {products.map(({ Title, images, category, _id }, id) => {
                                            return (
                                                <Flex
                                                    key={id}
                                                    bgColor="#f2f2f2"
                                                    borderRadius="10px"
                                                    p="10px" gap="10px"
                                                    cursor="pointer"
                                                    onClick={() => { navigate(`/collections/${category}/${_id}`) }}
                                                >
                                                    <Image src={images[0]} w={10} h={50} borderRadius="7px" />
                                                    <Text fontSize={["12px", "12px", "15px", "15px"]}> {Title} </Text>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>


                                </Flex>
                            )
                        })}
                    </Flex>
                </>

                :

                <>

                    {loading ?
                        <>
                            <Flex minH="60vh" justifyContent="center" alignItems="center">
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='pink.500'
                                    size='xl'
                                />
                            </Flex>
                        </>
                        :
                        <>
                            <Flex mt="50px" justifyContent="center" direction="column" pb="55px" alignItems="center" width="100%" borderRadius="15px" h="650px" boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
                                <Image src="/order_empty.jfif" />
                                <Text fontWeight="medium"> Order Empty </Text>
                                <Text fontWeight="medium" opacity="70%"> What! No order yet? Get going already! </Text>
                                <Button
                                    variant="ghost" p="22px" bg="black"
                                    colorScheme="black" color="white"
                                    mt="20px"
                                    onClick={() => { navigate("/") }}
                                > SHOP NOW </Button>
                            </Flex>

                        </>

                    }


                </>
            }
        </Flex>
    )
}

export { Orders }
