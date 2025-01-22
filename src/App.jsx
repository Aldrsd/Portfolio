import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portfolio from "./Pages/Portfolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import ToolsDetails from "./components/ToolsDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import Service from "./Pages/Service";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portfolio />
          <Service/>
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                This website was built using{" "}
                <a
                 className="opacity-30 duration-300 transition-all hover:opacity-50"
                  href="https://github.com/EkiZR/Portofolio_V5/"
                >
                  EkiZR's
                </a>{" "}
                website template.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          This website was built using{" "}
          <a
            className="opacity-30 duration-300 transition-all hover:opacity-50"
            href="https://github.com/EkiZR/Portofolio_V5/"
          >
            EkiZR's
          </a>{" "}
          website template.
        </span>
      </center>
    </footer>
  </>
);

const ToolPageLayout = () => (
  <>
    <ToolsDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          This website was built using{" "}
          <a
          className="opacity-30 duration-300 transition-all hover:opacity-50"
            href="https://github.com/EkiZR/Portofolio_V5/"
          >
            EkiZR's
          </a>{" "}
          website template.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HashRouter base="/portfolio/">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              showWelcome={showWelcome}
              setShowWelcome={setShowWelcome}
            />
          }
        />
        <Route path="/games/:id" element={<ProjectPageLayout />} />
        <Route path="/tools/:id" element={<ToolPageLayout />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
