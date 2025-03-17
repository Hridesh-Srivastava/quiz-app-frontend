import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../redux/store.js"

/** import components */
import Main from "./Main"
import Quiz from "./Quiz"
import Result from "./Result"
import Admin from "./Admin"
import Layout from "./Layout"
import { CheckUserExist } from "../helper/helper"

/** react routes */
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App


