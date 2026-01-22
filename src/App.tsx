import './App.css'
import {RoleCategoryPage} from "./pages/role-category/RoleCategoryPage.tsx";
import {AuthProvider} from "./AuthContext.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage.tsx";
import {AuthCallback} from "./AuthCallback.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RolePage} from "./pages/role/RolePage.tsx";
import {ReportSalaryPage} from "./pages/report-salary/ReportSalaryPage.tsx";
import {WelcomePage} from "./pages/WelcomePage.tsx";
import {Layout} from "./Layout.tsx";
import {ViewSalariesPage} from "./pages/view-salaries/ViewSalariesPage.tsx";
import {UsersManagementPage} from "./pages/user-management/UsersManagementPage.tsx";

const queryClient = new QueryClient();

function App() {
    return <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/auth/callback" element={<AuthCallback/>}/>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<WelcomePage/>}/>
                        <Route path="/create-salary" element={<ReportSalaryPage/>}/>
                        <Route path="/role-category" element={<RoleCategoryPage/>}/>
                        <Route path="/role" element={<RolePage/>}/>
                        <Route path="/view-salaries" element={<ViewSalariesPage/>}/>
                        <Route path="/users-management" element={<UsersManagementPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </AuthProvider>
}

export default App
