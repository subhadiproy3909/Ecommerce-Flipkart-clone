
import { useState, useContext } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';

import { authenticateSignup, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/ContextProvider';


const Component = styled(DialogContent)`
    height: 80vh;
    width: 100vh;
    padding: 0;
    padding-top: 0;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

// margin: auto 0 5px 0;
const CreateAccount = styled(Typography)`
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

// overflow: auto;
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
// height: 70vh;
    
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 28%;
    height: 83.6%;
    padding: 39px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen}) => {
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    // const [ error, showError] = useState(false);
    const [ account, toggleAccount ] = useState(accountInitialValues.login);

    const {setAccount} = useContext(DataContext);

    // useEffect(() => {
    //     showError(false);
    // }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(!response) 
            return;
        
        if(response.message){
            alert(response.message);
            return;
        }

        handleClose();
        localStorage.setItem("flipkart", JSON.stringify(response));
        setAccount(JSON.parse(localStorage.getItem("flipkart")));
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        if(!response) return;
        
        if(response.message){
            alert(response.message);
            return
        }
        handleClose();
        localStorage.setItem("flipkart", JSON.stringify(response));
        setAccount(JSON.parse(localStorage.getItem("flipkart")));
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20, fontSize: 14}}>{account.subHeading}</Typography>
                    </Image>
                    {
                        account.view === 'login' ? 
                        <Wrapper>
                            <TextField type='text' style={{marginTop: 10, fontSize: 5}} variant="standard" onChange={(e) => onValueChange(e)} name='username' label='Enter Email/Mobile number' />
                            {/* { error && <Error>Please enter valid Email ID/Mobile number</Error> } */}
                            <TextField type='password' style={{marginTop: 15}}  variant="standard" onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{textAlign:'center'}}>OR</Text>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                        </Wrapper> 
                        : 
                        <Wrapper>
                            <TextField type='text' style={{marginTop: 5, fontSize: 5}}  variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField type="text" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField type="text" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField type="email" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField type="password" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField type="password" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='cpassword' label='Confirm Password' />
                            <TextField type="text" style={{marginTop: 13}}  variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;