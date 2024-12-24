import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/*Pages */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
/* components */
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Container from "./components/Layouts/Container";
import Message from "./components/Layouts/Message";
import MyPets from "./components/pages/Pets/MyPets";
import AddPet from "./components/pages/Pets/AddPet";
import EditPet from "./components/pages/Pets/EditPet";
/* context */
import { UserProvider } from "./context/UserContext";
import PetDetail from "./components/pages/Pets/PetDetail";
import MyAdoptions from "./components/pages/Pets/MyAdoptions";


const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path='/user/mypets' element={<MyPets />} />
              <Route path="/pet/add" element={<AddPet />} />
              <Route path="/pet/myadoptions" element={<MyAdoptions />}/>
              <Route path="/pet/edit/:id" element={<EditPet />} />
              <Route path="/pet/:id" element={<PetDetail />} />
              
            </Routes>
          </Container>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
