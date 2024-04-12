import { ENV } from "../utils";

async function register(email, username, password) {
  try {
    console.log("ok");
   
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`;
    console.log(url);
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const authCtrl = {
  register,
};