import { SimpleGrid, Skeleton } from "@chakra-ui/react"

const ProductSkeleton = () => {
    return (
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
    )
}

export { ProductSkeleton }
