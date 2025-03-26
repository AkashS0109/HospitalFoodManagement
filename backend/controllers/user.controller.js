import { User } from "../Schema/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';



export const createUser = async (req, res) => {
  try {
    // Destructure user details from the request body
    const { name, email, password, role, status ,phoneNo} = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash( password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ,  // Default role if not provided
      phoneNo:phoneNo,
      status: status , // Default status if not provided
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: 'User created successfully', user: { name, email, role, status } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      return res.status(400).json({ message: "Something is missing" });
    }

    let user = await User.findOne({ email });
    if (!user) {
       return res.status(400).json({message:"User Not Found"});
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Incorrect Email or Password",
          success: false,
        });
      }
    }

   

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
     
    };

    res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json({
      message: `Welcome back ${sanitizedUser.name}`,
      user: sanitizedUser,
      success: true,
    });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const logout = (req, res) => {
  try {
    // Clear the cookie by setting its expiration date to the past
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });

    // Optionally, you can clear any session data if using sessions
    req.session = null;

    // Send success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
  }
};






export const getAllMembers= async(req,res)=>{
  try {
    const users = await User.find({ role: { $in: ["cook", "delivery"] } });
    if(!users){
      res.status(400).json({message:"Users is empty "})
    }
    res.status(200).json({users})
  } catch (error) {
    console.log(error);
  }
}

export const updateProfile = async(req,res)=>{

}