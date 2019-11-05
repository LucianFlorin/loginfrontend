import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Login from "./Containers/Login";
import { BrowserRouter as Router, Switch, Route, withRouter}from "react-router-dom";
import Projects from "./Containers/Projects";
import Notfound from "./Components/NotFound";
import Register from "./Containers/Register";



class App extends Component {

  render() {
    return (
      <Router>
        <Container className="App">
          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
            <Route exact path="/projects" component={withRouter(Projects)} />
            <Route exact path="/register" component={withRouter(Register)} />
            <Route component={Notfound} />
          </Switch>
        </Container>
    </Router>
    )
  }
}

export default App