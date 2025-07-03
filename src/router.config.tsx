import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/pageNotFound";
import Home from "./pages/home";
import DefaultLayout from "./layouts/defaultLayout";

function RouterConfig() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<DefaultLayout MainContentComponent={Home} />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default RouterConfig;
