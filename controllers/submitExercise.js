import axios from "axios";

export async function submitExercise(req, res) {
  const { functionName, sourceCode, languageId, testCases } = req.body;

  if (!functionName || !sourceCode || !languageId || !testCases) {
    return res.status(400).json({ message: "Algum campo está vazio" });
  }

  const call = testCases
    .map((tinput) => `console.log(${functionName}(${tinput.input}))`)
    .join("\n");

  const finalCase = `${sourceCode}\n\n${call}`;
  const expected = testCases.map((toutput) => toutput.expected).join("\n");

  try {
    const submission = await axios.post(
      `${process.env.JUDGE0_API_URL}?wait=false`,
      {
        source_code: finalCase,
        language_id: languageId,
        expected_output: expected,
        stdin: "",
        redirect_stderr_to_stdout: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
      }
    );

    res.status(201).json(submission.data);
  } catch (error) {
    console.log("POST submission ERRO:", error.response?.data || error.message);
    res.status(500).json({ message: "Erro no servidor ao enviar a resposta" });
  }
}
