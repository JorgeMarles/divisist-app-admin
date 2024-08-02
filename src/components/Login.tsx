import { Label, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserJWT } from "../back/User";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, getUser } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (getUser() !== null) {
            navigate("/divisist-app-admin/admin")
        }
    }, [])

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        toast.promise<UserJWT>(new Promise<UserJWT>(async (resolve,reject)=>{
            try{
                const response = await login(username, password);
                navigate("/divisist-app-admin/admin")
                resolve(response)
            }catch(error: any){
                reject(error)
            }
        }), {
            error: {
                render: ({ data }: any) => {
                    console.log(data);

                    return data
                }
            },
            success: {
                render: ({data}) => {
                    return `Logeado correctamente, ${data.user.name}`
                }
            },
            pending: "Iniciando sesión"
        })
        console.log('Login attempted with:', { username, password });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <h2 className="text-lg text-center mb-6">Sinceramente por afanes lo hice en ChatGPT</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <Label htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" gradientDuoTone="cyanToBlue">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;