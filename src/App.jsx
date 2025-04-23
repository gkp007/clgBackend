import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Footer,
  Navbar,
  Stats,
  Testimonials,
  Hero,
  ScholarshipSection,
  AboutStats,
  CategorySection,
  StudentPath,
  TopColleges,
  Journey,
  CounselingPage,
  Counselor,
  ContactUsForm,
  TermsConditions,
  PrivacyPolicy,
} from "./components";
import Scholarship from "./components/Scholarship"; 
import Eligibility from "./components/Journey";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <div className="bg-white w-full overflow-hidden">
              <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 px-4 py-2 mx-12 bg-blue-50 text-sm">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <FaPhoneAlt className="text-blue-600" />
                  <span>7752058263</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <FaEnvelope className="text-blue-600" />
                  <span>gkpattanaik001@gmail.com</span>
                </div>
              </div>

              <Navbar />

              <div className={`bg-white`}>
                <Hero />
              </div>

              <div className={`bg-white`}>
                <AboutStats />
                <StudentPath />
                {/* <Journey /> */}
                <Business />

                <TopColleges />
                <Scholarship />
                
                  <div className="inline-block bg-[#009933] text-white text-sm font-semibold ml-8 px-4 py-1 rounded-full mb-4 animate-bounce">
        Student and alumni connect
                </div>
                <CTA />
                <Footer />
              </div>
            </div>
          }
        />

        {/* Scholarship Page */}
        <Route path="/scholarship" element={<Scholarship />} />
         <Route path="/counseling" element={<CounselingPage />} />
         <Route path="/counselor" element={<Counselor />} />
         <Route path="/contactUs" element={<ContactUsForm />} />
         <Route path="/termsConditions" element={<TermsConditions />} />
         <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;