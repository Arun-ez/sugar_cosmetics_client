import no_results from "./no_results.png"
import React from 'react'
import { Card } from '../Card/Card';
import { useEffect, useState } from 'react'
import { useQuery } from '../../unils/useQuery';
import { CardCarousel } from "../CardCarousel/CardCarousel";
import { Spinner } from "@chakra-ui/react";
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Radio,
    RadioGroup,
    Image
} from '@chakra-ui/react';
import { useDispatch } from "react-redux";

const Search = () => {
    let [data, setData] = useState([]);
    let [sort_param, set_sort_param] = useState("");
    const dispatch = useDispatch();
    let query = useQuery();

    const load = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/search/${query}`);
            let base = await response.json();
            setData(base.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = "Sugar Cosmetics - Search"
        load();
        window.scrollTo(0, 0);
    }, [query, sort_param]);

    return (
        <Box>
            {data.length ?
                <>
                    <Flex pl="20px" h="50px" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;" gap="5px">
                        <Text opacity="70%"> search results for </Text>
                        <Text opacity="70%" textDecoration="underline"> {query} </Text>
                    </Flex>

                    <Flex>
                        <Flex pl="20px" display={["none", "none", "flex", "flex"]} w="35%" direction="column" alignItems="center" whiteSpace="nowrap">
                            <Accordion allowMultiple={true} w="100%" display="flex" flexDirection="column" alignItems="center">
                                <AccordionItem w="80%" minW="200px" borderRadius="7px" border="none" mt="20px" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px">
                                    <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                        <AccordionButton h="25px" display="flex" justifyContent="space-between">
                                            <Flex pl="5px" alignItems="center" gap="10px">
                                                <Heading as="h1" fontSize="16px"> Sort By : </Heading>
                                                <Text> Relevance </Text>
                                            </Flex>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>

                                    <AccordionPanel>
                                        <RadioGroup onChange={set_sort_param} value={sort_param}>
                                            <Flex borderTop="1px solid whitesmoke" gap="5px" direction="column" alignItems="left" w="100%" pt="8px" fontWeight="md">
                                                <Radio colorScheme="pink" value=""> Relevance </Radio>
                                                <Radio colorScheme="pink" value="&_sort=Price&_order=desc"> Price: High To Low </Radio>
                                                <Radio colorScheme="pink" value='&_sort=Price&_order=asc'> Price: Low To High </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>

                            <Flex direction="column" borderRadius="7px" alignItems="center" mt="20px" width="80%" minW="200px" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px">
                                <Flex justifyContent="space-between" w="100%" alignItems="center" p="25px" h="50px">
                                    <Heading as="h1" fontSize="17px"> Filter </Heading>
                                    <Text color="#fc2779"> Reset </Text>
                                </Flex>
                                <Accordion allowMultiple={true} w="100%" display="flex" flexDirection="column" alignItems="center">
                                    <AccordionItem w="95%" mt="10px">
                                        <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                            <AccordionButton h="25px" display="flex" justifyContent="space-between">
                                                <Flex alignItems="center" gap="10px">
                                                    <Heading as="h1" fontSize="17px"> Product Type </Heading>
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>

                                        <AccordionPanel>

                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem w="95%" mt="10px">
                                        <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                            <AccordionButton h="25px" display="flex" justifyContent="space-between">
                                                <Flex alignItems="center" gap="10px">
                                                    <Heading as="h1" fontSize="17px"> Feature </Heading>
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>

                                        <AccordionPanel>

                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem w="95%" mt="10px">
                                        <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                            <AccordionButton h="25px" display="flex" justifyContent="space-between">
                                                <Flex alignItems="center" gap="10px">
                                                    <Heading as="h1" fontSize="17px"> Finish </Heading>
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>

                                        <AccordionPanel>

                                        </AccordionPanel>
                                    </AccordionItem>

                                    <AccordionItem w="95%" mt="10px">
                                        <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                            <AccordionButton h="25px" display="flex" justifyContent="space-between">
                                                <Flex alignItems="center" gap="10px">
                                                    <Heading as="h1" fontSize="17px"> Formulation </Heading>
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>

                                        <AccordionPanel>

                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Flex>

                        </Flex>

                        <Flex w="100%" justifyContent="center" mt="20px">
                            {data.length ?
                                <>
                                    <SimpleGrid w="90%" columns={[2, 2, 2, 3]} gap="20px">
                                        {data.map((element, id) => {
                                            return <Card product={element} key={id} />
                                        })}
                                    </SimpleGrid>
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

                    </Flex>

                </>

                :

                <>
                    <Image boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" borderRadius="15px" m="auto" mt="200px" src={no_results} />
                    <br />

                    <CardCarousel headingColor="black" type="seller"> BESTSELLERS </CardCarousel>

                    <CardCarousel headingColor="black" type="eyes"> JUST-IN </CardCarousel>
                </>


            }
        </Box>
    )
}

export { Search }
