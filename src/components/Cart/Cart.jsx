import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex, Text, Heading, Image } from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri'

const CartPage = () => {
    const navigate = useNavigate();
    const [cartproduct, setCartproduct] = useState([]);
    const [total, setTotal] = useState(0);
    const token = useSelector((store) => {
        return store.AuthReducer.token;
    })


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
        load();
    }, [])


    return (

        <Flex direction="column" bgColor="#f2f2f2" alignItems="center">
            <Flex pl="20px" bgColor="#ffffff" h="50px" w="100%" alignItems="center" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;" gap="10px">
                <Text opacity="70%" fontSize="15px" cursor="pointer" onClick={() => { navigate("/") }}> Home </Text>
                <MdArrowForwardIos style={{ opacity: "60%", fontSize: "13px" }} />
                <Heading as="h1" fontSize="15px"> Bag </Heading>
            </Flex>
            <Flex
                direction={["column", "column", "column", "row"]}
                bgColor="#ffffff"
                width="96%"
                mt="20px"
                mb="20px"
                borderRadius="25px"
                p="30px"
                gap="20px"
            >
                <Flex direction="column" w="100%">
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} > BAG SUMMARY </h1>
                    <Flex direction="column" gap="10px" mt="10px" w="100%">

                        {
                            cartproduct.map((elem, id) => {
                                return (
                                    <Flex key={id} justifyContent="space-between" border="1px solid #f2f2f2" borderRadius="10px" >
                                        <Flex p="15px" gap="15px">
                                            <Image w="40px" src={elem.images[0]} alt="product" borderRadius="7px" />
                                            <Flex direction="column">
                                                <p>{elem.Title.substring(0, 60) + " . . ."}</p>
                                                <p style={{ fontWeight: 'bold', opacity: "90%" }} > ₹{elem.price} </p>
                                            </Flex>
                                        </Flex>
                                        <Flex justifyContent="center" alignItems="center" w="200px" pl="20px" pr="20px">

                                            <Flex w="100%" justifyContent="center">
                                                <RiDeleteBinLine fontSize="17px" color="#212529" onClick={() => { remove_item(elem) }} />
                                            </Flex>

                                            <Flex w="100%" justifyContent="space-around" border="1px solid #212529" p="5px" borderRadius="10px" bor>
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
                            backgroundColor: "black",
                            color: "white",
                            padding: "12px",
                            borderRadius: "6px",
                            marginTop: "30px",
                            opacity: total > 0 ? "100%" : "50%",
                            pointerEvents: total > 0 ? "auto" : "none"
                        }}
                        onClick={() => { navigate("/checkout") }}
                    >
                        ₹{total} PLACE ORDER
                    </button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export { CartPage };