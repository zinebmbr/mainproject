// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute, { PublicRoute } from './components/common/ProtectedRoute';
import AppLayout from './layout/AppLayout';

import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import NotFound from './pages/OtherPage/NotFound';

import Home from './pages/Dashboard/Home';
import UserProfiles from './pages/UserProfiles';
import Calendar from './pages/Calendar';
import Blank from './pages/Blank';
import FormElements from './pages/Forms/FormElements';
import BasicTables from './pages/Tables/BasicTables';
import Alerts from './pages/UiElements/Alerts';
import Avatars from './pages/UiElements/Avatars';
import Badges from './pages/UiElements/Badges';
import Buttons from './pages/UiElements/Buttons';
import Images from './pages/UiElements/Images';
import Videos from './pages/UiElements/Videos';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';

export default function App() {
  return (
    <Routes>

      {/* 1) Public-only pages */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Route>

      {/* 2) Redirect “/” → /signin when not authenticated */}
      <Route
        path="/"
        element={<Navigate to="/signin" replace />}
      />

      {/* 3) All other pages are protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>
      </Route>

      {/* 4) Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
