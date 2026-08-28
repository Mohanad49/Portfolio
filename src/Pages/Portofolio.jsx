import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "playwright.svg", language: "Playwright" },
  { icon: "selenium.svg", language: "Selenium" },
  { icon: "pytest.svg", language: "PyTest" },
  { icon: "Maestro.svg", language: "Maestro" },
  { icon: "appium.svg", language: "Appium" },
  { icon: "cucumber.svg", language: "Cucumber" },
  { icon: "postman.svg", language: "Postman" },
  { icon: "k6.svg", language: "k6" },
  { icon: "jmeter.svg", language: "JMeter" },
  { icon: "allure.svg", language: "Allure" },
  { icon: "githubactions.svg", language: "GitHub Actions" },
  { icon: "azuredevops.svg", language: "Azure DevOps" },
  { icon: "docker.svg", language: "Docker" },
  { icon: "python.svg", language: "Python" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "sql.svg", language: "SQL" },
  { icon: "reactjs.svg", language: "ReactJS" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectData = [
        {
          id: "1",
          Img: "/projects/testpulse.svg",
          Title: "TestPulse — Test Observability & Flake Detection",
          Description: "Full-stack platform that ingests CI results (JUnit, Playwright, Allure, PyTest), computes per-test flakiness and duration trends, and surfaces them in a dashboard and automated PR comments — with a configurable flake classifier and an expiring quarantine list.",
          Link: "https://testpulse-eight.vercel.app",
          Github: "https://github.com/Mohanad49/testpulse",
          TechStack: ["Python", "FastAPI", "React/TypeScript", "PostgreSQL", "GitHub Actions"],
          Features: ["Flake classification", "Quarantine list", "PR comment bot", "Live dashboard"]
        },
        {
          id: "2",
          Img: "/projects/caldiy.svg",
          Title: "Cal.diy QA Strategy & Automation",
          Description: "A layered QA engagement against Cal.diy v6.2.0, the final public Cal.com open-source snapshot: risk-led strategy, Python API contracts, Playwright/TypeScript E2E with selective Cucumber (BDD/Gherkin), and k6 CI gates. Two current-main contract defects filed publicly after duplicate search and exact-commit reproduction.",
          Link: "https://mohanad49.github.io/caldiy-qa-strategy/",
          Github: "https://github.com/Mohanad49/caldiy-qa-strategy",
          TechStack: ["Playwright", "TypeScript", "Python", "Cucumber", "k6", "Docker"],
          Features: ["Risk-based strategy", "Timezone/DST testing", "20-way contention", "Accessibility", "Upstream defects filed"]
        },
        {
          id: "3",
          Img: "/projects/llm-eval.svg",
          Title: "LLM Evaluation & Prompt-Regression Harness",
          Description: "PyTest-native harness for evaluating LLM features: versioned golden datasets, N-sampling for non-determinism, an LLM-as-judge validated against blind human labels (Cohen's kappa), prompt-version regression diffs, and an adversarial red-team suite — all gated in CI.",
          Link: "https://mohanad49.github.io/llm-eval-harness/",
          Github: "https://github.com/Mohanad49/llm-eval-harness",
          TechStack: ["Python", "PyTest", "RAG", "LLM-as-judge"],
          Features: ["Golden datasets", "Judge validation (kappa)", "Prompt regression diffs", "Red-team suite"]
        },
        {
          id: "4",
          Img: "/projects/orangehrm.svg",
          Title: "OrangeHRM E2E — Playwright Framework",
          Description: "End-to-end Playwright/TypeScript suite for OrangeHRM built on the Page Object Model with fixtures, a Dockerised application under test, Allure reporting, and GitHub Actions CI.",
          Link: "https://mohanad49.github.io/orangehrm-playwright/",
          Github: "https://github.com/Mohanad49/orangehrm-playwright",
          TechStack: ["Playwright", "TypeScript", "Docker", "Allure"],
          Features: ["Page Object Model", "Fixtures", "Dockerised AUT", "Allure reporting"]
        },
        {
          id: "5",
          Img: "/projects/maestro.svg",
          Title: "Wikipedia Mobile Suite — Maestro",
          Description: "Maestro UI automation for the Wikipedia Android app, running on an emulator inside GitHub Actions — including a written Appium-to-Maestro migration rationale covering flakiness and setup overhead.",
          Link: "",
          Github: "https://github.com/Mohanad49/wikipedia-maestro",
          TechStack: ["Maestro", "Android", "GitHub Actions"],
          Features: ["Emulator in CI", "YAML flows", "Appium→Maestro migration study"]
        },
        {
          id: "6",
          Img: "/projects/github-api.svg",
          Title: "GitHub REST API Test Framework",
          Description: "Automated API testing framework for the GitHub REST API built with Python, PyTest and Requests — schema validation, authentication and rate-limit scenarios, and CI-published reports.",
          Link: "https://mohanad49.github.io/github-api-tests/",
          Github: "https://github.com/Mohanad49/github-api-tests",
          TechStack: ["Python", "PyTest", "Requests"],
          Features: ["JSON schema validation", "OAuth scenarios", "Rate-limit testing", "CI reporting"]
        },
        {
          id: "7",
          Img: "/projects/selenium-qa.svg",
          Title: "Open-Source Web App QA Portfolio",
          Description: "Production-style Selenium/PyTest automation framework targeting Sauce Labs' open-source The Internet application, with Page Object Model architecture and CI integration.",
          Link: "https://mohanad49.github.io/open-source-webapp-qa-portfolio/",
          Github: "https://github.com/Mohanad49/open-source-webapp-qa-portfolio",
          TechStack: ["Python", "Selenium", "PyTest"],
          Features: ["Authentication", "Forms", "Dynamic waits", "CI/CD integration"]
        },
        {
          id: "8",
          Img: "/projects/postman-api.svg",
          Title: "API Testing Framework with CI Integration",
          Description: "Postman/Newman API testing framework for Restful Booker covering authentication, full CRUD flows and negative cases, wired into GitHub Actions with published reports.",
          Link: "https://mohanad49.github.io/api-testing-framework-ci/",
          Github: "https://github.com/Mohanad49/api-testing-framework-ci",
          TechStack: ["Postman", "Newman", "GitHub Actions"],
          Features: ["CRUD flows", "Auth edge cases", "Negative scenarios", "CI reporting"]
        },
        {
          id: "9",
          Img: "/projects/jmeter.svg",
          Title: "JMeter Performance Testing Report",
          Description: "Load-tested a FastAPI prediction endpoint with Apache JMeter — latency percentiles and error-rate thresholds set before the run, with throughput limits identified and documented.",
          Link: "",
          Github: "https://github.com/Mohanad49/jmeter_performance_testing_report",
          TechStack: ["JMeter", "Python", "FastAPI"],
          Features: ["Stress testing", "Latency percentiles", "Pre-set thresholds", "Throughput limits"]
        },
        {
          id: "10",
          Img: "/projects/ebay-selenium.svg",
          Title: "eBay Web Automation — Selenium + Java",
          Description: "Selenium WebDriver and Java test automation framework for eBay search and refinement flows, using the Page Object Model with externalised test data.",
          Link: "",
          Github: "https://github.com/Mohanad49/ebay-web-automation",
          TechStack: ["Java", "Selenium", "JUnit"],
          Features: ["Page Object Model", "Externalised test data", "Search & refinement flows"]
        },
        {
          id: "11",
          Img: "/projects/gamerhq.svg",
          Title: "GamerHQ",
          Description: "React web application that helps gamers discover new titles across platforms and genres.",
          Link: "https://gamer-hq.vercel.app/",
          Github: "https://github.com/Mohanad49/GamerHQ",
          TechStack: ["TypeScript", "React.js"],
          Features: ["Search by platform", "Search by genre", "Game details", "Responsive design"]
        },
        {
          id: "12",
          Img: "/projects/kindle.svg",
          Title: "Kindle",
          Description: "Non-monetary donation platform that connects donors with individuals and organisations in need.",
          Link: "https://kindle-ebon.vercel.app",
          Github: "https://github.com/Mohanad49/Kindle",
          TechStack: ["HTML5", "CSS3", "JavaScript"],
          Features: ["User profiles", "Donation requests", "Donation listings", "Ratings & feedback"]
        },
        {
          id: "13",
          Img: "/projects/lafefny.svg",
          Title: "Lafefny",
          Description: "Travel platform connecting tourists with local tour guides, activities and curated itineraries across Egypt.",
          Link: "https://lafefny.vercel.app",
          Github: "https://github.com/Mohanad49/Lafefny",
          TechStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
          Features: ["Real-time notifications", "Secure payments", "Multi-currency support", "Ratings & reviews"]
        }
      ];

      // Self-hosted credential images. Previously these were pulled from a Firestore
      // collection pointing at a private GCS bucket (storage.cloud.google.com), which
      // redirected anonymous visitors to a Google sign-in page — so every card rendered
      // broken for everyone except the signed-in owner. Committed to the repo instead.
      const certificateData = [
        { Img: "/certs/istqb-ctfl.svg", Title: "ISTQB Certified Tester, Foundation Level (CTFL)" },
        { Img: "/certs/ml-specialization.jpg", Title: "Machine Learning Specialization — DeepLearning.AI / Stanford University" },
        { Img: "/certs/mbg-internship.jpg", Title: "Software Engineering Internship — MBG Developments" },
        { Img: "/certs/enppi-internship.jpg", Title: "IT Division Training — ENPPI" },
        { Img: "/certs/career-essentials-sd.jpg", Title: "Career Essentials in Software Development — Microsoft & LinkedIn" },
        { Img: "/certs/career-essentials-genai.jpg", Title: "Career Essentials in Generative AI — Microsoft & LinkedIn" },
        { Img: "/certs/ethical-hacking-essentials.jpg", Title: "Ethical Hacking Essentials (EHE) — EC-Council" },
        { Img: "/certs/hr-learning-development.jpg", Title: "HR Learning & Development" },
      ];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Test automation frameworks, QA strategy engagements and testing tooling — each with a public
          repository, CI pipeline and published report you can open and read.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}