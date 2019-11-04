import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Login from "./Containers/Login";
import { BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import DataTable from "./Components/Tables/DataTable";
import ModalForm from "./Components/Modals/Modal";



class App extends Component {
  state = {
    items: []
  };

  getItems(){
    fetch('http://localhost:3000/crud')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  };

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.pid === item.pid);
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ];
    this.setState({ items: newArray })
  };

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems })
  };

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Router>
      <Container className="App">
          <Row>
            <Col lg={{ size: 6, offset: 3 }}>
                <Login/>
            </Col>
          </Row>

        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <h1 style={{margin: "20px 0"}}>Project list</h1>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <ModalForm buttonLabel="Add Project" addItemToState={this.addItemToState}/>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </Container>
    </Router>
    )
  }
}

export default App