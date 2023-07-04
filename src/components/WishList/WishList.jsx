
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, SimpleGrid, Button, Box, Spinner } from "@chakra-ui/react";
import { ProductSkeleton } from '../ProductSeleton/ProductSkeleton';
import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist } from '../../redux/products/actions';
import empty from "./empty.png"

const WishList = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [loading, set_loading] = useState(true);

    let data = useSelector((store) => {
        return store.ProductReducer.wishlist
    })

    useEffect(() => {
        document.title = "Sugar Cosmetics - Wishlist"
        window.scroll(0, 0);
        dispatch(get_wishlist);

        if (data.length > 0) {
            set_loading(false)
        } else {
            setTimeout(() => {
                set_loading(false);
            }, 3000);
        }
    }, [])


    return (
        <Box w="100%" justifyContent="center" mt="20px" pb="50px">

            {data.length ?
                <>
                    <SimpleGrid w="90%" columns={[2, 2, 2, 3]} gap="20px" m="auto">
                        {data.map((element, id) => {
                            return <Card product={element} status={true} key={id} />
                        })}
                    </SimpleGrid>
                </>

                :

                <>
                    {loading ?
                        <>
                            <ProductSkeleton />
                            {/* <Flex minH="60vh" justifyContent="center" alignItems="center">
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='pink.500'
                                    size='xl'
                                />
                            </Flex> */}
                        </>
                        :
                        <>
                            <Flex mt="50px" justifyContent="center" pb="55px" alignItems="flex-end" width="96%" borderRadius="15px" h="450px" bgImage={empty} bgPosition="center" boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
                                <Button
                                    variant="ghost" p="22px" bg="black"
                                    colorScheme="black" color="white"
                                    onClick={() => { navigate("/") }}
                                > FILL IT UP </Button>
                            </Flex>
                        </>

                    }

                </>
            }

        </Box>
    )
}

export { WishList }
