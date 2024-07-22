import {Route, Routes} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import AddContact from './containers/AddContact/AddContact';

const App = () => {

  return (
    <>
      <header className="bg-primary ">
        <Toolbar/>
      </header>

      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<h1>Hello</h1>}/>
          <Route path="/new-contact" element={<AddContact />}/>
          <Route path="*" element={(<h1 className="text-center">Not found</h1>)}/>
        </Routes>
      </main>
    </>
  );
};

export default App;