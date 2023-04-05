import express from "express";
import userServices from "../services/userServices.js";
import jwtUtil from "../util/jwtUtil.js";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  if (req.body.username == undefined || req.body.password == undefined) {
    res.status(400).json({ msg: "Missing authentication details" }); //bad request --> bad data format
  } else {
    const authUser = await userServices.loginUser(req.body);
    if (authUser.status == 200) {
      const userDetails = authUser.userDetails;

      const token = jwtUtil.generateToken(userDetails);
      res.status(200).json({
        jwt: token,
        userDetails: userDetails,
      });
    } else {
      res.status(400).json(authUser.msg);
    }
  }
});

authRouter.post("/register", async (req, res) => {
  console.table(req.body);
  if (
    req.body.username == undefined ||
    req.body.password == undefined ||
    req.body.email == undefined ||
    req.body.phone == undefined
  ) {
    return res.status(400).json({ msg: "Missing user details" }); //bad request --> bad data format
  }

  req.body.role = req.body.role ? req.body.role : "customer";
  let registered = await userServices.registerUser(req.body);
  console.log(registered);
  res.status(registered.status).json(registered.msg);
});
