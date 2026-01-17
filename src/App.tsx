import './App.css'
import {RoleCategoryPage} from "./pages/role-category/RoleCategoryPage.tsx";
import {AuthProvider} from "./AuthContext.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from "./LoginPage.tsx";
import {AuthCallback} from "./AuthCallback.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RolePage} from "./pages/role/RolePage.tsx";

const queryClient = new QueryClient()

function App() {
    return <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/role-category" element={<RoleCategoryPage/>}/>
                    <Route path="/role" element={<RolePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/auth/callback" element={<AuthCallback/>}/>
                    <Route path="/home" element={<RoleCategoryPage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </AuthProvider>
}

export default App
