import jwtUtil from "../util/jwtUtil.js";

function authorize(req, res, next) {
  const authHeader = req.headers["authorization"]
    ? req.headers["authorization"]
    : undefined;

  if (!authHeader) {
    res.status(400).json({ msg: "Authorization header is missing" }); //bad request
  } else {
    const authToken = authHeader.replace("Bearer ", "");
    try {
      // försök verifera **
      let userdetails = jwtUtil.verifytToken(authToken); // may throw jwt error-to-be-caught
      req.userdetails = userdetails;

      next(); // proceed to next step in express
    } catch (err) {
      // **  men om det inte går...
      console.log(req.ip, err.serverMessage);

      res.status(403).json({ msg: err.clientMessage }); //forbidden
    }
  }
}

export default { authorize };
