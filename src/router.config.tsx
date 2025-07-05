import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageNotFound from "./pages/pageNotFound";
import Home from "./pages/home";
import DefaultLayout from "./layouts/defaultLayout";
import LoadingFallback from "./components/common/loadingFallback";

// Lazy load the heavy HotelDetails component
const HotelDetails = lazy(() => import("./pages/hotelDetails"));

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
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DefaultLayout MainContentComponent={HotelDetails} />
            </Suspense>
          }
        />

        <Route
          path="/hotel/:hotelId/room/:roomId"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DefaultLayout MainContentComponent={HotelDetails} />
            </Suspense>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default RouterConfig;
