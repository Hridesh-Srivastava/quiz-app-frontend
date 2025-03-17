// "use client"

// import { useEffect } from "react"
// import ThemeToggle from "./ThemeToggle"
// import AboutUs from "./AboutUs"

// export default function Layout({ children }) {
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark"
//     document.documentElement.classList.toggle("light-mode", savedTheme === "light")
//   }, [])

//   return (
//     <div className="app-layout">
//       <div className="theme-controls">
//         <ThemeToggle />
//       </div>
//       {children}
//       <AboutUs />
//     </div>
//   )
// }

"use client"

import { useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import AboutUs from "./AboutUs"

export default function Layout({ children }) {
  useEffect(() => {
    // Apply the saved theme on initial load
    const savedTheme = localStorage.getItem("theme") || "dark"
    document.documentElement.classList.toggle("light-mode", savedTheme === "light")

    // Make sure the entire body gets the theme
    document.body.style.backgroundColor = "var(--bg-primary)"
    document.body.style.color = "var(--text-primary)"
  }, [])

  return (
    <div className="app-layout">
      <div className="theme-controls">
        <ThemeToggle />
      </div>
      {children}
      <AboutUs />
    </div>
  )
}

