import { DataForCity } from "./../api/";

export default {

  async cityPageData(req, res) {
    try {
      const code = req.params.code;
      const promises = [
        DataForCity(code),
      ];
      return Promise.all(promises)
        .then(result => {
          const data = {};
          result.forEach(elem => {
            Object.assign(data, elem)
          });
          return res.status(200).json(data)
        });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
