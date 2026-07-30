import User from "../schema/user.js"


export const getUserByEmail = async(email) =>{
    const user = await User.findOne({email});
    return user;
}

export const getUserByName = async(name) =>{
    const user = await User.findOne({username : name});
    return user;
}

export const createUser = async(user) => {
    const newUser = await User.create(user);
    return newUser;
}

export const getUsers = async() => {
    const user = await User.find();
    return user;
}

export const getUserById = async(id) => {
    const user = await User.findById(id);
    return user;
}

export const deleteUser = async(id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
}

export const updateUser = async(id, user) => {
    const response = await User.findByIdAndUpdate(id, user, {new : true});
    return response;
}

export const getByToken = async(token)=>{
    const user = await User.findOne(
        {
            verificationToken : token
        }
    );
    return user;
}