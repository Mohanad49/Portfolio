// Single source of truth for portfolio content.
//
// This used to live inside Portofolio.jsx, which wrote it to localStorage for other
// components to read back. That made every consumer depend on Portofolio having
// rendered first: About showed the *previous* visit's counts on load, and a direct
// link to /project/:id spun forever on a cold cache. Importing the data instead
// removes the ordering dependency entirely.

export const PROJECTS = [
  {
    id: "1",
    Img: "/projects/testpulse.svg",
    Title: "TestPulse: Test Observability & Flake Detection",
    Description: "Full-stack platform that ingests CI results (JUnit, Playwright, Allure, PyTest), computes per-test flakiness and duration trends, and surfaces them in a dashboard and automated PR comments, with a configurable flake classifier and an expiring quarantine list.",
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
    Description: "PyTest-native harness for evaluating LLM features: versioned golden datasets, N-sampling for non-determinism, an LLM-as-judge validated against blind human labels (Cohen's kappa), prompt-version regression diffs, and an adversarial red-team suite, all gated in CI.",
    Link: "https://mohanad49.github.io/llm-eval-harness/",
    Github: "https://github.com/Mohanad49/llm-eval-harness",
    TechStack: ["Python", "PyTest", "RAG", "LLM-as-judge"],
    Features: ["Golden datasets", "Judge validation (kappa)", "Prompt regression diffs", "Red-team suite"]
  },
  {
    id: "4",
    Img: "/projects/orangehrm.svg",
    Title: "OrangeHRM E2E: Playwright Framework",
    Description: "End-to-end Playwright/TypeScript suite for OrangeHRM built on the Page Object Model with fixtures, a Dockerised application under test, Allure reporting, and GitHub Actions CI.",
    Link: "https://mohanad49.github.io/orangehrm-playwright/",
    Github: "https://github.com/Mohanad49/orangehrm-playwright",
    TechStack: ["Playwright", "TypeScript", "Docker", "Allure"],
    Features: ["Page Object Model", "Fixtures", "Dockerised AUT", "Allure reporting"]
  },
  {
    id: "5",
    Img: "/projects/maestro.svg",
    Title: "Wikipedia Mobile Suite: Maestro",
    Description: "Maestro UI automation for the Wikipedia Android app, running on an emulator inside GitHub Actions, including a written Appium-to-Maestro migration rationale covering flakiness and setup overhead.",
    Link: "",
    Github: "https://github.com/Mohanad49/wikipedia-maestro",
    TechStack: ["Maestro", "Android", "GitHub Actions"],
    Features: ["Emulator in CI", "YAML flows", "Appium→Maestro migration study"]
  },
  {
    id: "6",
    Img: "/projects/github-api.svg",
    Title: "GitHub REST API Test Framework",
    Description: "Automated API testing framework for the GitHub REST API built with Python, PyTest and Requests: schema validation, authentication and rate-limit scenarios, and CI-published reports.",
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
    Description: "Load-tested a FastAPI prediction endpoint with Apache JMeter: latency percentiles and error-rate thresholds set before the run, with throughput limits identified and documented.",
    Link: "",
    Github: "https://github.com/Mohanad49/jmeter_performance_testing_report",
    TechStack: ["JMeter", "Python", "FastAPI"],
    Features: ["Stress testing", "Latency percentiles", "Pre-set thresholds", "Throughput limits"]
  },
  {
    id: "10",
    Img: "/projects/ebay-selenium.svg",
    Title: "eBay Web Automation: Selenium + Java",
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

export const CERTIFICATES = [
  { Img: "/certs/istqb-ctfl.svg", Title: "ISTQB Certified Tester, Foundation Level (CTFL 4.0), scored 85%" },
  { Img: "/certs/atos-internship.jpg", Title: "Software Testing Internship, Atos (Jul to Sep 2026)" },
  { Img: "/certs/ml-specialization.jpg", Title: "Machine Learning Specialization, DeepLearning.AI / Stanford University" },
  { Img: "/certs/mbg-internship.jpg", Title: "Software Engineering Internship, MBG Developments" },
  { Img: "/certs/enppi-internship.jpg", Title: "IT Division Training, ENPPI" },
  { Img: "/certs/career-essentials-sd.jpg", Title: "Career Essentials in Software Development, Microsoft & LinkedIn" },
  { Img: "/certs/career-essentials-genai.jpg", Title: "Career Essentials in Generative AI, Microsoft & LinkedIn" },
  { Img: "/certs/ethical-hacking-essentials.jpg", Title: "Ethical Hacking Essentials (EHE), EC-Council" },
  { Img: "/certs/hr-learning-development.jpg", Title: "HR Learning & Development" },
];

export const getProjectById = (id) =>
  PROJECTS.find((p) => String(p.id) === String(id)) || null;
