
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, SimpleGrid, Button, Box } from "@chakra-ui/react";
import { ProductSkeleton } from '../Skeletons/ProductSkeleton';
import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';

const WishList = () => {

    let navigate = useNavigate();

    const [wishlist, set_wishlist] = useState(null);

    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const load = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            let { data } = await response.json();
            set_wishlist(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        load();
        window.scroll(0, 0);
        document.title = "Sugar Cosmetics - Wishlist"
    }, [])


    return (
        <Box w="100%" mt="20px" pb="50px">
            {wishlist ? (
                wishlist.length ? (
                    <SimpleGrid w="90%" columns={[2, 2, 2, 3]} gap="20px" m="auto">
                        {wishlist.map((element, id) => {
                            return <Card product={element} reload={load} status={true} key={id} />
                        })}
                    </SimpleGrid>
                ) : (
                    <Flex
                        mt="50px" pb="55px"
                        justifyContent="center"
                        alignItems="flex-end"
                        w="96%" h="450px"
                        borderRadius="15px"
                        bgImage={'/empty.png'}
                        bgPosition="center"
                        boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
                    >
                        <Button
                            variant="ghost" p="22px" bg="black"
                            colorScheme="black" color="white"
                            onClick={() => { navigate("/") }}
                        > FILL IT UP </Button>
                    </Flex>
                )

            ) : (
                <Flex justifyContent={'center'} w={'100%'} >
                    <ProductSkeleton />
                </Flex>
            )}

        </Box>
    )
}

export { WishList }
