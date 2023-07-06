import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flex, Heading, Image, Text, Button, Skeleton } from "@chakra-ui/react";
import { OrderCard } from "../OrderCard/OrderCard";

const Orders = () => {

    const navigate = useNavigate();
    const [orders, set_orders] = useState([]);
    const [loading, set_loading] = useState(false);

    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const load = async () => {

        set_loading(true);

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

        set_loading(false);
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
        <Flex w="100%" alignItems="center" p="20px" direction="column">

            {orders.length ? (
                <>
                    <Heading fontWeight="bold"> All Orders </Heading>

                    <Flex direction="column" alignItems="center" mt="50px" w={["100%", "100%", "98%", "98%"]} gap="10px">
                        {orders.map((order, idx) => {
                            return (
                                <OrderCard order={order} key={idx} />
                            )
                        })}
                    </Flex>
                </>) : (

                loading ? (
                    <Flex direction="column" alignItems="center" mt="50px" w={["100%", "100%", "98%", "98%"]} gap="10px">
                        <Skeleton h={40} w={'100%'} borderRadius="10px" fadeDuration={1} />
                        <Skeleton h={40} w={'100%'} borderRadius="10px" fadeDuration={1} />
                        <Skeleton h={40} w={'100%'} borderRadius="10px" fadeDuration={1} />
                        <Skeleton h={40} w={'100%'} borderRadius="10px" fadeDuration={1} />
                    </Flex>
                ) : (
                    <Flex mt="50px" pb="55px"
                        justifyContent="center"
                        direction="column"
                        alignItems="center"
                        width="100%" h="650px"
                        borderRadius="15px"
                        boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
                    >

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
                )

            )}
        </Flex >
    )
}

export { Orders }
