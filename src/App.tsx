import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Search = lazy(() => import("./pages/Search"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const RestaurantDetail = lazy(() => import("./pages/RestaurantDetail"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />

          {/* Add this before the tempo routes to prevent conflicts */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
