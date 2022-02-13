import { Navbar, Welcome, Footer, Services, Transactions, Loader, Link, AllTransactions } from './components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route exact path="/"
            element={
              <>
                <div className="gradient-bg-welcome">
                  <Navbar />
                  <Welcome />
                </div>
                <Services />
                <Transactions />
              </>
            } />

          <Route exact path="/alltransactions"
            element={
              <>
                <div className="gradient-bg-transactions">
                  <Navbar />
                  <AllTransactions />
                </div>
              </>
            } />F

          <Route path="/link/:slug" element={
            <>
              <div className="gradient-bg-welcome">
                <Navbar />
                <Link />
              </div>
            </>
          } />
        </Routes>
      </Router>


      <Footer />
    </div>
  )
}

export default App;
