"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"

export default function AboutUs() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Dynamic content based on current page
  const getPageContent = () => {
    const path = location.pathname

    if (path === "/") {
      return {
        title: "Welcome to Our Quiz Platform",
        description:
          "Our interactive quiz platform is designed to test and enhance your knowledge in various subjects. We believe in making learning fun and engaging through well-crafted quizzes that challenge your understanding and help you grow.",
        features: [
          "User-friendly interface for seamless quiz-taking experience",
          "Secure registration system to track your progress",
          "Immediate feedback on your performance",
          "Comprehensive result analysis to help you improve",
        ],
      }
    } else if (path === "/quiz") {
      return {
        title: "About Our Quiz System",
        description:
          "Our quiz system is built with the latest technologies to provide you with a smooth and interactive experience. Each question is carefully crafted to test your knowledge and understanding of the subject matter.",
        features: [
          "Randomized questions to ensure a unique experience each time",
          "Progress tracking to help you monitor your advancement",
          "Intuitive navigation between questions",
          "Ability to review and change answers before final submission",
        ],
      }
    } else if (path === "/result") {
      return {
        title: "Understanding Your Results",
        description:
          "Our result analysis system provides you with detailed insights into your performance. We believe in transparency and helping you understand your strengths and areas for improvement.",
        features: [
          "Comprehensive breakdown of your score",
          "Visual representation of your performance",
          "Comparison with average scores",
          "Personalized feedback based on your answers",
        ],
      }
    } else if (path === "/admin") {
      return {
        title: "Admin Dashboard Overview",
        description:
          "The admin dashboard provides powerful tools to manage the quiz platform. From here, you can control all aspects of the quiz system, ensuring a smooth experience for all users.",
        features: [
          "Question management system",
          "User data analytics",
          "Performance monitoring tools",
          "System configuration options",
        ],
      }
    } else {
      return {
        title: "About Our Platform",
        description:
          "Our platform is designed with user experience in mind. We strive to provide a seamless and enjoyable experience for all our users.",
        features: [
          "Modern and intuitive interface",
          "Responsive design for all devices",
          "Secure and reliable system",
          "Continuous updates and improvements",
        ],
      }
    }
  }

  const content = getPageContent()

  return (
    <div className={`about-us-container ${isOpen ? "open" : ""}`}>
      <button
        className="about-us-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="about-us-content"
      >
        {isOpen ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Close
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            About Us
          </>
        )}
      </button>

      <div id="about-us-content" className={`about-us-content ${isOpen ? "visible" : ""}`} aria-hidden={!isOpen}>
        <h2 className="about-us-title">{content.title}</h2>
        <p className="about-us-description">{content.description}</p>

        <h3 className="about-us-features-title">Key Features:</h3>
        <ul className="about-us-features">
          {content.features.map((feature, index) => (
            <li key={index} className="about-us-feature-item">
              {feature}
            </li>
          ))}
        </ul>

        <div className="about-us-footer">
          <p>© {new Date().getFullYear()} Quiz Platform. All rights reserved.</p>
          <p>
            For any inquiries, please contact <a href="mailto:support@quizplatform.com">support@quizplatform.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}

