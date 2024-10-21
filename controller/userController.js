/*import User from "../model/userModel.js";

export const create = async (req,res) =>{
    try{
        const userData = new User(req.body);
        const {description} =userData;

        const userExist = await User.findOne({description});
        if(userExist){
            return res.status(400).json({message:  "User already Exist."});
        }
        const savedUser = await savedUser.save();
        res.status(200).json(savedUser);
    }catch (error){
        res.status(500).json({error:"Internal Server error."});
    }
}


export const fetch = async (req, res) =>{
    try{
        return res.json("Hello World");
    }catch(error){
        res.status(500).json({error:"Internal Server error."});
    }
};*/
import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);  // Create a new user from request data
        const { description } = userData;    // Destructure 'description' for checking existing user

        // Check if a user with the same description already exists
        const userExist = await User.findOne({ description });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Save the new user to the database
        const savedUser = await userData.save();  // Correctly save 'userData'
        res.status(201).json(savedUser);  // Return the saved user with a 201 status
    } catch (error) {
        console.error('Error creating user:', error.message);  // Log the error for debugging
        res.status(500).json({ error: "Internal Server error." });  // Return 500 if an error occurs
    }
};

export const fetch = async (req, res) => {
    try {
       const users = await User.find();
       if (users.length===0){
        return res.status(404).json({message : "User Not Found"});
       }
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error." });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Received ID:', id);  // Log the ID for debugging

        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: "Internal Server error." });
    }
};
// Delete a user by ID
export const remove = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the user exists by ID
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }

        // Delete the user
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });  // Return success message
    } catch (error) {
        console.error('Error deleting user:', error.message);  // Log the error for debugging
        res.status(500).json({ error: "Internal Server error." });
    }
};