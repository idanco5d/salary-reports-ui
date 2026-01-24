import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage.tsx";
import {AuthCallback} from "../auth/AuthCallback.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {Layout} from "../components/Layout.tsx";
import {WelcomePage} from "../pages/WelcomePage.tsx";
import {ReportSalaryPage} from "../pages/report-salary/ReportSalaryPage.tsx";
import {RoleCategoryPage} from "../pages/role-category/RoleCategoryPage.tsx";
import {RolePage} from "../pages/role/RolePage.tsx";
import {ViewSalariesPage} from "../pages/view-salaries/ViewSalariesPage.tsx";
import {UsersManagementPage} from "../pages/user-management/UsersManagementPage.tsx";

export const ApplicationRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/auth/callback" element={<AuthCallback/>}/>

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/home" element={<WelcomePage/>}/>
                    <Route path="/create-salary" element={<ReportSalaryPage/>}/>
                    <Route path="/role-category" element={<RoleCategoryPage/>}/>
                    <Route path="/role" element={<RolePage/>}/>
                    <Route path="/view-salaries" element={<ViewSalariesPage/>}/>
                    <Route path="/users-management" element={<UsersManagementPage/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}