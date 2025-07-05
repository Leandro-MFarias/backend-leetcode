import axios from "axios";

export async function responseJudge(req, res) {
  const { token } = req.params;

  const response = await axios.get(`${process.env.JUDGE0_API_URL}/${token}`, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  });
  res.status(200).json(response.data);
}
