import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/pageNotFound";
import Home from "./pages/home";
import HotelDetails from "./pages/hotelDetails";
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

        <Route
          path="/hotel/:hotelId"
          element={<DefaultLayout MainContentComponent={HotelDetails} />}
        />

        <Route
          path="/hotel/:hotelId/room/:roomId"
          element={<DefaultLayout MainContentComponent={HotelDetails} />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default RouterConfig;
