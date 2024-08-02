import { User, UserJWT } from "../back/User";

export default function useUser() {

  const getUser = (): User | null => {
    const res = localStorage.getItem('user');
    if (res === null) return null;
    else return JSON.parse(res)
  }

  const login = async (user: string, password: string): Promise<UserJWT> => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ user, password }),
      headers: {
        'Content-Type': "application/json"
      }
    })

    if (!response.ok) {
      throw (await response.json()).error
    }
    const json: UserJWT = await response.json();
    console.log(json);

    localStorage.setItem('user', JSON.stringify(json.user))
    localStorage.setItem('accessToken', json.accessToken)
    return json;
  }

  const logout = (): void => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }

  const getAccessToken = (): string => {
    const resultado: string | null = localStorage.getItem('accessToken');
    if (resultado === null) {
      throw "Usuario sin iniciar sesión"
    }
    return resultado
  }

  return {
    login, logout, getAccessToken, getUser
  }

}