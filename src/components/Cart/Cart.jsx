import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import '../Cart/cart.css'
import './cart.css'
import { useSelector } from 'react-redux';

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
        document.title = "Sugar Cosmetics-Bag";
        load();
    }, [])


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
                                            <button className='delbutton' onClick={() => { remove_item(elem) }} ><img src="https://img.icons8.com/small/256/filled-trash.png" alt="" /></button>
                                            <div className='count-div' >
                                                <button className='count-btn' onClick={() => { quantity_handler(elem, 1) }} >+</button>
                                                <button className='count-btn' > {elem.qty} </button>
                                                <button className='count-btn' disabled={elem.qty <= 1} onClick={() => { quantity_handler(elem, -1) }} >-</button>
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
                    <button
                        className='placeorder'
                        style={total > 0 ? { opacity: "100%", pointerEvents: "auto" } : { opacity: "50%", pointerEvents: "none" }}
                        onClick={() => { navigate("/checkout") }}
                    >
                        ₹{total} PLACE ORDER
                    </button>
                </div>

            </div>

        </div>
    )
}

export { CartPage };