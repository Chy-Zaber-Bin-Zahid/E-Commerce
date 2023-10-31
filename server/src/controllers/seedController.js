// const data = require("../data");
// const User = require("../models/userModel");

// const seedUser = async (req, res, next) => {
//   try {
//     // delete all user
//     await User.deleteMany({});

//     // inserting new user
//     const users = await User.insertMany(data.users);

//     // successful response
//     return res.status(201).json(users);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { seedUser };
