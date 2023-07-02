import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { BannerCarousel } from '../BannerCarousel/BannerCarousel'
import { CardCarousel } from "../CardCarousel/CardCarousel"
import { DealsCarousel } from "../DealsCarousel/DealsCarousel"
import { useContext, useEffect } from "react";

import { GlobalContext } from "../../contexts/GlobalContextProvider";

const Home = () => {

    const { static_data: [seller, eyes, face, kit, accessories, skincare], load_home_static_products } = useContext(GlobalContext);

    const banner1 = [
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F0be8dd72-3086-45d4-919d-3e435ca3d818.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F80677b12-913a-48b8-a8f4-2419c76564cd.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fcd9aec57-0010-49f2-a903-47b581127743.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F2d329dae-a83e-4572-bb29-6d84fd8442d3.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F944a22b0-2232-415b-b34a-b63602e09e82.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F5c828b59-7b5e-4803-ba68-971bb1a4862a.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Ff4cc339d-4a3d-47f1-b4de-80f9744a69cb.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F3b56433e-aef6-4973-9089-a6558d8dbb3d.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fd6880144-d5cd-4a17-bf18-f070fd82cc10.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F53677975-a216-41b9-91cf-42909c82d975.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fc8a0aa10-0c57-48e4-8882-31662d4c3c78.jpg&w=1920&q=75",
    ]

    const banner2 = [
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fcad57234-a923-4191-8f1e-62ced44a02af.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F92bece5a-10f7-492b-8968-ca0e104cfd63.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F927e5f3e-64c4-4105-b315-0882d6c07f64.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F562fe539-20b1-4239-903e-9a27747b8bf0.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9e2d8597-51d5-41be-95b0-aac4cc0e9794.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F37471559-27d1-4509-9e31-29d889be7036.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fcad57234-a923-4191-8f1e-62ced44a02af.gif&w=1920&q=75"
    ]

    let deals = [
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fb7928b85-893a-48cb-9afd-715e7b5ceb8b.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F3946e48e-b0c7-4e7d-a19d-0479dd685bf3.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F95774b5d-77f6-4e9a-b322-867653f13338.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Ff858b50a-75dd-4aa9-b334-ef73f2e3b1df.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Ff7ab913e-22bf-4301-be48-a94da8d8c0c0.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fb1530b24-5333-4464-9ae0-8d25c74c2637.jpg&w=1920&q=75",
    ]

    let top_deals = [
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fe67abb27-d278-488f-b77c-befdf0bc5ac2.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fae700fcf-b911-452c-a916-f9994a15d20c.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fac61e4b1-b14b-408c-bf0d-f1d7b7165c4a.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fa4b8d750-cdeb-407e-9adb-cb1378a457e7.gif&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F4ae128cd-0187-4a70-bc80-78893db228d9.jpg&w=1920&q=75",
        "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F978f4e72-7951-4ecb-afbc-7efea7631e87.jpg&w=1920&q=75"
    ]

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "Buy Beauty Products at SUGAR Cosmetics Online Store";
    }, [])

    return (
        <Box>
            <BannerCarousel images={banner1} w="100%" m="auto" />

            <CardCarousel
                bgImage="https://media.sugarcosmetics.com/upload/homePageBackGroundTexture.jpg"
                headingColor="white"
                type="seller"
                data={seller}
            />


            <Flex pl={["10%", "10%", "25%", "25%"]} boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px;" pr="30px" justifyContent="space-between" alignItems="center" bgImage="https://media.sugarcosmetics.com/upload/Reward_Banner_Desktop.png" backgroundSize="cover" w="95%" h="170px" m="auto">
                <Flex direction="column" justifyContent="space-around" h="60%">
                    <Heading as="h1" fontSize={["15px", "20px", "20px", "20px"]} > SUGAR FAM REWARDS </Heading>
                    <p style={{ fontSize: "15px" }}> Enjoy up to <span style={{ fontWeight: "bold" }}> 20% off  </span> in SUGAR exclusive stores or on our Website/App. </p>
                </Flex>
                <Flex direction="column" justifyContent="space-between" h="40%">
                    <p style={{ fontSize: "10px", whiteSpace: "nowrap" }}> T&C applies</p>
                    <Heading whiteSpace="nowrap" opacity="90%" as="h1" fontSize="13px" color="#fc2779"> Know More </Heading>
                </Flex>
            </Flex>

            <DealsCarousel data={deals} headingColor="black"> HOT DEALS </DealsCarousel>

            <CardCarousel
                data={eyes}
                headingColor="black"
            />

            <Flex w="100%" direction="column" alignItems="center" h={["300px", "400px", "500px", "600px"]}>

                <Flex w="100%" mb="30px" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color="black"> GODDESS OF FLAWLESS BB SERUM </Heading>
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                </Flex>

                <iframe
                    width="90%"
                    height="100%"
                    src="https://www.youtube.com/embed/OouP8T83MoU"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    style={{ borderRadius: "15px" }}
                >

                </iframe>
            </Flex>

            <DealsCarousel data={top_deals} headingColor="black"> TOP PICKS OF THE WEEK </DealsCarousel>

            <CardCarousel
                data={face}
                headingColor="black"
            />

            <CardCarousel
                data={kit}
                headingColor="black"
            />


            <Flex w="100%" direction="column" alignItems="center" gap="20px" mb="50px">
                <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color="black"> REFER YOUR FRIENDS </Heading>
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                </Flex>
                <Image width="96%" borderRadius="15px" src='https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F8638d096-d168-404e-9b83-56967625b5e6.jpg&w=1920&q=75' />
            </Flex>

            <CardCarousel
                data={accessories}
                headingColor="white"
                bgImage="https://media.sugarcosmetics.com/upload/VTOBackgroungTexture.png"
            />

            <BannerCarousel images={banner2} w="100%" m="20px auto" br="20px" />

            <Flex w="100%" direction="column" alignItems="center">
                <Flex w="100%" h="50px" justifyContent="center" alignItems="center" gap="15px" mt="20px" whiteSpace="nowrap">
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                    <Heading as="h2" fontSize={["15px", "20px", "20px", "20px"]} color="black"> THIS OR THAT </Heading>
                    <Box h="2px" w={["30px", "50px", "50px", "50px"]} bg="#fc2779"></Box>
                </Flex>
                <Flex direction={["column", "column", "row", "row"]} alignItems="center" w="100%" gap="30px" mt="20px" justifyContent="center">
                    <Image borderRadius="20px" w={["90%", "90%", "46%", "46%"]} src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F50d277c9-c605-4c1a-b9da-ae952189292d.jpg&w=1080&q=75" alt='this' />
                    <Image borderRadius="20px" w={["90%", "90%", "46%", "46%"]} src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F597e2c6d-4144-497c-90c2-5d09de375506.jpg&w=1080&q=75" alt='that' />
                </Flex>
            </Flex>

            <CardCarousel
                data={skincare}
                headingColor="black"
            />

        </Box>
    )
}

export { Home };
