const mongoose = require('mongoose');


const connnectDB = async()=>{
   await mongoose.connect('mongodb+srv://deepka1000_db_user:6YCau375J8JCBhu0@democluster.ieeecnm.mongodb.net/DevTinder')
}

module.exports= {connnectDB}

