import { api, requestConfig } from "../utils/config";

//Cadastrar usuário e logar
const cadastrar = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/cadastrar", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      if (!JSON.stringify(res).includes("errors")) {
        localStorage.setItem("user", JSON.stringify(res));
      }
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Logout usuário
const logout = async () => {
  localStorage.removeItem("user");
};

//Logando usuário
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      if (!JSON.stringify(res).includes("errors")) {
        localStorage.setItem("user", JSON.stringify(res));
      }
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  cadastrar,
  logout,
  login,
};
export default authService;
