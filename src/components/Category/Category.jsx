import { Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

const Category = () => {

    const sources = [
        { name: "Lips", path: "/collections/lips", image: "https://d32baadbbpueqt.cloudfront.net/category/35773d94-4bda-49bb-9cfe-7ab9df802966.jpg" },
        { name: "Eyes", path: "/collections/eyes", image: "https://d32baadbbpueqt.cloudfront.net/category/d836c4f1-0292-4b6a-ad57-b7066264f270.jpg" },
        { name: "Face", path: "/collections/face", image: "https://d32baadbbpueqt.cloudfront.net/category/c0365a38-85cd-4884-b0c0-bcd98b66742c.jpg" },
        { name: "Nails", path: "/collections/nails", image: "https://d32baadbbpueqt.cloudfront.net/category/e64dbeff-2f47-4bc4-8744-870a1b7762e8.jpg" },
        { name: "Skincare", path: "/collections/skincare", image: "https://d32baadbbpueqt.cloudfront.net/category/1ed62179-9fd3-4c34-a20a-c39192668658.jpg" },
        { name: "Accessories", path: "/collections/accessories", image: "https://d32baadbbpueqt.cloudfront.net/category/fb03dae5-817a-4e5f-9430-53a29fc90221.jpg" },
        { name: "Gifts & Kits", path: "/collections/kit", image: "https://d32baadbbpueqt.cloudfront.net/category/724f49b9-a368-4667-a985-ab6074f59a76.jpg" },
        { name: "Bestsellers", path: "/collections/seller", image: "https://d32baadbbpueqt.cloudfront.net/category/4ee32fd4-cb00-4e51-9d3b-54390c78ed31.jpg" },
        { name: "New Launches", path: "/collections/new", image: "https://d32baadbbpueqt.cloudfront.net/category/1c22c186-b566-4146-bd8a-2d2b73f22839.jpg" },
        { name: "Offers", path: "/offers", image: "https://d32baadbbpueqt.cloudfront.net/category/c5ab6329-18e6-4d41-b055-25477e04d05e.jpg" }
    ]

    useEffect(() => {
        document.title = "SUGAR Cosmetics - Categories"
        window.scroll(0, 0);
    }, [])

    return (
        <Flex direction="column" p="80px 20px" >
            <Heading as="h1" fontSize="18px" mb="20px"> BROWSE BY CATEGORY </Heading>

            <SimpleGrid columns={[1, 2, 2, 3]} gap="20px">
                {sources.map(({ name, path, image }, id) => {
                    return (
                        <NavLink to={path} style={{ color: "white", fontWeight: "500" }} key={id}>
                            <Flex
                                bgImage={image}
                                backgroundPosition="bottom"
                                borderRadius="10px"
                                padding="30px"
                            >
                                {name}
                            </Flex>
                        </NavLink>
                    )
                })}
            </SimpleGrid>
        </Flex>
    )
}

export { Category }
