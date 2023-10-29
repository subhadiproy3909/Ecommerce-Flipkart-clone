const router = require('express').Router();
const User = require('../database/models/userModel');


router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, cpassword, phone } = req.body;

        if (!firstname || !lastname || !username || !email || !password || !phone) {
            return res.json({ message: "Please fill all the fields" });
        }

        const isUserExists = await User.exists({ email: email });

        if (isUserExists) {
            return res.json({ message: "Account already exists" });
        }

        if(password !== cpassword){
            return res.json({message: "Password and confirm password must be same"});
        }

        try {
            const user = await User.create({ firstname, lastname, username, email, password, phone });

            if (user) {
                return res.json({
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    phone: user.phone,
                })
            }
        }
        catch (err) {
            console.log("insertData error: ", err.message);
        }


    }
    catch (err) {
        console.log(`signup api error: ${err.message}`);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        
        if (!username || !password) {
            return res.json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({
            $or: [
                { email: username },
                { phone: username }
            ]
        });
        
        
        // console.log(user);
        if (user && await user.hashedPassword(password)) {
            // console.log(user);
            return res.json({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
                phone: user.phone,
            });
        }
        else{
            res.send("Invalid Cradentials");
        }
    } catch (error) {
        console.log(`login server error: ${error.message}`);
    }
})


module.exports = router;