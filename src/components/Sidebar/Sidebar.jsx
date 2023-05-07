import { Logo } from '../Navbar/Logo'
import { RxCross2 } from "react-icons/rx"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    Box,
    AccordionPanel
} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ onClose, isOpen, }) => {

    let navigate = useNavigate();

    return (
        <Drawer size='full' onClose={onClose} isOpen={isOpen} placement='left'>
            <DrawerContent bg="#000000" color="white">
                <DrawerHeader onClick={() => { onClose() }} display="flex" alignItems="center" gap="20px">
                    <RxCross2 />
                    <Logo h="25px" />
                </DrawerHeader>
                <DrawerBody>
                    <Accordion allowMultiple={true}>

                        <AccordionItem borderTop="none" onClick={() => { navigate("/categories"); onClose() }}>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> BROWSE BY CATEGORY </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem borderTop="none" mt="20px">
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> BLOG </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>

                            <AccordionPanel>

                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem onClick={() => { navigate("/offers"); onClose() }}>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> OFFERS </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> STORES </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> CORPORATE GIFTING </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> HELP & SUPPORT </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> FAQS </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> REFUND & RETURN POLICY </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> TERMS & CONDITIONS </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> CAREERS </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                        <AccordionItem>
                            <h2 style={{ margin: "10px 0px 10px 0px" }}>
                                <AccordionButton display="flex" justifyContent="space-between">
                                    <Box> ABOUT US </Box>
                                    <MdOutlineArrowForwardIos color='white' fontSize="12px" />
                                </AccordionButton>
                            </h2>
                        </AccordionItem>

                    </Accordion>
                </DrawerBody>
            </DrawerContent>
        </Drawer >
    )
}

export { Sidebar }
