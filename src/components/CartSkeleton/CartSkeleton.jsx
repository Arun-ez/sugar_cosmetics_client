import { Flex, Skeleton } from "@chakra-ui/react"

const CartSkeleton = () => {
    return (
        <Flex
            direction={["column", "column", "column", "row"]}
            bgColor="#ffffff"
            width={["100%", "100%", "96%", "96%"]}
            m={["1px auto 0px auto", "1px auto 0px auto", "20px auto 20px auto", "20px auto 20px auto"]}

            borderRadius={["0px", "0px", "25px", "25px"]}
            p={["20px 15px", "30px", "30px", "30px"]}
            gap="20px"
        >
            <Flex w={'100%'} direction={'column'} gap={5} >
                <Skeleton fadeDuration={1} h={8} w={200} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={20} w={'100%'} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={20} w={'100%'} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={20} w={'100%'} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={20} w={'100%'} borderRadius={'10px'} />
            </Flex>

            <Flex w={'100%'} direction={'column'} gap={5}>
                <Skeleton fadeDuration={1} h={8} w={200} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={20} w={'100%'} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={8} w={200} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={52} w={'100%'} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={8} w={200} borderRadius={'10px'} />
                <Skeleton fadeDuration={1} h={52} w={'100%'} borderRadius={'10px'} />
            </Flex>
        </Flex>
    )

}

export { CartSkeleton }
