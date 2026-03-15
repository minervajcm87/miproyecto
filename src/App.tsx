import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"
import Header from "./components/header";
import AboutMe from "./components/aboutme";
import Hobbies from "./components/hobbies";
import ContactForm from "./components/contactform";
import Footer from "./components/footer";
import Proyectos from "./pages/proyectos";

export default function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AboutMe />
                <Hobbies />
                <ContactForm />
              </>
            }
          />

          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </main>

      <Footer />
      <Toaster />
    </>
  );
}