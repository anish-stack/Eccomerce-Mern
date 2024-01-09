const sendToken = async(user,res,StautsCode)=>{

try {

    const Token = user.getJwtToken()

    // Expire Time In Hours

    const expirationInHours = parseInt(process.env.JWT_EXPIRES_IN);

    //Expir In days

    const expirationTime = new Date(Date.now() + expirationInHours * 60 * 60 * 1000); 

         const options = {
         expires: expirationTime,
        httpOnly: false,
        secure: true,
      };

      // Set the 'token' cookie with the token value and options
        res.cookie('token', Token,options);

        res.status(StautsCode).json({
            success: true,
            login: user,
            Token,
          });

} catch (error) {
    console.log("error In Genratibg Token",error)
}


}


module.exports = sendToken