import { render } from "@testing-library/react";
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
      .then(response => response.json())
      .then(games => setProducts(games))
  }, [])

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Home products={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home({ products }) {

  function renderProducts(){
    return products.map(product => <img src={product.thumb} />)
  }

  return (
    <div>
      <h2>Home</h2>
      {renderProducts()}
    </div>
  )
    
}

function Cart() {
  return <h2>Cart</h2>;
}

export default App