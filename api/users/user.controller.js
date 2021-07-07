const { create, getUser, getUserById, updateUser, deleteUser, getUserByEmail } = require("./user.service");
 
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = await hashSync(body.password, salt);
        create(body, (err,result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    succcess: 0,
                    messege: "database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    getInfo: (req,res) => {
        getUser((err,result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    messege: "database conection error"
                })
            }
                return res.status(200).json({
                    success: 1,
                    data: result
                })
        })
    },
    getUserById: (req,res) => {
        getUserById(req.params.id, (err,result) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    success: 0
                })
            }
            return res.status(400).json({result});
        })
    },
    updateUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, result) => {
            if(err){
                return err;
            }
            return res.json({result});
        })
    },
    deleteUser: (req, res) => {
        deleteUser( req.params.id, (err,result) => {
            if (err){
                console.log(err);
            }
            return res.json({result});
        } )
    },
    login: (req,res) => {
        const body = req.body;
        getUserByEmail(body.email, async (err,result) => {
            if (err){
                console.log(err);
            }
            if(!result){
                res.status(500).json({
                    messege: "invalid email or password"
                })
            }
            console.log(result);
            console.log(body.password, result.password);
            const fres = await compareSync(body.password, result.password);
            console.log(fres);
            if(fres){
                result.password = undefined;
                const jwt = sign({resullt: result}, "sec3", {expiresIn: "1h"});
                return res.json({token: jwt});
            }
            else{
                return res.json({messege: "invalid password"});
            } 
        })
    },
}