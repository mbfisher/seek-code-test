import React, { Component } from "react";
import { Container, Field, Label, Control, Select, Button } from "bloomer";
import capitalize from "lodash/capitalize";
import Checkout, { Customer } from "./checkout";
import "./App.css";

class App extends Component {
  state = {
    customer: "default",
    items: []
  };

  numItems = itemType =>
    this.state.items.filter(item => item === itemType).length;

  addItem = itemType =>
    this.setState({
      items: [...this.state.items, itemType]
    });

  getTotal = () => {
    const { customer, items } = this.state;
    const checkout = new Checkout(Customer.create(customer));
    checkout.addAll(items);
    return checkout.total();
  };

  render() {
    return (
      <Container>
        <Field>
          <Label>Customer:</Label>
          <Control>
            <Select
              value={this.state.customer}
              onChange={event =>
                this.setState({ customer: event.target.value })
              }
            >
              {["default", "unilever", "apple", "nike", "ford"].map(
                customer => (
                  <option key={customer} value={customer}>
                    {capitalize(customer)}
                  </option>
                )
              )}
            </Select>
          </Control>
        </Field>
        {["classic", "standout", "premium"].map(itemType => (
          <Field key={itemType}>
            <Label>
              {capitalize(itemType)} ({this.numItems(itemType)})
            </Label>
            <Control>
              <Button onClick={() => this.addItem(itemType)}>Add</Button>
            </Control>
          </Field>
        ))}
        <h2>Total: {this.getTotal()}</h2>
      </Container>
    );
  }
}

export default App;
