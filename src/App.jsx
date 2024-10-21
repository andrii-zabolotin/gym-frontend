import {Routes, Route, Navigate} from 'react-router-dom'
import StaffLayout from "./components/Layouts/StaffLayout.jsx";
import Home from "./pages/User/HomePage.jsx";
import UserLayout from "./components/Layouts/UserLayout.jsx";
import AdminProfile from "./pages/Admin/AdminProfilePage.jsx";
import Admin from "./pages/Admin/AdminPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import Attendances from "./pages/Admin/Attendances.jsx";
import Users from "./pages/Admin/UsersPage.jsx";
import Trainings from "./pages/Admin/TrainingsPage.jsx";
import Subscriptions from "./pages/Admin/SubscriptionsPage.jsx";
import PermissionGroups from "./pages/Admin/PermissionGroupsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import {AuthProvider} from './hoc/AuthProvider.jsx';
import Profile from "./pages/User/ProfilePage.jsx";
import UserTrainings from "./pages/Admin/UserTrainingsPage.jsx";

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
                        <Route path="user-trainings" element={
                            <UserTrainings/>
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
