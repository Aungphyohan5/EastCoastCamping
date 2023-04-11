
const { User, CampGround, Review } = require('../models');
const bcrypt = require('bcrypt');

const resolvers = {

  // QUERIES
  Query: 
  {

    // ---------- USER QUERIES ----------
    // get user by id
    userById: async (parent, args) => {
      const user = await User.findById(args.id);
      if (!user) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return user;
      }
    },
    // get all users
    allUsers: async (parent, args) => {
      return await User.find();
    },

    // ---------- CAMPGROUND QUERIES ----------
    // get camp by id
    campById: async (parent, args) => {
      const camp = await CampGround.findById(args.id);
      if (!camp) {
        throw new Error(`camp with id: ${args.id} not found!`);
      } else {
        return camp;
      }
    },
    // get all camps
    allCamps: async (parent, args) => {
      return await CampGround.find();
    },

    // ---------- REVIEW QUERIES ----------
    // get all reviews
    allReviews: async (parent, args) => {
      return await Review.find().populate('user').populate('camp');
    }
    
  },

  // MUTATIONS
  Mutation: {

    // ---------- USER MUTATIONS ----------
    // create new user
    createUser: async (parent, args) => {
      const { name, email, password } = args;

      // bcyrpt password authentication
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // reset the args password to the new hashed password
      args.password = hashedPassword;

      const newUser = new User(args);
      return await newUser.save();
    },
    // delete user by id
    deleteUser: async (parent, args) => {
      const deletedUser = await User.findByIdAndDelete(args.id);
      if (!deletedUser) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return deletedUser;
      }
    },

    // ---------- REVIEW MUTATIONS ----------
    createReview: async (parent, { userId, campId, rating, text }) => {
      
      // validation to check if userId and campId exist
      const validUser = await User.findById(userId);
      if (!validUser) {
        throw new Error(`Invalid userId: ${userId}.`);
      }
      const validCamp = await CampGround.findById(campId);
      if (!validCamp) {
        throw new Error(`Invalid campground id: ${campId}`);
      }

      // write the review and save
      const newReview = new Review({
        user: userId,
        camp: campId,
        rating,
        text
      })
      console.log(newReview);
      return await newReview.save();
    }
  }
}

module.exports = resolvers;