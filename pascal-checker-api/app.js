const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Pascal checker API is running"
  });
});

app.post("/check-task", (req, res) => {
  const { taskId, code } = req.body;

  if (!taskId || !code) {
    return res.status(400).json({
      ok: false,
      error: "taskId and code are required"
    });
  }

  const tasks = {
    task1: "Hello, Pascal!",
    task2: "your name",
    task3: "I am learning Pascal\nat SFedU",
    task4: "Welcome to Pascal programming"
  };

  if (!tasks[taskId]) {
    return res.status(400).json({
      ok: false,
      error: "Invalid taskId"
    });
  }

  return res.json({
    ok: true,
    message: "API works successfully",
    taskId: taskId,
    receivedCode: code,
    expectedOutput: tasks[taskId]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});