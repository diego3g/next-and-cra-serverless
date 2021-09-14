import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/product" component={() => <h1>Product</h1>} />
        <Route path="/catalog" component={() => <h1>Catalog</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
