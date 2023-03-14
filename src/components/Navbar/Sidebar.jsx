import React from 'react'
import { Logo } from './Logo'
import { RxCross2 } from "react-icons/rx"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { Image, Drawer, DrawerBody, DrawerContent, DrawerHeader, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, DrawerFooter, Flex, Heading, Button } from "@chakra-ui/react"

const Sidebar = ({ onClose, isOpen, }) => {
    return (
        <Drawer size='full' onClose={onClose} isOpen={isOpen} placement='left' >
            <DrawerContent bg="#000000" color="white">
                <DrawerHeader onClick={() => { onClose() }} display="flex" alignItems="center" gap="20px">
                    <RxCross2 />
                    <Logo h="25px" />
                </DrawerHeader>
                <DrawerBody>
                    <Accordion allowMultiple={true}>

                        <AccordionItem borderTop="none">
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
                                HYYYYS
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
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

                <DrawerFooter bg="#212121" display="flex" justifyContent="start" gap="20px">
                    <Flex h="97px" w="60px">
                        <Image src="https://media.sugarcosmetics.com/upload/sugarCosmeticsMobileIcon2.png" />
                    </Flex>

                    <Flex flexDirection="column" w="65%" gap="15px">
                        <Heading as="h1" fontSize="18px"> GET THE NEW SUGAR APP TODAY! </Heading>
                        <Button
                            color="black"
                            onClick={() => { window.open("https://play.google.com/store/apps/details?id=com.app.sugarcosmetics") }}
                        > Install Now </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}

export { Sidebar }
