import { api, requestConfig } from "../utils/config";

//Cadastrar usuário
const cadastrar = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/cadastrar", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  cadastrar,
};
export default authService;
