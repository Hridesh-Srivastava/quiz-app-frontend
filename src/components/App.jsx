import "../styles/globals.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "./Main"
import Quiz from "./Quiz"
import Result from "./Result"
import Admin from "./Admin"
import Layout from "./Layout"
import { CheckUserExist } from "../helper/helper"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Main />
      </Layout>
    ),
  },
  {
    path: "/quiz",
    element: (
      <Layout>
        <CheckUserExist>
          <Quiz />
        </CheckUserExist>
      </Layout>
    ),
  },
  {
    path: "/result",
    element: (
      <Layout>
        <CheckUserExist>
          <Result />
        </CheckUserExist>
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

