import Routes from './Routes';
import Header from './components/Header/Index'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    
    <>
      <ToastContainer />
      <Header />
      <div className='p-4'>
        <Router>
          <Routes />
        </Router>
      </div>


    </>
  );
}

export default App;
