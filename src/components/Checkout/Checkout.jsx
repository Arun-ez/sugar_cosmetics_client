import Navbar from "../Navbar/Navbar"
import { useState, useEffect } from "react";
import '../Checkout/checkout.css'
import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const [cartproduct, setCartproduct] = useState([]);
    const [total, setTotal] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        fetchcart();
    }, [])

    let jsondata;
    async function fetchcart() {
        let res = await fetch('https://rich-pink-anemone-tie.cyclic.app/cart');
        jsondata = await res.json();
        console.log(jsondata);
        setCartproduct(jsondata);
        totalfunc();
    }

    function totalfunc() {
        let currtotal = 0;
        jsondata?.map((elem, index) => {
            currtotal += elem.Price * elem.qty
        }, 0)
        console.log(currtotal);
        setTotal(currtotal);

    }

    return (
        <div className="maindiv" >
            <Navbar />
            <div className="left">
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
                <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} > BAG SUMMARY </h1>
                <div className="productreview">


                    {
                        cartproduct.map((elem, id) => {
                            return (
                                <div className='cartdiv' >
                                    <div className='innercartdiv' >
                                        <img className='product-img' src={elem.images[0]} alt="" />
                                        <div>
                                            <p>{elem.Title}</p>
                                            <p style={{ fontWeight: 'bold' }} > {elem.Price} </p>
                                        </div>
                                    </div>
                                    <div className='leftcartdiv'>
                                        {/* <button className='delbutton'  ><img src="https://img.icons8.com/small/256/filled-trash.png" alt="" /></button> */}
                                        <div className='count-div' >
                                            {/* <button className='count-btn'  >+</button> */}
                                            <button className='count-btn' >qty : {elem.qty} </button>
                                            {/* <button className='count-btn'  >-</button> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


            </div>
            <div className="right">
                <h1 style={{ fontWeight: 'bold', fontSize: '20px' }} > PAYMENT METHOD </h1>
                <div className="paymentmethod">
                    <div className="paymentleft">
                        <button>UPI ID</button>
                        <button>CARDS</button>
                        <button>PAY LATER</button>
                        <button>CARDLESS EMI</button>
                        <button>WALLETS</button>
                        <button>NET BANKING</button>
                        <button>PAY ON DELIVERY</button>
                    </div>
                    <div className="paymentright">
                        <p>Transfer Money From Your Bank Account Using UPI Registered VPA</p>
                        <div className="weaccept">
                            <p>We accept</p>
                            <button><img src="data:image/png;base64,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" alt="" /></button>
                            <button><img src="data:image/png;base64,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" alt="" /></button>
                            <button><img src="data:image/png;base64,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" alt="" /></button>
                            <button><img src="data:image/png;base64,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" alt="" /></button>
                        </div>
                        <input type="text" placeholder="ENTER UPI ID" />
                        <button className="proceed" onClick={() => {
                            alert("payment successful");
                            navigate("/");
                        }}>PROCEED TO PAYMENT ₹ {total} </button>
                    </div>
                </div>
            </div>
        </div>
    )
}