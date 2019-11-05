import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import DataTable from "../Components/Tables/DataTable";
import ModalForm from "../Components/Modals/Modal";


class Projects extends Component {

    state = {
        items: []
    };

    getItems(){
        fetch('http://localhost:3000/crud' , {
            credentials: "include"
        })
            .then(response => response.json())
            .then(items => {
                if(!items.dataEmpty) {
                    this.setState({items})
                }
                else alert('No data for this user');
            })
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
            <div>
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>Project list</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalForm buttonLabel="Add Project" addItemToState={this.addItemToState}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Projects)