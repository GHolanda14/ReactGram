import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/perfil", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res.user;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
};

export default userService;
