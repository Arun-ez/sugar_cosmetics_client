import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex, Text, Heading, Image, Button, useToast, Spinner } from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri'
import { CardCarousel } from '../CardCarousel/CardCarousel';

const Cart = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, set_loading] = useState(true);
    const [blur, set_blur] = useState(false);
    const [cartproduct, setCartproduct] = useState([]);
    const [total, setTotal] = useState(0);
    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })

    const notify = (message) => {
        setTimeout(() => {
            toast({
                position: "bottom-left",
                duration: 1000,
                isClosable: true,
                render: () => {
                    return (
                        <Flex w="250px"
                            h="70px"
                            alignItems="center"
                            borderRadius="4px"
                            fontSize="17px"
                            fontWeight="medium"
                            direction="column"
                            justifyContent="center"
                            color='white'
                            bg='#121212'
                        >
                            {message}
                        </Flex>

                    )
                }
            })
        }, 300)
    }

    const getDate = (payload) => {
        const date = new Date();
        date.setDate(date.getDate() + payload);

        const year = date.getFullYear();
        const month = date.getMonth().toString().padStart(2, '0');
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

    const create_order = async (id) => {

        let payload = {
            orderId: id,
            amount: total,
            products: cartproduct,
            created: getDate(0),
            delivery: getDate(7),
            status: false
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
                create_order(id)
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
    }, [])


    return (

        <Flex direction="column" bgColor="#f2f2f2" filter={blur ? "blur(10px)" : ""} transition="all 0.6s">
            <Flex pl="20px" bgColor="#ffffff" h="50px" w="100%" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;" gap="10px">
                <Text opacity="70%" fontSize="15px" cursor="pointer" onClick={() => { navigate("/") }}> Home </Text>
                <MdArrowForwardIos style={{ opacity: "60%", fontSize: "13px" }} />
                <Heading as="h1" fontSize="15px"> Bag </Heading>
            </Flex>


            {cartproduct.length ?
                <>
                    <Flex
                        direction={["column", "column", "column", "row"]}
                        bgColor="#ffffff"
                        width="96%"
                        m="20px auto 20px auto"

                        borderRadius="25px"
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
                                                        <Text fontSize="13px" height="25px" overflow="hidden">{elem.Title}</Text>
                                                        <Text style={{ fontWeight: 'bold', opacity: "90%" }} > ₹{elem.price} </Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex justifyContent="center" alignItems="center" w="200px" pl="20px" pr="20px">

                                                    <Flex w="100px" justifyContent="center">
                                                        <RiDeleteBinLine fontSize="17px" color="#212529" onClick={() => { remove_item(elem) }} />
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
                            <Flex justifyContent="space-between" mt="10px" border="1px solid #f2f2f2" borderRadius="10px" p="20px">
                                <div>
                                    <p>Subtotal</p>
                                    <p>Discout</p>
                                    <p>SUGAR FAM rewards</p>
                                    <p>Shipping</p>
                                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >Total</h1>
                                </div>
                                <div>
                                    <p>₹{total}</p>
                                    <p>₹0.00</p>
                                    <p>₹0.00</p>
                                    <p>₹0.00</p>
                                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >₹{total}</h1>
                                </div>
                            </Flex>
                            <button
                                style={{
                                    width: "200px",
                                    alignSelf: "flex-end",
                                    backgroundColor: "black",
                                    color: "white",
                                    fontSize: "14px",
                                    padding: "12px",
                                    borderRadius: "6px",
                                    marginTop: "30px",
                                    opacity: total > 0 ? "100%" : "50%",
                                    pointerEvents: total > 0 ? "auto" : "none"
                                }}
                                onClick={payment_handler}
                            >
                                ₹{total} PLACE ORDER
                            </button>
                        </Flex>
                    </Flex>
                </>

                :

                <>
                    {loading ?
                        <>
                            <Flex minH="60vh" justifyContent="center" alignItems="center">
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='pink.500'
                                    size='xl'
                                />
                            </Flex>

                        </>

                        :

                        <>
                            <Flex m="50px auto 50px auto" gap="10px" direction="column" justifyContent="center" pb="55px" alignItems="center" width="90%" borderRadius="15px" h="450px" bgPosition="center" boxShadow="0 .5rem 1rem rgba(0,0,0,.15)">
                                <Image src='https://in.sugarcosmetics.com/Cart_nofound.svg' />
                                <Text textAlign="center" fontWeight="bold" opacity="70%" lineHeight="20px"> Hey! It's lonely here. <br />Your bag seems to have no company.<br /> Why not add some products?</Text>

                                <Button
                                    variant="ghost" p="22px" bg="black"
                                    colorScheme="black" color="white"
                                    onClick={() => { navigate("/") }}
                                > SHOP NOW </Button>
                            </Flex>
                        </>

                    }


                    <CardCarousel headingColor="black" type="seller"> BESTSELLERS </CardCarousel>
                </>
            }

        </Flex>
    )
}

export { Cart };