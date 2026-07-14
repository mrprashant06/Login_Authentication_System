const state = {
  token: localStorage.getItem("auth-demo-token") || "",
};

const elements = {
  registerTab: document.querySelector("#registerTab"),
  loginTab: document.querySelector("#loginTab"),
  registerForm: document.querySelector("#registerForm"),
  loginForm: document.querySelector("#loginForm"),
  message: document.querySelector("#message"),
  serverState: document.querySelector("#serverState"),
  signOutButton: document.querySelector("#signOutButton"),
  loadProfileButton: document.querySelector("#loadProfileButton"),
  profileName: document.querySelector("#profileName"),
  profileEmail: document.querySelector("#profileEmail"),
  profileRole: document.querySelector("#profileRole"),
  tokenPreview: document.querySelector("#tokenPreview"),
};

elements.registerTab.addEventListener("click", () => setMode("register"));
elements.loginTab.addEventListener("click", () => setMode("login"));
elements.signOutButton.addEventListener("click", signOut);
elements.loadProfileButton.addEventListener("click", loadProfile);
elements.registerForm.addEventListener("submit", register);
elements.loginForm.addEventListener("submit", login);

renderSession();

function setMode(mode) {
  const isRegister = mode === "register";
  elements.registerForm.classList.toggle("is-hidden", !isRegister);
  elements.loginForm.classList.toggle("is-hidden", isRegister);
  elements.registerTab.classList.toggle("is-active", isRegister);
  elements.loginTab.classList.toggle("is-active", !isRegister);
  setMessage("");
}

async function register(event) {
  event.preventDefault();

  const payload = {
    fullName: document.querySelector("#registerFullName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };

  await submitAuth("/api/auth/register", payload, "Account created.");
}

async function login(event) {
  event.preventDefault();

  const payload = {
    email: document.querySelector("#loginEmail").value,
    password: document.querySelector("#loginPassword").value,
  };

  await submitAuth("/api/auth/login", payload, "Signed in.");
}

async function submitAuth(url, payload, successMessage) {
  setBusy(true);

  try {
    const result = await sendJson(url, "POST", payload);
    state.token = result.token;
    localStorage.setItem("auth-demo-token", state.token);
    renderUser(result.user);
    setMessage(successMessage, "success");
  } catch (error) {
    setMessage(error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function loadProfile() {
  if (!state.token) {
    setMessage("Sign in first.", "error");
    return;
  }

  setBusy(true);

  try {
    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    const result = await readResponse(response);
    renderUser(result);
    setMessage("Profile refreshed.", "success");
  } catch (error) {
    setMessage(error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function sendJson(url, method, payload) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return readResponse(response);
}

async function readResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
}

function renderUser(user) {
  elements.profileName.textContent = user.fullName || "Not signed in";
  elements.profileEmail.textContent = user.email || "-";
  elements.profileRole.textContent = user.role || "-";
  elements.tokenPreview.textContent = state.token ? `${state.token.slice(0, 28)}...` : "-";
}

function renderSession() {
  if (!state.token) {
    renderUser({});
    return;
  }

  elements.tokenPreview.textContent = `${state.token.slice(0, 28)}...`;
  loadProfile();
}

function signOut() {
  state.token = "";
  localStorage.removeItem("auth-demo-token");
  renderUser({});
  setMessage("Signed out.", "success");
}

function setBusy(isBusy) {
  elements.serverState.textContent = isBusy ? "Working" : "Ready";
  elements.serverState.classList.remove("is-error");
}

function setMessage(text, type) {
  elements.message.textContent = text;
  elements.message.classList.toggle("is-success", type === "success");
  elements.message.classList.toggle("is-error", type === "error");
  elements.serverState.classList.toggle("is-error", type === "error");
}
