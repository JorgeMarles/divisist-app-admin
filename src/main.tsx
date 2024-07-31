import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, defer, Navigate, RouterProvider } from 'react-router-dom'
import Base from './pages/Base.tsx'
import Principal from './pages/Principal.tsx'
import PensumTSX from './pages/PensumTSX.tsx'
import MateriaInfo from './pages/MateriaInfo.tsx'
import Grafico from './pages/Grafico.tsx'
import Admin from './pages/Admin.tsx'
import Pensum from './back/Pensum.ts'

const pensumLoader = async (): Promise<Pensum> => {
  const pensum: Pensum = await Pensum.getPensum();
  return pensum
}

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
      element: <PensumTSX /> ,
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
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
