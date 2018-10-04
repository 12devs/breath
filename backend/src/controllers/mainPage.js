import { MainData } from "../api";

export default {

  async mainPageData(req, res) {
    try {
      const data = await MainData();
      return res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
