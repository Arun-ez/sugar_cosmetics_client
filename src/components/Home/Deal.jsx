import React from 'react'
import { Flex, Image } from "@chakra-ui/react"

const Deal = ({ image_src }) => {

    return (
        <Flex w="100%" p="20px">
            <Flex bg="white" overflow="hidden" borderRadius="15px" w="100%" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
                <Image src={image_src} alt="thumbnail" w="100%" />
            </Flex>

        </Flex>
    )
}

export { Deal }