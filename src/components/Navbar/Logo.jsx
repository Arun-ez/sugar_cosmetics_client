
import React from 'react'
import { Image } from "@chakra-ui/react"

const Logo = ({ h, display, onClick }) => {
    return (
        <Image
            cursor="pointer"
            onClick={onClick}
            h={h}
            display={display}
            src='https://d32baadbbpueqt.cloudfront.net/Logo/4550f9de-30a6-4c8e-a38c-e63ff07ce6dd.gif'
        />
    )
}

export { Logo };
