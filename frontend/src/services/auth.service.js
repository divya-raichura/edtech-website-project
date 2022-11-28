import axios from "axios";

const API_URL = "/api/auth/";

/**
 *
 * login(): POST {username, password} & save JWT to Local Storage
 * logout(): remove JWT from Local Storage
 * register(): POST {username, email, password}
 * getCurrentUser(): get stored user information (including JWT)
 *
 */

async function login(email, password) {
  try {
    const res = await axios.post(API_URL + "login", {
      email,
      password,
    });

    if (res.data.token) localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function logout() {
  localStorage.removeItem("user");
}

async function register({ email, name, password }) {
  try {
    const res = await axios.post(API_URL + "register", {
      email,
      name,
      password,
    });

    if (res.data.token) localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
  login,
  register,
  logout,
  getUser,
};

export default AuthService;
