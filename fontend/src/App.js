//  main program, route all page
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gift from './page/GiftPage'
import Food from './page/FoodPage'
import Home from './page/Home';
import CheckState from './page/CheckStatePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gift" element={<Gift />} />
        <Route path="food" element={<Food />} />
        <Route path="check" element={<CheckState />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
