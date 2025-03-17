"use client"

import { useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import AboutUs from "./AboutUs"

export default function Layout({ children }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    document.documentElement.classList.toggle("light-mode", savedTheme === "light")
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

