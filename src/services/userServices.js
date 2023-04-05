import { getCollection } from "../mongodb/mongodbClient.js";
import bcrypt from "bcrypt";

async function loginUser(user) {
  let dbUser = await getCollection("users").findOne({
    username: user.username,
  });

  if (!dbUser) {
    return { status: 400, msg: "Incorrect username or password" };
  }

  let passwordMatch = await bcrypt.compare(user.password, dbUser.password);

  if (passwordMatch) {
    return {
      status: 200,
      msg: "Logged in " + dbUser.username,
      userDetails: {
        userid: dbUser._id,
        username: dbUser.username,
        role: dbUser.role,
        email: dbUser.email,
        phone: dbUser.phone,
      },
    };
  } else {
    return { status: 400, msg: "Incorrect username or password" };
  }
}

async function registerUser(userDetails) {
  let dbUser = await getCollection("users").findOne({
    username: userDetails.username,
  });

  if (!dbUser) {
    userDetails.password = await bcrypt.hash(userDetails.password, 10);
    let result = await getCollection("users").insertOne(userDetails);
    return { status: 201, msg: "Created", result: result };
  } else {
    return { status: 400, msg: "User already exist" };
  }
}

export default { loginUser, registerUser };
