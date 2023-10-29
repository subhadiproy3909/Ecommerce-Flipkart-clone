import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components.

import NavBar from "./Navbar";
import Banner from "./Banner";
import Slide from "./SlidePart";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import { getProducts } from "../../redux/actions/productActions";



const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;


const Home = () => {

    const Products = useSelector(state => state.getProducts);
    const { products } = Products;

    const dispatch = useDispatch();
    useEffect(() => {
        return () => dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products}/>
                <MidSection />
                <Slide products={products} title="Discounts for you " timer={false} />
                <Slide products={products} title="Suggesting Items" />
                <Slide products={products} title="Top Selection" timer={false} />
                <Slide products={products} title="Recommended Items" timer={false} />
                <Slide products={products} title="Trending Offers" timer={false} />
                <Slide products={products} title="Season's top picks" timer={false} />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
            </Component>
        </>
    )
};


export default Home;