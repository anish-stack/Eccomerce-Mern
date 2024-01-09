//imports
const User = require("../models/user.model");
const sendEmail = require("../utils/sendMail");
const sendToken = require("../utils/SendToken")


// Register
exports.RegisterUser = async (req, res) => {
  try {
    const { Name, Email, Password, ContactNumber, Role } = req.body;

    // validate if no any empty feild
    if (!Name || !Email || !Password || !ContactNumber) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //save a user in varibale 

    const newUser = new User({
      Name,
      Email,
      Password,
      ContactNumber,
      Role,
    });

    const Options = {
      email: Email,
      subject: "Welcome To Eccomerce Project",
      message: `Congratulations Buddy ${Name}`,
    };
    await sendEmail(Options);
    await newUser.save();
    res.status(200).json({
      success: true,
      data: newUser,
      message: "Register Successfull",
    });

    console.log(newUser);

    console.log(req.body);
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};


//Login 
exports.LogginUser = async (req,res) =>{
    try {
        
        const {Email , Password} = req.body

        if(!Email || !Password){
            return res.status(403).json({
                success: false,
                message: "Please enter all fields"
            })
        }
      const checkUser = await User.findOne({Email})

      if(!checkUser){
        return res.status(401).json({
            success: false,
            message: "User Not Found"
        })
    }

    const PasswordMatch = await checkUser.comparePassword(Password)
    if (!PasswordMatch) {
      return res.status(401).json({
        succes:false,
        message:"Invalid Password"
      })
    }   
    
    await sendToken(checkUser, res, 200);
    } catch (error) {
        console.log(error)
    }
}


//Logout

exports.LogoutUser = async (req,res) =>{
  //clear cookie
  try {
    res.cookie('Token')
    // console.log('LogoutUser')

    return res.status(200).json({
      success: true,
      message:'Logged out'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:'Internal Server Error'
    })
  }
}


