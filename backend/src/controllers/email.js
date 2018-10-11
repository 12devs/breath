import emailExistence from 'email-existence';
import { getCurrentLocation } from '../api/location';
import { Email } from './../models';

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (error, response) => {
      if (error || (!response)) {
        return reject(new Error(`email ${email} doesn't exist`))
      }
      return resolve(true)

    })
  })
}

export default {

  async saveEmail(req, res) {
    try {
      const { code, email } = req.params;
      console.log(code, email);
      const promises = [
        getCurrentLocation(code),
        verifyEmail(email),
      ];
      return Promise.all(promises)
        .then(async () => {
          console.log("ok");
          const obj = await Email.findOne({ where: { email } });
          if (obj) {
            await obj.update({ code, updated_at: new Date() });
          } else {
            console.log({ email, code, created_at: new Date(), updated_at: new Date() });
            await Email.create({ email, code, created_at: new Date(), updated_at: new Date() });
          }
          res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
          console.log(1, err);
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}
