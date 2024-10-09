import './App.css'
import {Routes, Route} from 'react-router-dom'
import StaffLayout from "./components/StaffLayout.jsx";
import Home from "./pages/HomePage.jsx";
import UserLayout from "./components/UserLayout.jsx";
import Profile from "./pages/ProfilePage.jsx";
import Admin from "./pages/AdminPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import Attendances from "./pages/AttendancesPage.jsx";
import Users from "./pages/UsersPage.jsx";
import Trainings from "./pages/TrainingsPage.jsx";
import Subscriptions from "./pages/SubscriptionsPage.jsx";
import PermissionGroups from "./pages/PermissionGroupsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import React from "react";
import RequireAuth from "./hoc/RequireAuth.jsx";
import { AuthProvider } from './hoc/AuthProvider.jsx';

function App() {
  return (
    <>
    <AuthProvider>
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="/admin" element={<StaffLayout/>}>
                <Route index element={
                    <RequireAuth>
                        <Admin/>
                    </RequireAuth>
                }/>
                <Route path="attendances" element={
                    <RequireAuth>
                        <Attendances/>
                    </RequireAuth>
                }/>
                <Route path="users" element={
                    <RequireAuth>
                        <Users/>
                    </RequireAuth>
                }/>
                <Route path="trainings" element={
                    <RequireAuth>
                        <Trainings/>
                    </RequireAuth>
                }/>
                <Route path="subscriptions" element={
                    <RequireAuth>
                        <Subscriptions/>
                    </RequireAuth>
                }/>
                <Route path="permission-groups" element={
                    <RequireAuth>
                        <PermissionGroups/>
                    </RequireAuth>
                }/>
                <Route path="profile" element={
                    <RequireAuth>
                        <Profile/>
                    </RequireAuth>
                }/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </AuthProvider>
    </>
  )
}

export default App
