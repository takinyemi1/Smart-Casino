import bcrypt, { hash } from 'bcrypt'
import User from './models/User.js'
import connectToDatabase from './db/db.js'

const register = async () => {
    try {
        connectToDatabase();
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            firstName: "Smart Casino",
            lastName: "Admin",
            username: "scadmin1",
            gender: "undefined",
            email: "smart.casino.admin1@gmail.com",
            role: "admin",
            password: hashPassword,
        });

        await newUser.save();
        console.log("[SUCCESS] Admin user created successfully");

    } catch (error) {
        console.log("[ERROR] Error creating admin user", error);
    }
}

register();