import {Routes, Route, Navigate} from 'react-router-dom'
import StaffLayout from "./components/StaffLayout.jsx";
import Home from "./pages/HomePage.jsx";
import UserLayout from "./components/UserLayout.jsx";
import AdminProfile from "./pages/AdminProfilePage.jsx";
import Admin from "./pages/AdminPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import Attendances from "./pages/AttendancesPage.jsx";
import Users from "./pages/UsersPage.jsx";
import Trainings from "./pages/TrainingsPage.jsx";
import Subscriptions from "./pages/SubscriptionsPage.jsx";
import PermissionGroups from "./pages/PermissionGroupsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import {AuthProvider} from './hoc/AuthProvider.jsx';
import Profile from "./pages/ProfilePage.jsx";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<UserLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                    <Route path="/admin" element={<StaffLayout/>}>
                        <Route index element={
                                <Admin/>
                        }/>
                        <Route path="attendances" element={
                            <Attendances/>
                        }/>
                        <Route path="users" element={
                            <Users/>
                        }/>
                        <Route path="trainings" element={
                            <Trainings/>
                        }/>
                        <Route path="subscriptions" element={
                            <Subscriptions/>
                        }/>
                        <Route path="permission-groups" element={
                            <PermissionGroups/>
                        }/>
                        <Route path="profile" element={
                            <AdminProfile/>
                        }/>
                    </Route>
                    <Route path="*" element={<Navigate to="/404" replace/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
