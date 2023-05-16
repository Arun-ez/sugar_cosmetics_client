import { Box, Flex, Heading, Spinner, Image } from "@chakra-ui/react"
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import "./DealsCarousel.css";

const DealsCarousel = ({ children, headingColor, data }) => {


    const breakpoints = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1500, min: 630 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 630, min: 0 },
            items: 1
        }
    }



    return (
        <Flex direction="column" className="deals_wrapper">
            <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color={headingColor}> {children} </Heading>
                <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
            </Flex>

            <Flex h={["300px", "370px", "300px", "450px"]} justifyContent="center">

                {data ?
                    <>
                        <Carousel
                            responsive={breakpoints}
                            infinite={true}
                            removeArrowOnDeviceType={["mobile"]}
                            containerClass="carousel_container"
                        >
                            {data.map((image, id) => {
                                return (
                                    <Flex w="100%" p="20px" key={id}>
                                        <Image overflow="hidden" src={image} alt="thumbnail" w="100%" borderRadius="15px" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" />
                                    </Flex>
                                )

                            })}
                        </Carousel>
                    </>

                    :

                    <>
                        <Spinner
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
    )
}

export { DealsCarousel }
