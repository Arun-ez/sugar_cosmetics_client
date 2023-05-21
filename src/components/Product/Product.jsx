
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
    RadioGroup
} from '@chakra-ui/react';
import { MdArrowForwardIos } from "react-icons/md"
import { Card } from '../Card/Card';
import { get, sort, filter } from '../../redux/products/actions';
import { Spinner } from '@chakra-ui/react';

const Product = () => {
    let navigate = useNavigate();
    let param = useParams();
    let [sort_param, set_sort_param] = useState("");
    const dispatch = useDispatch();

    const banners = {
        lips: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Lips.jpg",
        eyes: "https://d32baadbbpueqt.cloudfront.net/Collection/5a16ce4f-1b39-48bf-9e5f-42d7dc8e2d66.jpg",
        skincare: "https://d32baadbbpueqt.cloudfront.net/Collection/4335c634-172e-42de-96de-4d01f585d685.jpg",
        face: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Face.jpg",
        seller: "https://d32baadbbpueqt.cloudfront.net/Collection/72d09a6a-2f85-4337-a4d5-b5807ad2c9c6.jpg",
        new: "https://d32baadbbpueqt.cloudfront.net/Collection/6fca01a2-8f3f-465b-a29b-7933fe0d4ccc.jpg",
        accessories: "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9723d8e3-9e99-459f-acfe-4ef93089e9ef.jpg&w=1920&q=75",
        kit: "https://d32baadbbpueqt.cloudfront.net/Collection/dc9fc0b7-9b57-4b8f-ae5c-42a0be0af8fb.jpg"

    }

    const data = useSelector((store) => {
        return store.ProductReducer.data;
    })

    const filter_options = useSelector((store) => {
        return store.ProductReducer.filterBy;
    })

    const statuslist = useSelector((store) => {
        return store.ProductReducer.statuslist;
    })

    const filter_onchange_handler = (id) => {
        let mapped = filter_options.map((elm, idx) => {
            if (idx === id) {

                return {
                    ...elm,
                    checked: !elm.checked
                }
            }

            return elm;
        })

        filter(dispatch, mapped);
    }

    useEffect(() => {
        document.title = param.product[0].toUpperCase() + param.product.slice(1);
        get(dispatch, param.product);
        set_sort_param("");
        window.scrollTo(0, 0);
    }, [param]);

    useEffect(() => {
        sort(dispatch, sort_param);
    }, [sort_param])

    return (
        <Box mb="50px">
            <Flex bgImage={banners[param.product]} h={["auto", "auto", "auto", "270px"]}>
                <Flex w="100%" h="100%" backdropFilter="blur(20px)" justifyContent="center">
                    <img src={banners[param.product]} alt="banner" />
                </Flex>

            </Flex>
            <Flex pl="20px" h="50px" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;" gap="10px">
                <Text opacity="70%" fontSize="15px" cursor="pointer" onClick={() => { navigate("/") }}> Home </Text>
                <MdArrowForwardIos style={{ opacity: "60%", fontSize: "13px" }} />
                <Heading as="h1" fontSize="15px"> {param.product[0].toUpperCase() + param.product.slice(1)} </Heading>
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
                                        <Radio colorScheme="pink" value="price_asc"> Price: Low To High </Radio>
                                        <Radio colorScheme="pink" value="price_dsc"> Price: High To Low </Radio>
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
                                    <Flex direction="column" gap="1px">
                                        {filter_options.map(({ name, checked }, id) => {
                                            return (
                                                <label className='checkbox' key={id}>
                                                    <input
                                                        type="checkbox"
                                                        value={name}
                                                        checked={checked}
                                                        onChange={() => { filter_onchange_handler(id) }}
                                                    />

                                                    {name}
                                                </label>
                                            )
                                        })}
                                    </Flex>
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
                                    return <Card product={element} status={statuslist[id]} key={id} />
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


        </Box>
    )
}

export { Product };
