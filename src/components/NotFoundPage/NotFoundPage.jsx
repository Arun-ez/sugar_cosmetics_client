import { useEffect } from 'react'
import { Flex, Button, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sugar Cosmetics - 404"
    }, []);

    return (
        <Flex justifyContent="center" alignItems="center" h="75vh" w="100%">
            <Flex direction="column" alignItems="center">
                <Image src="https://in.sugarcosmetics.com/404.svg" />
                <Text fontWeight="medium"> The page you are looking for cannot be found. </Text>
                <br />
                <Button
                    variant="unstyled"
                    bg="black"
                    color="white"
                    hover="none"
                    w="200px"
                    h="50px"
                    onClick={() => { navigate("/") }}
                > GO TO HOMEPAGE </Button>
            </Flex>

        </Flex>
    )
}


export { NotFoundPage }

