
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const ChakraUiProvider = ({ children }) => {

    const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

    const baseStyle = definePartsStyle({
        control: {
            _checked: {
                bg: '#000',
                _hover: 'none',
                border: 'none'
            },
        }
    })

    const styles = defineMultiStyleConfig({ baseStyle })
    const config = { initialColorMode: 'light', useSystemColorMode: false }

    const theme = extendTheme({ config, components: { Checkbox: styles, Radio: styles } })

    return (
        <ChakraProvider theme={theme} > {children} </ChakraProvider>
    )
}

export { ChakraUiProvider }
