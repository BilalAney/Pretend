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
import { Toaster } from "react-hot-toast";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayoutContextWrapper from "./routes/layout/AppLayoutContextWrapper";

const Publishable_Key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/App",
    element: <ProtectedRoute />,
    loader: userLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AppLayoutContextWrapper />,
      },
    ],
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
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
