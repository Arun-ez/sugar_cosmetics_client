import "./Navbar.css"
import { Sidebar } from "../Sidebar/Sidebar";
import { useRef, useContext, useState } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import { HiUserCircle, HiMenuAlt2 } from "react-icons/hi"
import { FiHeart } from "react-icons/fi"
import { FiSearch } from "react-icons/fi"
import { TbDiscount2 } from "react-icons/tb"
import { RiShoppingBagLine } from "react-icons/ri"
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from "./Logo";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { RxCross1 } from "react-icons/rx"
import { GoChevronDown } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../../redux/auth/action_types";

const Navbar = ({ ad_display, set_ad_display }) => {

    let { isOpen, onOpen, onClose } = useDisclosure();
    let navigate = useNavigate();
    let search_ref = useRef();
    let dispatch = useDispatch();
    let { isLoginPage } = useContext(GlobalContext);
    let [display_logout, set_display_logout] = useState("none");
    let user = useSelector((store) => {
        return store.AuthReducer.user;
    })

    let isAuth = useSelector((store) => {
        return store.AuthReducer.isAuth;
    })

    const handle_drawer = () => {
        onOpen();
    }

    const toggle_logout = () => {
        if (display_logout === "none") {
            set_display_logout("flex");
        } else {
            set_display_logout("none");
        }
    }

    const proceed_logout = () => {
        toggle_logout();
        dispatch({ type: LOGOUT_REQUEST })
        window.location.href = "/";
    }

    const handle_search = () => {
        let query = search_ref.current.value;

        if (!query) { return }
        navigate(`/search?q=${query}`);
    }

    const handle_key = ({ key }) => {
        if (key === 'Enter') {
            handle_search();
        }

    }

    const nav_routes = [
        { name: "LIPS", path: "/collections/lips" },
        { name: "EYES", path: "/collections/eyes" },
        { name: "FACE", path: "/collections/face" },
        { name: "NAILS", path: "/collections/nails" },
        { name: "SKINCARE", path: "/collections/skincare" },
        { name: "ACCESSORIES", path: "/collections/accessories" },
        { name: "GIFTS & KITS", path: "/collections/kit" },
        { name: "BESTSELLERS", path: "/collections/seller" },
        { name: "NEW LAUNCHES", path: "/collections/new" },
        { name: "OFFERS", path: "/offers" },
        { name: "BLOG", path: "https://in.sugarcosmetics.com/blog" },
        { name: "STORES", path: "/stores" },
    ]

    return (
        <Flex className='navbar' w="100vw" direction="column" display={isLoginPage ? "none" : "flex"}>

            <Flex display={ad_display} borderBottom="1px solid rgba(17, 30, 26, 0.9)" bg="#000000" w="100%" p="7px" color="white" whiteSpace="nowrap">
                <Flex w={["0%", "100%", "100%", "100%"]}></Flex>
                <Heading textAlign="center" w="100%" as="h1" fontSize={["9px", "12px", "15px", "15px"]} fontWeight="medium"> FREE Base Of Glory Pore Minimizing Primer on spend of Rs.999 &nbsp; </Heading>
                <Flex w="100%" justifyContent="flex-end" pr="30px"> <RxCross1 onClick={() => { set_ad_display("none") }} /> </Flex>
            </Flex>

            <Flex
                bg="#000000"
                w="100%"
                h={["55px", "55px", "80px", "80px"]}
                alignItems="center"
                justifyContent="space-between"
                pl={["10px", "10px", "60px", "60px"]}
                pr={["30px", "30px", "60px", "60px"]}
            >

                <Flex display={["flex", "flex", "flex", "none"]} gap="20px" alignItems={'center'}>
                    <HiMenuAlt2 color='white' fontSize="20px" onClick={handle_drawer} />
                    <Sidebar onClose={onClose} isOpen={isOpen} />
                    <Logo onClick={() => { navigate("/") }} h={"35px"} display={["block", "block", "none", "none"]} />
                </Flex>

                <Logo onClick={() => { navigate("/") }} h={"50px"} display={["none", "none", "block", "block"]} />

                <Flex w="40%" border="1px solid white" borderRadius="8px" overflow="hidden" display={["none", "none", "none", "flex"]}>
                    <Input
                        placeholder='Try "Liquid Lipstick"'
                        border="none"
                        _focusVisible={false}
                        borderRadius="none"
                        bg="#212121"
                        color="white"
                        ref={search_ref}
                        onKeyPress={handle_key}
                        style={{ caretColor: "#fc2779" }} />

                    <Button borderRadius="0px" w="150px" gap="5px" onClick={handle_search}> <FiSearch fontSize="20px" /> Search </Button>
                </Flex>

                <Flex alignItems="center" gap="5px" display={["none", "none", "flex", "flex"]}>
                    <Heading
                        as="p"
                        color="white"
                        fontSize="15px"
                        display={["none", "none", "flex", "flex"]}
                        gap="4px"
                        alignItems="center"
                        cursor="pointer"
                        fontWeight="medium"
                        onClick={() => {
                            navigate("/account/orders")
                        }}

                    >
                        <HiUserCircle fontSize="25px" />
                        {user.name === "Login/Register" ? "Login/Register" : "Hi, " + user.name}
                    </Heading>

                    <GoChevronDown style={{ marginLeft: "5px", cursor: "pointer", color: "white", display: isAuth ? "flex" : "none" }} onClick={toggle_logout} />

                    <Flex
                        position="absolute"
                        m="80px 0px 0px 140px"
                        fontSize="18px"
                        pl="20px"
                        fontWeight="medium"
                        h="50px"
                        alignItems="center"
                        w="150px"
                        bg="white"
                        display={display_logout}
                        cursor="pointer"
                        onClick={proceed_logout}
                        borderRadius="5px"
                    >
                        Logout
                    </Flex>
                </Flex>

                <Flex color="white" fontSize="20px" gap="20px">
                    <FiHeart style={{ cursor: "pointer" }} onClick={() => { navigate("/account/wishlist") }} />
                    <RiShoppingBagLine style={{ cursor: "pointer" }} onClick={() => { navigate("/cart") }} />
                    <TbDiscount2 style={{ cursor: "pointer" }} onClick={() => { navigate("/offers") }} />
                </Flex>

            </Flex>

            <Flex
                display={["none", "none", "none", "flex"]}
                bg="#141414"
                color="white"
                h="55px"
                alignItems="center"
                gap="3%"
                paddingLeft="40px"
                fontSize="14px"
                whiteSpace="nowrap">
                {nav_routes.map(({ name, path }, id) => {
                    return <NavLink className="nav_item hover-underline-animation" to={path} key={id}> {name} </NavLink>
                })}
            </Flex>
        </Flex>
    )
}

export default Navbar;
