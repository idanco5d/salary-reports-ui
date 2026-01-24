import './App.css'
import {AuthProvider} from "./auth/AuthContext.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ApplicationRoutes} from "./routes/ApplicationRoutes.tsx";

const queryClient = new QueryClient();

function App() {
    return <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <ApplicationRoutes/>
        </QueryClientProvider>
    </AuthProvider>
}

export default App