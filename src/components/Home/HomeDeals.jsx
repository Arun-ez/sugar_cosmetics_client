import React, { useState } from 'react'
import { Box, Flex, Heading } from "@chakra-ui/react"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { Deal } from './Deal'

const HomeDeals = ({ heading, headingColor, data, limit }) => {

    let [start, set_start] = useState(0);
    let [btn_visibility, set_btn_visibilty] = useState("rgba(0, 0, 0, 0.6)")

    const handle_next = () => {

        if (start + limit + limit <= data.length) {
            set_start(start + limit);
        } else {
            set_start(0);
        }
    }

    const handle_prev = () => {

        if (start - limit >= 0) {
            set_start(start - limit);
        } else {
            set_start(data.length - limit);
        }
    }

    const get_in_range = () => {
        let arr = [];

        for (let i = start; i < start + limit; i++) {
            arr.push(data[i]);
        }

        return arr;
    }

    return (
        <Flex direction="column">
            <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color={headingColor}> {heading} </Heading>
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
            </Flex>

            <Flex h={["200px", "250px", "300px", "400px"]}>
                <Flex w="100%" justifyContent="space-around" pl="40px" pr="40px">

                    {data ?
                        <>
                            {get_in_range().map((image, id) => {
                                return <Deal image_src={image} key={id} />
                            })}
                        </>

                        :

                        <>
                        </>

                    }
                </Flex>

                <Flex pl="150px" pr="150px" w="100%" h={["200px", "250px", "300px", "400px"]} justifyContent="space-between" alignItems="center" position="absolute">
                    <MdArrowBackIos
                        onMouseOver={() => { set_btn_visibilty("rgba(0, 0, 0, 0.8)") }}
                        onMouseLeave={() => { set_btn_visibilty("rgba(0, 0, 0, 0.6)") }}
                        onClick={handle_prev}
                        style={{
                            backdropFilter: "blur(5px)",
                            backgroundColor: btn_visibility,
                            color: "white",
                            fontSize: "30px",
                            padding: "7px",
                            borderRadius: "50%"
                        }}
                    />
                    <MdArrowForwardIos
                        onMouseOver={() => { set_btn_visibilty("rgba(0, 0, 0, 0.8)") }}
                        onMouseLeave={() => { set_btn_visibilty("rgba(0, 0, 0, 0.6)") }}
                        onClick={handle_next}
                        style={{
                            backdropFilter: "blur(5px)",
                            backgroundColor: btn_visibility,
                            color: "white",
                            fontSize: "30px",
                            padding: "7px",
                            borderRadius: "50%"
                        }}
                    />
                </Flex>

            </Flex>


        </Flex>
    )
}

export { HomeDeals }
