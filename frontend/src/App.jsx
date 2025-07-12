// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";

// Placeholders for pages for now

function App() {
    return (
        <AuthProvider>
            <div className="bg-slate-900 min-h-screen text-white">
                {/* Header component will go here later */}
                <Header />
                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        {/* Protected Route */}
                        <Route path="/dashboard" element={<PrivateRoute />}>
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                        </Route>
                        <Route path="/" element={<LoginPage />} />{" "}
                        {/* Default route */}
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
