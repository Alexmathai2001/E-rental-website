


module.exports ={
    logout : (req,res) => {
        try {
              // Destroy the session
                req.session.destroy((err) => {
                    if (err) {
                    console.error('Error destroying session:', err);
                    } else {
                    res.redirect('/User/landing'); 
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
}