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