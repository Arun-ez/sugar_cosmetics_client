import { Box, Flex, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import '../Cart/cart.css'
import './cart.css'

export default function CartPage() {
    const [cartproduct, setCartproduct] = useState([]);
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0)

    let navigate = useNavigate();

    useEffect(() => {
        fetchcart();
        window.scroll(0, 0);
        document.title = "Sugar Cosmetics-Bag";
    }, [])

    let jsondata;
    async function fetchcart() {
        let res = await fetch('https://rich-pink-anemone-tie.cyclic.app/cart');
        jsondata = await res.json();
        setCartproduct(jsondata);
        totalfunc();
    }

    async function addCount(qty, id) {
        let res = await fetch(`https://rich-pink-anemone-tie.cyclic.app/cart/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ qty: qty + 1 }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.status == 500) {
            fetchcart();
            totalfunc()
        }
    }

    async function minusCount(qty, id) {
        if (qty > 1) {
            let res = await fetch(`https://rich-pink-anemone-tie.cyclic.app/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ qty: qty - 1 }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.status == 500) {
                fetchcart();
                totalfunc()
            }
        }

    }

    function totalfunc() {
        let currtotal = 0;
        jsondata?.map((elem, index) => {
            currtotal += elem.Price * elem.qty
        }, 0)
        setTotal(currtotal);

    }

    async function handledel(id) {
        let res = await fetch(`https://rich-pink-anemone-tie.cyclic.app/cart/${id}`, {
            method: "DELETE",
        })
        console.log(res);
        if (res.status == 500) {
            fetchcart();
            totalfunc()
        }
    }

    function nowcheckout() {
        navigate('/checkout');
    }



    return (

        <div >
            <Navbar />
            <div className='maindiv' >
                <div className='left' >
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >BAG SUMMARY</h1>
                    <div className='innerleft' >

                        {
                            cartproduct.map((elem, id) => {
                                return (
                                    <div className='cartdiv' key={id} >
                                        <div className='innercartdiv' >
                                            <img className='product-img' src={elem.images[0]} alt="" />
                                            <div>
                                                <p>{elem.Title}</p>
                                                <p style={{ fontWeight: 'bold' }} > {elem.Price} </p>
                                            </div>
                                        </div>
                                        <div className='leftcartdiv'>
                                            <button className='delbutton' onClick={() => { handledel(elem.id) }} ><img src="https://img.icons8.com/small/256/filled-trash.png" alt="" /></button>
                                            <div className='count-div' >
                                                <button className='count-btn' onClick={() => { addCount(elem.qty, elem.id) }} >+</button>
                                                <button className='count-btn' > {elem.qty} </button>
                                                <button className='count-btn' onClick={() => { minusCount(elem.qty, elem.id) }} >-</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="right">
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >APPLY COUPON</h1>
                    <div className="coupoun">
                        <input type="text" placeholder='Enter gift code or discount code' />
                        <button>Apply</button>
                    </div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >PRICE DETAILS</h1>
                    <div className='pricedetails' >
                        <div className='innerpricediv' >
                            <p>Subtotal</p>
                            <p>Discout</p>
                            <p>SUGAR FAM rewards</p>
                            <p>Shipping</p>
                            <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >Total</h1>
                        </div>
                        <div className='leftpricediv'>
                            <p>₹{total}</p>
                            <p>₹0.00</p>
                            <p>₹0.00</p>
                            <p>₹0.00</p>
                            <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} >₹{total}</h1>
                        </div>
                    </div>
                    <button className='placeorder' onClick={nowcheckout} > ₹{total} PLACE ORDER</button>
                </div>

            </div>

        </div>
    )
}

{/* <div className='pricedetails' >
                        <div className='innercartdiv' >
                            <p>Subtotal</p>
                            <p>Discout</p>
                            <p>SUGAR FAM rewards</p>
                            <p>Shipping</p>
                            <h1 style={{fontWeight:'bold', fontSize:'20px'}} >Total</h1>
                        </div>
                        <div className='leftcartdiv'>
                            <p>850</p>
                            <p>0.00</p>
                            <p>0.00</p>
                            <p>0.00</p>
                            <h1 style={{fontWeight:'bold', fontSize:'20px'}} >850</h1>
                        </div>
    </div> */}