import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
const Search = lazy(() => import("./pages/Search/Search.jsx"));
import Home from "./pages/Home/Home.jsx"; // Keep Home SSR
import ListDentist from "./pages/ListDentist/ListDentist.jsx";
import ListCough from './pages/ListCough/ListCough.jsx'
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          }
        />
        <Route path="/list-dentist" element={<ListDentist/>}></Route>
        <Route path='/list-cough' element={<ListCough/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/doctor" element={<DoctorProfile/>}></Route>
        <Route path="/doctor/:id" element={<DoctorProfile />} />
      </Switch>
    </Router>
  )
}

export default App
