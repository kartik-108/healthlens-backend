const pdf = require("pdf-parse");

exports.analyzeReport = async (req, res) => {

  try {

    const pdfBuffer = req.file.buffer;

    const data = await pdf(pdfBuffer);

    const extractedText = data.text;

    // AI analysis placeholder
    const analysis = {
      summary: "Medical report processed successfully.",
      suggestion: "Consult a physician if abnormal values detected."
    };

    res.json({
      extractedText,
      analysis
    });

  } catch (error) {

    res.status(500).json({
      message: "PDF analysis failed",
      error: error.message
    });

  }

};