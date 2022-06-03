const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateJwt } = require('../helpers/jwt');

const createUser = async (req = request, res = response)=>{
    

    try {
        const { email, password} = req.body;

        let user = await User.findOne({ email });

        if (user){
            res.status(400).json({
                ok: false,
                message: 'Email is already in use'
            });
    
        }

        user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJwt(user.id, user.name); 

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'problem creating user. Contact admin'
        });

    }

}

const userLogin = async (req = request, res = response)=>{
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                ok: false,
                // Shoul give generic message, for testing purposes we use specific message
                message: 'Theres no user with that email'
            });
        }

        // check if password is equal
        const passwordsMatch = bcrypt.compareSync(password, user.password);

        if(!passwordsMatch) {
            return res.status(400).json({
                ok: false,
                // Shoul give generic message, for testing purposes we use specific message
                message: 'Password incorrect'
            });
        }

        // Generate JWT
        const token = await generateJwt(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Problem login user. Contact admin'
        });

    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generateJwt(uid,name); 
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    userLogin,
    renewToken
}