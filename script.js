const STUDENT_API = "http://localhost:5010";
const COMPILER_API = "http://localhost:5009/api/run";

// ======================
// STUDENT ACCOUNT
// ======================

const btnSignup = document.getElementById("btnSignup");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

if (btnSignup) {
  btnSignup.onclick = async () => {
    const username = document.getElementById("suEmail").value.trim();
    const password = document.getElementById("suPass").value.trim();
    const msg = document.getElementById("suMsg");

    if (!username || !password) {
      msg.textContent = "Please enter email and password";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch(`${STUDENT_API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.error || "Signup failed";
        msg.style.color = "red";
        return;
      }

      msg.textContent = "Account created";
      msg.style.color = "limegreen";
      document.getElementById("who").textContent = username;
      localStorage.setItem("username", username);
    } catch (err) {
      msg.textContent = "Connection failed";
      msg.style.color = "red";
      console.error(err);
    }
  };
}

if (btnLogin) {
  btnLogin.onclick = async () => {
    const username = document.getElementById("liEmail").value.trim();
    const password = document.getElementById("liPass").value.trim();
    const msg = document.getElementById("liMsg");

    if (!username || !password) {
      msg.textContent = "Please enter email and password";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch(`${STUDENT_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.error || "Login failed";
        msg.style.color = "red";
        return;
      }

      msg.textContent = "Logged in";
      msg.style.color = "limegreen";
      document.getElementById("who").textContent = data.username;
      localStorage.setItem("username", data.username);
    } catch (err) {
      msg.textContent = "Connection failed";
      msg.style.color = "red";
      console.error(err);
    }
  };
}

if (btnLogout) {
  btnLogout.onclick = () => {
    localStorage.removeItem("username");

    const who = document.getElementById("who");
    const bestScore = document.getElementById("bestScoreUi");

    if (who) who.textContent = "Guest";
    if (bestScore) bestScore.textContent = "0";
  };
}

// ======================
// COMPILER
// ======================

async function checkTask(taskId, textareaId, resultId) {
  const code = document.getElementById(textareaId).value.trim();
  const result = document.getElementById(resultId);

  if (!code) {
    result.textContent = "Please paste your code first.";
    result.style.color = "red";
    return;
  }

  result.textContent = "Compiling...";
  result.style.color = "inherit";

  try {
    const response = await fetch(COMPILER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    result.textContent = data.output || "No output returned.";
    result.style.color = "limegreen";
  } catch (err) {
    result.textContent = "Connection failed.";
    result.style.color = "red";
    console.error(err);
  }
}

async function runMainCompiler() {
  const code = document.getElementById("mainCompilerCode").value.trim();
  const output = document.getElementById("mainCompilerOutput");

  if (!code) {
    output.textContent = "Please write code first.";
    output.style.color = "red";
    return;
  }

  output.textContent = "Compiling...";
  output.style.color = "inherit";

  try {
    const response = await fetch(COMPILER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    output.textContent = data.output || "No output returned.";
    output.style.color = "limegreen";
  } catch (err) {
    output.textContent = "Compiler connection failed.";
    output.style.color = "red";
    console.error(err);
  }
}

window.checkTask = checkTask;
window.runMainCompiler = runMainCompiler;

// ======================
// THEME TOGGLE
// ======================

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const btn = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (btn) btn.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    if (btn) btn.textContent = "🌙";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");

  const btn = document.getElementById("themeToggle");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    if (btn) btn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    if (btn) btn.textContent = "🌙";
  }
}

window.toggleTheme = toggleTheme;

window.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = toggleTheme;
  }

  const savedUser = localStorage.getItem("username");
  const who = document.getElementById("who");

  if (savedUser && who) {
    who.textContent = savedUser;
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "☀️";
        }
        else {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "🌙";
        }

    });
}
async function runCompiler(textareaId, resultId) {
  const code = document.getElementById(textareaId).value.trim();
  const result = document.getElementById(resultId);

  if (!code) {
    result.textContent = "Please write code first.";
    result.style.color = "red";
    return;
  }

  result.textContent = "Compiling...";
  result.style.color = "inherit";

  try {
    const response = await fetch(COMPILER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: code
      })
    });

    const data = await response.json();

    result.textContent = data.output || "No output";
    result.style.color = "limegreen";
  } catch (err) {
    result.textContent =
      "Compiler connection failed. Make sure your PascalABC.NET API is running.";
    result.style.color = "red";
    console.error(err);
  }
}

window.runCompiler = runCompiler;