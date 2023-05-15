
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Flex, SimpleGrid, Button } from "@chakra-ui/react"
import { Card } from '../Home/Card';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist } from '../../redux/products/actions';
import empty from "./empty.png"
import "./WishList.css"

const WishList = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let data = useSelector((store) => {
        return store.ProductReducer.wishlist
    })

    useEffect(() => {
        document.title = "Sugar Cosmetics - Wishlist"
        window.scroll(0, 0);
        dispatch(get_wishlist);
    }, [])


    return (
        <Flex w="100%" h={data.length <= 3 ? "100px" : "auto"} justifyContent="center">

            {data.length ?
                <>
                    <SimpleGrid w="95%" columns={[1, 2, 2, 3]}>
                        {data.map((element, id) => {
                            return <Card status={true} product={element} key={id} />
                        })}
                    </SimpleGrid>
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

        </Flex>
    )
}

export { WishList }
