
import React from 'react';
import { Box } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Product from '../components/Product/Product';
import { Search } from '../components/Search/Search';

const RouteProvider = () => {
    return (
        <Box mt={["55px", "55px", "80px", "135px"]} minH="80vh">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collections/:product' element={<Product />} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </Box>

    )
}

export default RouteProvider;
