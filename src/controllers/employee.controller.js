const express = require('express')
const { QueryTypes } = require('sequelize')
const db = require('../connection/db')
const Employee = db.employee
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid')
const Leave = db.leave
const sequelize = db.sequelize



const authenticator = require("../middelwares/authentication");
const saltRounds = 10;
const router = express.Router();

require("dotenv").config();
const Token = (user) => {
    return jwt.sign({ user }, process.env.SALT, { expiresIn: '25m' });
}

router.post("/signUp", async (req, res) => {
    try {
        const password = req.body?.password;

        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' })
            }
            req.body.password = hashedPassword
            try {
                const user = await Employee.create({
                    firstName: req.body?.firstName || 'dummy user',
                    lastName: req.body?.lastName || 'dummy user',
                    position: "developer",
                    email: req.body?.email || 'dummy user',
                    password: req.body?.password || 'dummy user',
                    total_available_leave: 10,
                    employee_Id: uuidv4()
                })

                let token = Token(user);
                res.header('Authorization', `Bearer ${token}`)
                res.status(201).json({ user: user.toJSON(), token: token })

            } catch (err) {
                res.status(403).json({ message: err })
            }
        })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})


router.post("/signIn", async (req, res) => {
    try {
        if (req.body?.email == null || req.body?.password == null) {
            return res.status(300).send({ message: "Please provide email and password" })
        }
        const user = await Employee.findOne({
            where: {
                email: req.body?.email
            }
        })
        if (user) {
            await Leave.create({
                'leave_Id': uuidv4(),
                'leave_employee_Id': user.employee_Id,
                'total_provided_leave': 18,
                'total_taken_leave': 7,
                'total_availble_leave': 11,
            })
            
            const hashedPassword = user.dataValues.password
            bcrypt.compare(req.body?.password, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).send({ message: err })
                }
                if (!result) {
                    return res.status(400).send({ message: 'Your email or password is wrong' })
                }
                let token = Token(user);
                res.header('Authorization', `Bearer ${token}`)
                res.status(200).send({ user: user, message: 'You are logged in successfully' })
                return
            })
        } else {
            res.status(300).send({ message: "Please sign-up in our application" })
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
})

router.post("/employee-leave",authenticator, async (req, res) => {
    try {
        const { userData } = req
        const { message } = req.body
        const keywordArr = message?.split(" ")
        const data = await sequelize.query(
            `SELECT total_provided_leave, total_taken_leave, total_availble_leave  FROM EmployeesMindInventory INNER JOIN LeaveMindInventory ON EmployeesMindInventory.employee_Id = LeaveMindInventory.employee_Id WHERE EmployeesMindInventory.employee_Id = ?`,
            {
                replacements: [userData.employee_Id],
                type: QueryTypes.SELECT
            }
        )

        if(keywordArr.includes('Leave') || keywordArr.includes('leave')){
            if(keywordArr.includes('total') || keywordArr.includes('Total')){
                res.status(200).json({data: data.total_provided_leave})
            }
            if(keywordArr.includes('left') || keywordArr.includes('Left') || keywordArr.includes('available') || keywordArr.includes('Available')){
                res.status(200).json({data: data.total_availble_leave})
            }
            if(keywordArr.includes('taken') || keywordArr.includes('Taken')){
                res.status(200).json({data: data.total_taken_leave})
            }
        }
        res.status(200).json({ message: "thank for messaging" })
    } catch (err) {
        res.status(500).send({ error: err })
    }
})



module.exports = router;