// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const {AuthenticationError } = require('@apollo/server');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData;
            }
            throw AuthenticationError
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            // First we create the user
            const user = await User.create({ username, email, password });
            // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
            const token = signToken(user);
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
        
        },
        login: async (parent, { email, password }) => {
            // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
            const user = await User.findOne({ email });
      
            // If there is no user with that email address, return an Authentication error stating so
            if (!user) {
              throw AuthenticationError
            }
      
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPw = await user.isCorrectPassword(password);
      
            // If the password is incorrect, return an Authentication error stating so
            if (!correctPw) {
              throw AuthenticationError
            }
      
            // If email and password are correct, sign user into the application with a JWT
            const token = signToken(user);
      
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
        },
        saveBook: async (parent, {newBook}, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user,_id },
                    {$addToSet: {savedBooks:newBook}},
                    {new:true}
                )
                return updatedUser
            }
            throw AuthenticationError
        },
        removeBook: async (parent,{bookId}, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true }
                  );
                  return updatedUser;
            }
            throw AuthenticationError
        }
}
}

module.exports = resolvers;