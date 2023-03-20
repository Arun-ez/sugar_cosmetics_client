import no_results from "./no_results.png"
import React from 'react'
import { Card } from '../Home/Card';
import { useEffect, useState } from 'react'
import { useQuery } from '../../useQuery';
import { HomeView } from "../Home/HomeView";
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

const Search = () => {
    let [data, setData] = useState([]);
    let [sort_param, set_sort_param] = useState("");
    let query = useQuery();

    let [limit, set_limit] = useState(4);

    const limit_decision = () => {
        let width = window.innerWidth;
        if (width <= 1500 && width > 1180) {
            return 3;
        } else if (width <= 1180 && width > 600) {
            return 2;
        } else if (width <= 600) {
            return 1;
        } else {
            return 4;
        }
    }

    window.onresize = () => {
        set_limit(limit_decision());
    }

    useEffect(() => {
        set_limit(limit_decision());
    }, []);

    const load = async () => {
        try {
            let response = await fetch(`https://rich-pink-anemone-tie.cyclic.app/products?q=${query}${sort_param}`);
            let base = await response.json();
            setData(base);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = "Sugar Cosmetics-Search"
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

                        <Flex w="100%" justifyContent="center">
                            <SimpleGrid w="90%" columns={[1, 2, 2, 3]}>
                                {data.map((element, id) => {
                                    return <Card load={load} product={element} key={id} />
                                })}
                            </SimpleGrid>
                        </Flex>

                    </Flex>

                </>

                :

                <>
                    <Image boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" borderRadius="15px" m="auto" mt="200px" src={no_results} />
                    <br />
                    <HomeView limit={limit} heading="BESTSELLERS" headingColor="black" type="seller" />
                    <HomeView limit={limit} heading="JUST-IN" headingColor="black" type="accessories" />
                </>


            }
        </Box>
    )
}

export { Search }
