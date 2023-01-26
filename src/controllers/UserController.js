import User from '../models/User'

class UserController {
    static async registerUser(req, res) {
        const { name, email, phone, title, gender, password, department } = req.body
        try {
            const user = new User({
                name, email, phone, title, gender, password, department
            })
            await user.save()
            return res.status(201).json({ user })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

export default UserController
