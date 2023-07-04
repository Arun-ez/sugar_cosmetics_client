
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
    CheckboxGroup,
    Checkbox,
    Skeleton
} from '@chakra-ui/react';
import { MdArrowForwardIos } from "react-icons/md"
import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';

const Product = () => {
    let navigate = useNavigate();
    let param = useParams();

    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const [products, set_products] = useState([]);
    const [filter_options, set_filter_options] = useState([]);
    const [filter, set_filter] = useState([]);
    const [sort, set_sort] = useState('default');
    const [wishlist, set_wishlist] = useState([]);
    const [banner, set_banner] = useState(null);

    const banners = {
        lips: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Lips.jpg",
        eyes: "https://d32baadbbpueqt.cloudfront.net/Collection/5a16ce4f-1b39-48bf-9e5f-42d7dc8e2d66.jpg",
        face: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Face.jpg",
        nails: "https://d32baadbbpueqt.cloudfront.net/Collection/b69b03ce-2d02-4223-a318-33b5abb2be53.gif",
        skincare: "https://d32baadbbpueqt.cloudfront.net/Collection/4335c634-172e-42de-96de-4d01f585d685.jpg",
        seller: "https://d32baadbbpueqt.cloudfront.net/Collection/72d09a6a-2f85-4337-a4d5-b5807ad2c9c6.jpg",
        new: "https://d32baadbbpueqt.cloudfront.net/Collection/6fca01a2-8f3f-465b-a29b-7933fe0d4ccc.jpg",
        accessories: "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9723d8e3-9e99-459f-acfe-4ef93089e9ef.jpg&w=1920&q=75",
        kit: "https://d32baadbbpueqt.cloudfront.net/Collection/dc9fc0b7-9b57-4b8f-ae5c-42a0be0af8fb.jpg"
    }

    const load = async (shoudShow) => {

        if (shoudShow) {
            set_products([]);
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products?category=${param.product}&filter=${filter.join('%')}&sort=${sort}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token || ''}`
                }
            })

            let { data, banner, filters, wishlist } = await response.json();

            set_products(data);
            set_filter_options(filters);
            set_wishlist(wishlist);
            set_banner(banner);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        load(true);
    }, [param, filter, set_sort, token])

    useEffect(() => {
        document.title = param.product[0].toUpperCase() + param.product.slice(1);
        window.scrollTo(0, 0);
        set_banner(null);
    }, [param]);

    return (
        <Box mb="50px">

            {banner && (
                <Flex bgImage={banner} h={["auto", "auto", "auto", "270px"]}>
                    <Flex w="100%" h="100%" backdropFilter="blur(20px)" justifyContent="center">
                        <img src={banner} alt="banner" />
                    </Flex>
                </Flex>
            )}

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
                                <RadioGroup onChange={set_sort} value={sort}>
                                    <Flex borderTop="1px solid whitesmoke" gap="5px" direction="column" alignItems="left" w="100%" pt="8px" fontWeight="md">
                                        <Radio colorScheme="pink" value="default"> Relevance </Radio>
                                        <Radio colorScheme="pink" value="asc"> Price: Low To High </Radio>
                                        <Radio colorScheme="pink" value="dsc"> Price: High To Low </Radio>
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
                                    <CheckboxGroup value={filter} onChange={(value) => { set_filter(value) }} >
                                        <Flex direction={'column'} gap={1}>

                                            {filter_options.map((value, idx) => {
                                                return (
                                                    <Checkbox value={value} key={idx} > {value} </Checkbox>
                                                )
                                            })}


                                        </Flex>
                                    </CheckboxGroup>
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
                    {products.length ?
                        <>
                            <SimpleGrid w="90%" columns={[2, 2, 2, 3]} gap="20px">
                                {products.map((element, idx) => {
                                    return (
                                        <Card
                                            product={element}
                                            status={wishlist[idx]}
                                            key={idx}
                                            reload={load}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                        </>

                        :

                        <>
                            <SimpleGrid w="90%" columns={[2, 2, 2, 3]} gap="20px">
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                                <Skeleton borderRadius="15px" h={[270, 420, 420, 420]} fadeDuration={1} />
                            </SimpleGrid>
                        </>
                    }

                </Flex>

            </Flex>
        </Box>
    )
}

export { Product };
