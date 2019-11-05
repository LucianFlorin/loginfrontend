import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    pname: '',
    pdescription: ''
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        pname: this.state.pname,
        pdescription: this.state.pdescription
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        pid: this.state.pid,
        pname: this.state.pname,
        pdescription: this.state.pdescription
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0]);
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { pid, pname, pdescription } = this.props.item;
      this.setState({ pid, pname, pdescription })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="pname">Project Name</Label>
          <Input type="text" name="pname" id="pname" onChange={this.onChange} value={this.state.pname === null ? '' : this.state.pname} />
        </FormGroup>
        <FormGroup>
          <Label for="pdescription">Project Description</Label>
          <Input type="text" name="pdescription" id="pdescription" onChange={this.onChange} value={this.state.pdescription === null ? '' : this.state.pdescription} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm