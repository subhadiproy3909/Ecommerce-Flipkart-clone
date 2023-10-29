import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';



import { getProducts } from '../../redux/actions/productActions';



const SearchContainer = styled(Box)`
    border-radius: 2px;
    margin-left: 10px;
    width: 38%;
    background-color: #fff;
    display: flex;
`;

const SearchIconWrapper = styled(Box)`
    margin-left: auto;
    padding: 5px;
    display: flex;
    color: blue;
`;

const ListWrapper = styled(List)`
    position: absolute;
    color: #000;
    background: #FFFFFF;
    margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)`
    font-size: unset;
    width: 100%;
    padding-left: 20px;
`;

const Search = () => {
    const [text, setText] = useState();
    const [open, setOpen] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(getProducts());
    }, [dispatch])

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => getText(e.target.value)}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                text &&
                <ListWrapper hidden={open}>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem>
                                <Link
                                    to={`/product/${product.p_id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => setOpen(true)}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search;