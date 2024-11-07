import crypto from 'crypto';

const hashPassword = (req, res, next) => {
  const {password} = req.body;
  const salt = crypto.randomBytes(8).toString('hex'); // Generate a random salt that is 8 bytes long
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex'); // Hash the password using the salt
  req.body.salt = salt;
  req.body.sha256 = hash;
  next();
}

export default hashPassword; 