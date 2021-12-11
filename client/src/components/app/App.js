import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "../navbar";
import Footer from "../footer";
import Home from "../pages/home";
import Product from "../pages/product";
import ProductAll from "../pages/all-products/ProductAll";
import About from "../pages/about";
import New from "../pages/new";
import Contact from "../pages/contact";
import NewsById from "../pages/new/NewsById.js";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/allProducts" component={ProductAll} />
          <Route exact path="/about" component={About} />
          <Route exact path="/new" component={New} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/newinfo/:id" component={NewsById} />
          {/* <Route exact path="/four-products" component={FourProducts} /> */}
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
