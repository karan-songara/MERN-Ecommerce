import mongoose from 'mongoose';

const schema = mongoose.Schema({
    CategoryImage:String,
    CategoryName: String,
})

export default mongoose.model("categories",schema);

//ele : 67c512e4a68626ad083c6772
//clo : 67c5131aa68626ad083c6774