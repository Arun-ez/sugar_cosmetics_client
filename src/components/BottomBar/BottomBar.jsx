import "./BottomBar.css"
import { Flex } from '@chakra-ui/react'
import { AiTwotoneHome } from 'react-icons/ai'
import { TbCategory } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { IoGiftSharp } from 'react-icons/io5'
import { NavLink } from "react-router-dom"


const BottomBar = () => {

    const list = [
        { name: "Home", path: "/", icon: <AiTwotoneHome /> },
        { name: "Categories", path: "/categories", icon: <TbCategory /> },
        { name: "Account", path: "/account/orders", icon: <AiOutlineUser /> },
        { name: "Offers", path: "/offers", icon: <IoGiftSharp /> },
    ]

    return (
        <Flex
            className='bottom_bar'
            h="60px" w="100%"
            bgColor="black"
            justifyContent="space-around"
            alignItems="center"
            display={["flex", "flex", "none", "none"]}
        >

            {
                list.map(({ name, path, icon }, id) => {
                    return (
                        <NavLink className="bottom_bar_links" to={path} key={id}>
                            <span> {icon} </span>
                            <p> {name} </p>
                        </NavLink>
                    )
                })
            }
        </Flex>
    )
}

export { BottomBar }
