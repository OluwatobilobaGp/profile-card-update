import { avatarImage, coverImage, profilePicture } from "./assets"
import Dashboard from "./pages/Dashboard"
import FirstCard from "./components/FirstCard"
import ProfileCard from "./components/ProfileCard"
import Todo from "./pages/Todo"
import Form from "./components/Form"
import HomePage from "./pages/HomePage"
import Layout from "./layouts/Layout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AboutUsPage from "./pages/AboutUsPage"
import ServicesPage from "./pages/ServicesPage"
import PricingPage from "./pages/PricingPage"
import ResourcesPage from "./pages/ResourcesPage"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {index: true, element: <HomePage />},
        {path: "dashboard", element: <Dashboard />},
        {path: "todo", element: <Todo />},
        {path: "form", element: <Form />},
        {path: "about", element: <AboutUsPage />},
        {path: "services", element: <ServicesPage />},
        {path: "pricing", element: <PricingPage />},
        {path: "resources", element: <ResourcesPage />}


      ],
    }
  ])

  return (
    <>
      
      <RouterProvider router={router} />;

      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/form" element={<Form />} />
      </Routes> */}

    </>
  )
}

export default App
