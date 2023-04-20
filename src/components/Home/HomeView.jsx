
import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from "@chakra-ui/react"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { Card } from './Card'

const HomeView = ({ heading, type, headingColor, limit }) => {

    let [data, set_data] = useState(null);
    let [start, set_start] = useState(0);
    let [button_display, set_button_display] = useState("none")

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
            set_data(base.data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        load();
    }, [type]);


    return (
        <Flex direction="column" onMouseOver={() => { set_button_display("block") }} onMouseLeave={() => { set_button_display("none") }}>
            <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                <Box h="2px" w="50px" bg="#fc2779"></Box>
                <Heading as="h2" fontSize="20px" color={headingColor}> {heading} </Heading>
                <Box h="2px" w="50px" bg="#fc2779"></Box>
            </Flex>

            <Flex h="450px">

                <Flex w="10%" justifyContent="center" alignItems="center">
                    <MdArrowBackIos onClick={handle_prev}
                        style={{ display: button_display, cursor: "pointer", background: "white", color: "#fc2779", fontWeight: "bold", fontSize: "33px", padding: "5px", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
                </Flex>

                <Flex w="100%" justifyContent="space-around">

                    {data ?
                        <>
                            {get_in_range().map((item, id) => {
                                return <Card product={item} category={type} key={id} />
                            })}
                        </>

                        :

                        <>
                        </>

                    }
                </Flex>

                <Flex w="10%" justifyContent="center" alignItems="center">
                    <MdArrowForwardIos
                        onClick={handle_next}
                        style={{ display: button_display, cursor: "pointer", background: "white", color: "#fc2779", fontSize: "33px", padding: "7px", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
                </Flex>

            </Flex>


        </Flex>
    )
}



export { HomeView };
