import { DataForCity } from "./../api/";

export default {

  async cityPageData(req, res) {
    try {
      const code = req.params.code;
      const data = await DataForCity(code);
      return res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
