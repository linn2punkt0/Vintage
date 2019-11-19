import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import Home from "./pages/home";
import Events from "./pages/events";
import VintageSchool from "./pages/vintageSchool";
import VintageWiki from "./pages/vintageWiki";
import Materials from "./pages/materials";
import Login from "./pages/login";
import Register from "./pages/newUser";
import About from "./pages/about";
import Layout from "./layout";
import { AuthProvider } from "./context/auth";
import { MenuProvider } from "./context/menu";
import SEO from "./components/GlobalComponents/SEO";

function App() {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);

  const history = createBrowserHistory();
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
  return (
    <div className="App">
      <SEO
        title="Vintage Sverige"
        description="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        url="http://vintagesverige.se/"
      />
      <AuthProvider>
        <MenuProvider>
          <BrowserRouter history={history}>
            <Layout>
              <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/event-och-massor" component={Events} />
                  <Route exact path="/vintageskola" component={VintageSchool} />
                  <Route
                    exact
                    path="/material-och-kladvard"
                    component={Materials}
                  />
                  <Route exact path="/vintagewiki" component={VintageWiki} />
                  <Route exact path="/om-vintage-sverige" component={About} />
                  <Route exact path="/logga-in" component={Login} />
                  <Route exact path="/registrera-dig" component={Register} />
                </Switch>
              </div>
            </Layout>
          </BrowserRouter>
        </MenuProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
