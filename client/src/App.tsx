import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AddWilder from './pages/AddWilder';
import EditWilder from './pages/EditWilder';
import Home from './pages/Home';
import SkillEdit from './pages/SkillEdit';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wilders/:id' element={<EditWilder />} />
          <Route path='/skills' element={<SkillEdit />} />
          <Route path='/add-wilder' element={<AddWilder />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
