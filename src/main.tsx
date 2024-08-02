import ReactDOM from 'react-dom/client'
import './index.css'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Base from './pages/Base.tsx'
import Principal from './pages/Principal.tsx'
import PensumTSX from './pages/PensumTSX.tsx'
import MateriaInfo from './pages/MateriaInfo.tsx'
import Grafico from './pages/Grafico.tsx'
import Admin from './pages/Admin.tsx'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.tsx'



const router = createHashRouter([{
  path: "/divisist-app-admin/",
  element: <Base />,
  children: [
    {
      path: "/divisist-app-admin/",
      index: true,
      element: <Principal />,
    },
    {
      path: "/divisist-app-admin/pensum",
      element: <PensumTSX />,
    },
    {
      path: "/divisist-app-admin/materia/:idMateria",
      element: <MateriaInfo />,
    },
    {
      path: "/divisist-app-admin/materia",
      element: <Navigate to={'/divisist-app-admin/pensum'} />
    },
    {
      path: "/divisist-app-admin/grafico",
      element: <Grafico />,
    },
    {
      path: "/divisist-app-admin/admin",
      element: <Admin />,
    },
    {
      path: "/divisist-app-admin/login",
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
