import { db } from "../configurations/db.config.js";
import { UsersClass } from "../db/users.db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const usersObject = new UsersClass(db);
const login = async (req, res, next) => {
    try {
        const { phone, password, email } = req?.body;
        if (!phone && !email) {
            return res.status(400).json({
                message: "Email or Phone is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }
        const UserExists = await usersObject.userExist(email, phone);
        if (!UserExists) {
            return res.status(400).json({
                message: "Invalid email/phone or password"
            });
        }
        const passwordMatch = await bcrypt.compare(
            password,
            UserExists.password
        );
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email/phone or password"
            });
        }
        const token = jwt.sign(
            {
                id: UserExists.id,
                email: UserExists.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.cookie("token", token, {  httpOnly: true,  secure: false,  sameSite: "lax",  maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            message: "Login Successful"
        });
    } catch (err) {
        next(err);
    }
};

const signup = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const UserExists = await usersObject.userExist(email, phone);
        if (UserExists) {
            return res.status(400).json({
                message: "Email or phone already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersObject.createUser({ name, email, phoneNo: phone, password: hashedPassword });
        return res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const user = await usersObject.updateUser(req.user.id, { name,email, phoneNo: phone,updateAt: new Date()});
        return res.status(200).json({message: "Profile updated successfully",user });
    } catch (err) {
        next(err);
    }
};

export default {login,signup,updateProfile
};