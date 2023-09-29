import Pokemon from "./modules/pokemon";
import { ApiSnackBar } from "./modules/snack-bar/snack-bar";
import { ErrorBoundary } from "./error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Pokemon />,
      errorElement: <ErrorBoundary />,
    },
  ]);

  return (
    <div className="text-center">
      <RouterProvider router={router} />
      <ApiSnackBar />
    </div>
  );
}

export default App;
