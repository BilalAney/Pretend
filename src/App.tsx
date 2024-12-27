/** @format */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./routes/auth/LoginPage";
import ProtectedRoute, {
  loader as userLoader,
} from "./routes/auth/ProtectedRoute";
import ErrorPage from "./routes/error/ErrorPage";
import LanguageProvider from "./contexts/LanguageProvider";
import { action as loginPageAction } from "./components/forms/LoginForm";
import SignupPage from "./routes/auth/SignupPage";
const router = createBrowserRouter([
  {
    path: "/App",
    element: <ProtectedRoute />,
    loader: userLoader,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    index: true,
    element: <LoginPage />,
    action: loginPageAction,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

function App() {
  return (
    <div className="bg-background w-dvw h-dvh">
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </div>
  );
}

export default App;
