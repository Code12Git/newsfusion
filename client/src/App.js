import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./Pages/RegistrationForm";
import LoginForm from "./Pages/LoginForm";
import Home from "./Pages/Home";
import SavedArticles from "./Pages/SavedArticles";
import Recommended from "./Pages/Recommended";
import PrivateComponent from "./Components/PrivateComponent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateComponent />}>
          <Route index element={<Home />} />
          <Route path="saved" element={<SavedArticles />} />
          <Route path="recommendations" element={<Recommended />} />
        </Route>
        <Route path="register" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
