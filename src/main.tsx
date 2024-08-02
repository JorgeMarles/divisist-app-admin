import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Base from './pages/Base.tsx'
import Principal from './pages/Principal.tsx'
import PensumTSX from './pages/PensumTSX.tsx'
import MateriaInfo from './pages/MateriaInfo.tsx'
import Grafico from './pages/Grafico.tsx'
import Admin from './pages/Admin.tsx'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.tsx'



const router = createBrowserRouter([{
  path: "/",
  element: <Base />,
  children: [
    {
      path: "",
      index: true,
      element: <Principal />,
    },
    {
      path: "pensum",
      element: <PensumTSX />,
    },
    {
      path: "materia/:idMateria",
      element: <MateriaInfo />,
    },
    {
      path: "materia",
      element: <Navigate to={'/pensum'} />
    },
    {
      path: "grafico",
      element: <Grafico />,
    },
    {
      path: "admin",
      element: <Admin />,
    },
    {
      path: "login",
      element: <Login />
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  </>
)
