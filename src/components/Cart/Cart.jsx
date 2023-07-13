import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Flex, Text, Heading, Image, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, useDisclosure } from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri'
import { CardCarousel } from '../CardCarousel/CardCarousel';
import { AddressPicker } from '../AddressPicker/AddressPicker';
import { GlobalContext } from '../../contexts/GlobalContextProvider';
import { CartSkeleton } from '../CartSkeleton/CartSkeleton';

const Cart = () => {

    const { static_data } = useContext(GlobalContext);

    const navigate = useNavigate();
    const [loading, set_loading] = useState(true);
    const [blur, set_blur] = useState(false);
    const [cartproduct, setCartproduct] = useState([]);
    const [address, set_address] = useState([]);
    const [address_index, set_address_index] = useState(0);
    const [total, setTotal] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [prefill, set_prefill] = useState({
        firstName: "",
        lastName: "",
        number: "",
        flat_no: "",
        locality: "",
        pincode: "",
        state: "",
        city: ""
    })

    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const notify = (message) => {
        toast(message);
    }

    const load_addresses = async () => {
        try {
            let resposne = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            let base = await resposne.json();
            set_address(base.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getDate = (payload) => {
        const date = new Date();
        date.setDate(date.getDate() + payload);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${day}-${month}-${year}`;
    }

    const clear_cart = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/clear/all`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            navigate("/account/orders");
        } catch (error) {
            console.log(error);
        }
    }

    const create_order = async () => {

        let payload = {
            amount: total,
            products: cartproduct,
            ordered_on: getDate(0),
            delivered_on: getDate(Math.floor(Math.random() * (8 - 1) + 1)),
            status: 0,
            address: address[address_index]
        };


        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            let data = await response.json();

            if (data.hasOwnProperty("success")) {
                notify("Order Placed");
                clear_cart();
            }
        } catch (error) {
            console.log(error);
        }
    }


    const verify_payment = async (details, id) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/payment/verify`, {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let data = await response.json();

            if (data.status === true) {
                create_order()
            }


        } catch (error) {
            navigate("/invalid");
        }

        set_blur(false);
    }

    const grant_razorpay = ({ id, amount, currency }) => {

        const options = {
            order_id: id,
            name: "Sugar Cosmetics",
            amount: amount,
            key: process.env.REACT_APP_KEY_ID,
            currency: currency,
            theme: {
                color: "#000"
            },

            modal: {
                ondismiss: () => {
                    set_blur(false);
                }
            },

            handler: (response) => {
                verify_payment(response, id);
            }
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    const payment_handler = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/payment/create`, {
                method: "POST",
                body: JSON.stringify({ amount: total }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let data = await response.json();
            grant_razorpay(data);
            set_blur(true);
        } catch (error) {
            console.log(error);
        }
    }

    const total_price = (data) => {
        let currtotal = 0;
        data.forEach((element, index) => {
            currtotal += element.price * element.qty
        })
        setTotal(currtotal);
    }

    const load = async () => {

        set_loading(true);

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            let json = await response.json();
            setCartproduct(json.data);
            total_price(json.data);
        } catch (err) {
            console.log(err);
        }

        set_loading(false);
    }

    const quantity_handler = async (product, payload) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${product._id}`, {
                method: "PATCH",
                body: JSON.stringify({ qty: product.qty + payload }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            load();

        } catch (error) {
            console.log(error);
        }
    }

    const remove_item = async (product) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${product._id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            load();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "Sugar Cosmetics - Bag";
        if (cartproduct.length > 0) {
            set_loading(false);
        } else {
            setTimeout(() => {
                set_loading(false);
            }, 3000)
        }

        load();
        load_addresses();
    }, [])


    return (

        <Flex direction="column" bgColor="#f2f2f2" filter={blur ? "blur(10px)" : ""} transition="all 0.6s">
            <Flex pl="20px" bgColor="#ffffff" h="50px" w="100%" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;" gap="10px">
                <Text opacity="70%" fontSize="15px" cursor="pointer" onClick={() => { navigate("/") }}> Home </Text>
                <MdArrowForwardIos style={{ opacity: "60%", fontSize: "13px" }} />
                <Heading as="h1" fontSize="15px"> Bag </Heading>
            </Flex>


            {cartproduct.length ? (
                <>
                    <Flex
                        direction={["column", "column", "column", "row"]}
                        bgColor="#ffffff"
                        width={["100%", "100%", "96%", "96%"]}
                        m={["1px auto 0px auto", "1px auto 0px auto", "20px auto 20px auto", "20px auto 20px auto"]}

                        borderRadius={["0px", "0px", "25px", "25px"]}
                        p={["20px 15px", "30px", "30px", "30px"]}
                        gap="20px"
                    >
                        <Flex direction="column" w="100%">
                            <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} > BAG SUMMARY </h1>
                            <Flex direction="column" gap="10px" mt="10px" w="100%">

                                {
                                    cartproduct.map((elem, id) => {
                                        return (
                                            <Flex key={id} justifyContent="space-between" borderRadius="10px" border="1px solid #f2f2f2">
                                                <Flex p="15px" gap="15px"
                                                    onClick={() => { navigate(`/collections/${elem.category}/${elem._id}`) }}
                                                >
                                                    <Image w="40px" src={elem.images[0]} alt="product" borderRadius="7px" />
                                                    <Flex direction="column">
                                                        <Text fontSize="13px" h={[10, 'auto', 'auto', 'auto']} overflow={'hidden'} >{elem.title}</Text>
                                                        <Text style={{ fontWeight: 'bold', opacity: "90%" }} > ₹{elem.price} </Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex justifyContent="center" alignItems="center" w="200px" pl="20px" pr="20px">

                                                    <Flex w="100px" justifyContent="center">
                                                        <RiDeleteBinLine cursor="pointer" fontSize="17px" color="#212529" onClick={() => { remove_item(elem) }} />
                                                    </Flex>

                                                    <Flex w="100px" justifyContent="space-around" border="1px solid #212529" p="5px" borderRadius="10px">
                                                        <button disabled={elem.qty <= 1} onClick={() => { quantity_handler(elem, -1) }} >-</button>
                                                        <button > {elem.qty} </button>
                                                        <button onClick={() => { quantity_handler(elem, 1) }} >+</button>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    })
                                }

                            </Flex>
                        </Flex>
                        <Flex direction="column" w="100%">
                            <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >APPLY COUPON</h1>
                            <Flex border="1px solid #f2f2f2" padding="15px" borderRadius="10px" mt="10px" justifyContent="space-between">
                                <input style={{ border: "1px solid #f2f2f2", width: "70%", padding: "10px", borderRadius: "5px" }} type="text" placeholder='Enter gift code or discount code' />
                                <button style={{ backgroundColor: "black", color: "white", paddingLeft: "40px", paddingRight: "40px" }}>Apply</button>
                            </Flex>
                            <h1 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: "10px" }} >PRICE DETAILS</h1>
                            <Flex direction="column" mt="10px" border="1px solid #f2f2f2" borderRadius="10px" p="20px">

                                <Flex color="#757575" fontWeight="medium" justify="space-between" w="100%"> <Text> Subtotal <i style={{ fontSize: "12px" }}> (Inclusive of taxes) </i> </Text> <Text> ₹{total} </Text>  </Flex>
                                <Flex color="#757575" fontWeight="medium" justify="space-between" w="100%"> <Text> Discount </Text> <Text> ₹{`0.00`} </Text>  </Flex>
                                <Flex color="#757575" fontWeight="medium" justify="space-between" w="100%"> <Text> SUGAR FAM rewards </Text> <Text> ₹{`0.00`} </Text>  </Flex>
                                <Flex color="#757575" fontWeight="medium" justify="space-between" w="100%"> <Text> Shipping </Text> <Text> ₹{`0.00`} </Text>  </Flex>

                                <Flex pt={1} justify="space-between" w="100%" borderTop="1px dashed #bdbdbd" mt={2} fontWeight="bold" fontSize="17px"> <Text> Total </Text> <Text> ₹{total} </Text> </Flex>
                            </Flex>

                            {address.length && (

                                <>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <h1 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: "10px" }} > DELIVERY ADDRESS </h1>
                                        <Text onClick={onOpen} cursor="pointer" fontWeight="medium" fontSize="14px" color="#fc2779"> + Add New Address </Text>
                                    </Flex>



                                    <Flex color="#757575" direction="column" mt="10px" border="1px solid #f2f2f2" borderRadius="10px" overflow="hidden">

                                        <Flex direction="column" p="20px">
                                            <Text fontWeight="bold"> {address[address_index].name} </Text>
                                            <Text> {address[address_index].flatno}, </Text>
                                            <Text> {address[address_index].locality}, </Text>
                                            <Text> {address[address_index].city},{address[address_index].state},{address[address_index].pincode} </Text>
                                            <Text> Ph Number : {address[address_index].number} </Text>
                                        </Flex>



                                        <Flex>
                                            <Accordion allowMultiple={true} w="100%">
                                                <AccordionItem border="none">
                                                    <h2 style={{ backgroundColor: "#F5F5F5", paddingTop: "7px", paddingBottom: "7px" }}>
                                                        <AccordionButton display="flex" justifyContent="space-between" _hover="none">
                                                            <Flex fontSize="14px" color="black" fontWeight="medium"> Select An Address </Flex>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>

                                                    <AccordionPanel>
                                                        {address.map((elm, idx) => {
                                                            return (
                                                                <Flex
                                                                    key={idx}
                                                                    direction="column"
                                                                    p="15px" border="1px solid #f2f2f2"
                                                                    mt={5} borderRadius="15px"
                                                                    cursor="pointer"
                                                                    bg={idx === address_index ? "#f2f2f2" : ""}
                                                                    onClick={() => { set_address_index(idx) }}
                                                                >
                                                                    <Text fontWeight="bold"> {elm.name} </Text>
                                                                    <Text> {elm.flatno}, </Text>
                                                                    <Text> {elm.locality}, </Text>
                                                                    <Text> {elm.city},{elm.state},{elm.pincode} </Text>
                                                                    <Text> Ph Number : {elm.number} </Text>
                                                                </Flex>
                                                            )
                                                        })}
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </Flex>
                                    </Flex>
                                </>
                            )}

                            <Button
                                alignSelf={'flex-end'}
                                mt={4} py={6}
                                w={200} bg={'black'}
                                color={'white'}
                                _hover={'none'}
                                fontWeight={'normal'}
                                onClick={address.length > 0 ? payment_handler : onOpen}
                            >
                                ₹{total} PLACE ORDER
                            </Button>
                        </Flex>
                    </Flex>
                </>) : (

                <>
                    {loading ? (
                        <Flex minH="60vh" justifyContent="center" alignItems="center">
                            <CartSkeleton />
                        </Flex>
                    ) : (
                        <Flex m="50px auto 50px auto" gap="10px" direction="column" justifyContent="center" pb="55px" alignItems="center" width="90%" borderRadius="15px" h="450px" bgPosition="center" boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
                            <Image src='https://in.sugarcosmetics.com/Cart_nofound.svg' />
                            <Text textAlign="center" fontWeight="bold" opacity="70%" lineHeight="20px"> Hey! It's lonely here. <br />Your bag seems to have no company.<br /> Why not add some products?</Text>

                            <Button
                                variant="ghost" p="22px" bg="black"
                                colorScheme="black" color="white"
                                onClick={() => { navigate("/") }}
                            > SHOP NOW </Button>
                        </Flex>
                    )}

                    <CardCarousel
                        data={static_data[2]}
                        headingColor="black"
                    />

                </>
            )}

            <AddressPicker reload={load_addresses} isOpen={isOpen} onClose={onClose} prefill={prefill} />
        </Flex>
    )
}

export { Cart };