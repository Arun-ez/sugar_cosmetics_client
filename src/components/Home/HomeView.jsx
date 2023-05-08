
import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from "@chakra-ui/react"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { Card } from './Card'
import { Spinner } from '@chakra-ui/react'
import { get_wishlist_status } from '../../redux/products/actions'
import { useSelector } from 'react-redux'

const HomeView = ({ heading, type, headingColor, limit }) => {

    let [data, set_data] = useState(null);
    let [start, set_start] = useState(0);
    let [status, set_status] = useState([]);
    let [button_display, set_button_display] = useState("none")
    let token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    let wishlist = useSelector((store) => {
        return store.ProductReducer.wishlist
    })

    const handle_next = () => {

        if (start + limit + limit < data.length - 1) {
            set_start(start + limit);
        }
    }

    const handle_prev = () => {

        if (start - limit >= 0) {
            set_start(start - limit);
        }
    }

    const get_in_range = () => {
        let arr = [];

        for (let i = start; i < start + limit; i++) {
            arr.push(data[i]);
        }

        return arr;
    }

    const load = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${type}`);
            let base = await response.json();

            if (token) {
                let status_response = await get_wishlist_status(base, token);
                set_status(status_response)
            }

            set_data(base.data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        load();
    }, [type, wishlist, start]);


    return (
        <Flex direction="column" onMouseOver={() => { set_button_display("block") }} onMouseLeave={() => { set_button_display("none") }}>
            <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color={headingColor}> {heading} </Heading>
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
            </Flex>

            <Flex h="450px">

                <Flex w={["20%", "20%", "10%", "10%"]} justifyContent="center" alignItems="center">
                    <MdArrowBackIos onClick={handle_prev}
                        style={{ display: button_display, cursor: "pointer", background: "white", color: "#fc2779", fontWeight: "bold", fontSize: "33px", padding: "5px", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
                </Flex>

                <Flex w="100%" justifyContent="space-around">

                    {data ?
                        <>
                            {get_in_range().map((item, id) => {
                                return <Card product={item} status={status[start + id]} key={id} />
                            })}
                        </>

                        :

                        <>
                            <Spinner
                                mt="150px"
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='pink.500'
                                size='xl'
                            />
                        </>

                    }
                </Flex>

                <Flex w={["20%", "20%", "10%", "10%"]} justifyContent="center" alignItems="center">
                    <MdArrowForwardIos
                        onClick={handle_next}
                        style={{ display: button_display, cursor: "pointer", background: "white", color: "#fc2779", fontSize: "33px", padding: "7px", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
                </Flex>

            </Flex>


        </Flex>
    )
}



export { HomeView };
