import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ICView from "./pages/ICView";
import ManagerView from "./pages/ManagerView";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    localStorage.removeItem('selected_dev_id');
    localStorage.removeItem('selected_dev_metrics');
  }, []);

  return (
    <>
      <Navbar /> 
      <main className="pt-16"> 
        <Routes>
          <Route path="/" element={<ICView />} /> 
          <Route path="/manager" element={<ManagerView />} />
        </Routes>
      </main>
    </>
  );
}

export default App;