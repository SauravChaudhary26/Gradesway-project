import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Login } from "./views/Login";
import Dashboard from "./views/Dashboard";

function App() {
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <Router>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
         </Router>
      </ThemeProvider>
   );
}

export default App;
