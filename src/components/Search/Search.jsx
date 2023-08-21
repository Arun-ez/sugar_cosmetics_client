
import { useContext, useEffect, useState } from 'react'
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
    Image,
} from '@chakra-ui/react';
import { useQuery } from '../../unils/useQuery';
import { ProductSkeleton } from '../Skeletons/ProductSkeleton';
import { Card } from '../Card/Card';
import { CardCarousel } from '../CardCarousel/CardCarousel';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../../contexts/GlobalContextProvider';

const Search = () => {
    const query = useQuery();

    const { static_data } = useContext(GlobalContext);

    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const [products, set_products] = useState(null);
    const [filter_options, set_filter_options] = useState([]);
    const [filter, set_filter] = useState([]);
    const [sort, set_sort] = useState('default');
    const [wishlist, set_wishlist] = useState([]);
    const [loading, set_loading] = useState(false);

    const load = async (shoudShow) => {

        if (shoudShow) {
            set_products(null);
        }

        set_loading(true);

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/search?q=${query}&filter=${filter.join('.')}&sort=${sort}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token || ''}`
                }
            })

            let { data, filters, wishlist } = await response.json();

            set_loading(false);

            set_products(data);
            set_filter_options(filters);
            set_wishlist(wishlist);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        load(true);
    }, [query, filter, sort, token])

    useEffect(() => {
        document.title = 'Sugar Cosmetics - Search';
        window.scrollTo(0, 0);
    }, [query]);

    return (
        <Box mb="50px">

            {((products?.length) || (loading)) ? (

                <>
                    <Flex pl="20px" h="50px" alignItems="center" gap="5px">
                        <Text opacity="70%" fontSize="15px" cursor="pointer"> Search Results for </Text>
                        <Text opacity="70%" fontSize="15px" cursor="pointer" textDecoration={'underline'} > {query} </Text>
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
                                    <Text color="#fc2779" cursor={'pointer'} onClick={() => { set_filter([]) }} > Reset </Text>
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
                            {products?.length ?
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
                                    <ProductSkeleton />
                                </>
                            }

                        </Flex>

                    </Flex>
                </>
            ) : (
                <Box>
                    <Image
                        src={'/no_results.png'}
                        boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
                        borderRadius="15px" m="auto" mt="100px"
                    />
                    <br />

                    <CardCarousel
                        data={static_data[2]}
                        headingColor="black"
                    />

                    <CardCarousel
                        data={static_data[3]}
                        headingColor="black"
                    />
                </Box>
            )}
        </Box>
    )
}

export { Search };
