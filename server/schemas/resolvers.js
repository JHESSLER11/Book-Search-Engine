const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const auth = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.id })
                    .select('-__v -password')
                    .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('Not logged in')
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // all conditional are pass create token
            const token = auth.signToken(user);
      
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = auth.signToken(user);
      
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { savedBooks: args }},
                    { new: true, 
                    runValidators: true }
                );
                return user
            }
        }
    }
}