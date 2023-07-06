import {
    Flex,
    Text,
    Heading,
    Box,
    Button,
    Input,
    Skeleton
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

const ViewfinderSkeleton = () => {

    let [window_width, set_window_width] = useState(0);

    const images = ['', '', '', '', '']

    useEffect(() => {

        const action = () => {
            set_window_width(window.innerWidth);
        }

        window.addEventListener("resize", action)

        return () => window.removeEventListener('resize', action);

    }, [])

    return (
        <Flex direction="column" w="100%" alignItems="center" minH="70vh">

            <Flex
                w={["100%", "100%", "90%", "85%"]}
                direction={["column", "column", "column", "row"]}
                gap="20px"
                alignItems={["center", "center", "center", "start"]}
                p="20px" m="20px auto" minH="70vh"
                borderRadius="12px"
                boxShadow={["none", "none", "0 .5rem 1rem rgba(0,0,0,.15)", "0 .5rem 1rem rgba(0,0,0,.15)"]}
            >

                <Flex w="80%" direction={["column-reverse", "column-reverse", "row", "row"]}>

                    <Flex justifyContent="center" pt="10px" w={["100%", "100%", "120px", "120px"]} gap={["10px", "10px", "5px", "5px"]} alignItems="center" direction={["row", "row", "column", "column"]}>

                        {
                            images.map((element, index) => {
                                return (
                                    <Skeleton
                                        padding="5px"
                                        borderRadius="10px"
                                        w={["50px", "50px", "70px", "70px"]}
                                        h={["60px", "60px", "80px", "80px"]}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Flex>

                    <Flex w="100%" minW={["250px", "250px", "250px", "300px"]} pt="20px" justifyContent="center">
                        <Skeleton
                            borderRadius="10px"
                            p={["30px 50px 30px 50px", "30px 50px 30px 50px", "30px 70px 30px 70px", "30px 70px 30px 70px"]}
                            w={["350px", "350px", "350px", "400px"]} h={["300px", "300px", "400px", "400px"]}
                        />
                    </Flex>
                </Flex>

                <Flex direction="column" gap="10px" pt="15px" w="100%">
                    <Skeleton w={'100%'} h={10} />
                    <Skeleton
                        h={8} w={20}
                        borderRadius="5px"
                        p="5px 25px 5px 20px"
                    />

                    <Skeleton w={[200, 200, 200, 250]} h={8} />

                    <Skeleton w={'100%'} h={40} borderRadius="10px" />



                    <Flex w="100%" justifyContent="left" pb="15px" alignItems="center" gap="15px">
                        <Skeleton h={12} w={12} borderRadius="5px" />
                        <Skeleton h={12} w={52} borderRadius="5px" />
                    </Flex>

                    <Flex w="100%" gap="10px" mt="15px">
                        <Skeleton h={12} w={'60%'} borderRadius="5px" />
                        <Skeleton h={12} w={28} borderRadius="5px" />
                    </Flex>

                    <Skeleton h={14} />

                    <Skeleton h={14} />

                    <Skeleton h={14} />

                </Flex>
            </Flex>
        </Flex>
    )
}

export { ViewfinderSkeleton }
