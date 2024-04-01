import './App.css';
import Navbar from './components/navbar/navbar.component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Consultation from './routes/consultation/consultation.component';
import Effects from './routes/effects/effects.component';
import MedicineList from './routes/medicinelist/medicinelist.component';
import Symptoms from './routes/symptoms/symptoms.component';

const App = () => {

  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MedicineList/>}/>
          <Route path="/symptoms" element={<Symptoms />}/>
          <Route path="/effects" element={<Effects/>}/>
          <Route path="/consultation" element={<Consultation/>}/>
        </Routes>
      </BrowserRouter>
  );

}

export default App;
