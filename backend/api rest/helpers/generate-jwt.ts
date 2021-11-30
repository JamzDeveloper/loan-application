import jwt from "jsonwebtoken";

const generateJwt = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    jwt.sign(
      payload,
      "" + process.env.SECRETORPRIVATEKEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJwt;
