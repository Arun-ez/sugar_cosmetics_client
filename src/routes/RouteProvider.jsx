
import { useState, useEffect, useContext } from 'react';
import { Box } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { Product } from '../components/Product/Product';
import { Search } from '../components/Search/Search';
import { Loginpage } from '../components/Loginpage/Loginpage';
import { ViewFinder } from '../components/ViewFinder/ViewFinder';
import { GlobalContext } from '../contexts/GlobalContextProvider';
import { AuthValidationLayer } from './AuthValidationLayer';
import { WishList } from '../components/WishList/WishList';
import CartPage from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import Offerspage from '../components/Offerspage/Offerspage';

const RouteProvider = ({ ad_display }) => {

    let { isLoginPage } = useContext(GlobalContext);
    let [window_width, set_window_width] = useState(0);
    let [limit, set_limit] = useState(4);

    const limit_decision = () => {
        let width = window.innerWidth;
        if (width <= 1500 && width > 1180) {
            return 3;
        } else if (width <= 1180 && width > 600) {
            return 2;
        } else if (width <= 600) {
            return 1;
        } else {
            return 4;
        }
    }

    window.addEventListener("resize", () => {
        set_window_width(window.innerWidth);
        set_limit(limit_decision());
    })

    useEffect(() => {
        set_window_width(window.innerWidth)
        set_limit(limit_decision());
    }, [])

    return (
        <Box
            mt={isLoginPage ? ["0px", "0px", "0px", "0px"] : ad_display === "none" ? ["55px", "55px", "80px", "135px"] : ["85px", "85px", "110px", "165px"]}
            minH="80vh"
        >
            <Routes>
                <Route path='/' element={<Home limit={limit} />} />
                <Route path='/collections/:product' element={<Product />} />
                <Route path='/search' element={<Search />} />
                <Route path='/account' element={<AuthValidationLayer comp="login"> <Loginpage /> </AuthValidationLayer>} />
                <Route path='/products/:category/:id' element={<ViewFinder window_width={window_width} limit={limit} />} />
                <Route path='/account/wishlist' element={<AuthValidationLayer> <WishList /> </AuthValidationLayer>} />
                <Route path='/cart' element={<AuthValidationLayer> <CartPage /> </AuthValidationLayer>} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/offers' element={<Offerspage />} />
            </Routes>
        </Box>

    )
}

export default RouteProvider;
