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
        title: "Welcome to HSST Quiz Hub",
        description:
          "The HSST Quiz Hub is an initiative by the Creative Cell Bootcamp of Himalayan School of Science and Technology, Swami Rama Himalayan University. Our platform is designed to enhance learning through interactive assessments that challenge students' understanding of various technical subjects.",
        features: [
          "User-friendly interface designed by HSST students",
          "Secure registration system to track your academic progress",
          "Immediate feedback on your performance",
          "Comprehensive result analysis to help identify areas for improvement",
        ],
      }
    } else if (path === "/quiz") {
      return {
        title: "About HSST Quiz System",
        description:
          "Our quiz system is developed by the Creative Cell Bootcamp at HSST, SRHU. Each question is carefully crafted by our members to align with the curriculum and test your understanding of key concepts.",
        features: [
          "Questions designed by experts",
          "Progress tracking integrated with HSST academic systems",
          "Intuitive navigation for a smooth quiz experience",
          "Ability to review and change answers before final submission",
        ],
      }
    } else if (path === "/result") {
      return {
        title: "Understanding Your Quiz Results",
        description:
          "The HSST result analysis system provides detailed insights into your performance. These results are designed to help both students and faculty identify strengths and areas for improvement in the learning process.",
        features: [
          "Comprehensive breakdown of your score against HSST benchmarks",
          "Visual representation of your performance across topics",
          "Comparison with class averages",
          "Personalized feedback based on HSST learning objectives",
        ],
      }
    } else if (path === "/admin") {
      return {
        title: "HSST Quiz Admin Dashboard",
        description:
          "The admin dashboard provides HSST faculty with powerful tools to manage the quiz platform. From here, instructors can control all aspects of the assessment process.",
        features: [
          "Question bank management system",
          "Student performance analytics",
          "Course-specific quiz configuration",
          "Batch result processing and reporting",
        ],
      }
    } else {
      return {
        title: "About HSST Quiz Platform",
        description:
          "Our platform is designed with the HSST student experience in mind. We strive to provide a seamless and educational assessment tool for all our students.",
        features: [
          "Modern interface designed by HSST Creative Cell",
          "Responsive design for access on all devices",
          "Secure and reliable assessment system",
          "Regular updates based on faculty and student feedback",
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
          <p>© {new Date().getFullYear()} Himalayan School of Science and Technology, SRHU</p>
          <p>Developed by Creative Cell Bootcamp</p>
          <p>
            For any inquiries, please contact <a href="mailto:principal.hsst@srhu.edu.in">principal.hsst@srhu.edu.in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

