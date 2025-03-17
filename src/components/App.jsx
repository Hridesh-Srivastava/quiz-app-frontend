// import "../styles/globals.css"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import Main from "./Main"
// import Quiz from "./Quiz"
// import Result from "./Result"
// import Admin from "./Admin"
// import Layout from "./Layout"
// import { CheckUserExist } from "../helper/helper"

// // Add error handling
// const ErrorBoundary = ({ children }) => {
//   try {
//     return children
//   } catch (error) {
//     console.error("Error in routing:", error)
//     return <div className="error-page">Something went wrong. Please try again.</div>
//   }
// }

// // Create loading component
// const Loading = () => <div className="loading-container">Loading...</div>

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ErrorBoundary>
//         <Layout>
//           <Main />
//         </Layout>
//       </ErrorBoundary>
//     ),
//   },
//   {
//     path: "/quiz",
//     element: (
//       <ErrorBoundary>
//         <Layout>
//           <CheckUserExist>
//             <Quiz />
//           </CheckUserExist>
//         </Layout>
//       </ErrorBoundary>
//     ),
//   },
//   {
//     path: "/result",
//     element: (
//       <ErrorBoundary>
//         <Layout>
//           <CheckUserExist>
//             <Result />
//           </CheckUserExist>
//         </Layout>
//       </ErrorBoundary>
//     ),
//   },
//   {
//     path: "/admin",
//     element: (
//       <ErrorBoundary>
//         <Layout>
//           <Admin />
//         </Layout>
//       </ErrorBoundary>
//     ),
//   },
// ])

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }

// export default App


import "../styles/globals.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../redux/store"
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App


