const { default: axios } = require("axios");



async function GET(){
    try {
        const url=``;
        const response=await axios.get();
        console.log(response);

        return res.json({status : 200, message: `${error.message}`  });
        
    } catch (error) {
        console.log(`Error in chatbot--${error.message}`);
        return res.json({status : 401, message: `${error.message}`  });
        
    }
}