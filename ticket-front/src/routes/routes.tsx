import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import CreateEvent from "../pages/CreateEvent";
import Events from "../pages/Events";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/criar-evento" element={<CreateEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
