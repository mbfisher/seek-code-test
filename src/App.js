import React, { Component } from "react";
import { Field, Label, Control, Select, Button } from "bloomer";
import capitalize from "lodash/capitalize";
import Checkout, { Customer } from "./checkout";
import { FieldLabel } from "bloomer/lib/elements/Form/Field/FieldLabel";
import { FieldBody } from "bloomer/lib/elements/Form/Field/FieldBody";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Box } from "bloomer/lib/elements/Box";
import { Title } from "bloomer/lib/elements/Title";

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

  removeItem = itemType => {
    const index = this.state.items.indexOf(itemType);

    if (index < 0) {
      return;
    }

    const nextItems = [...this.state.items];
    nextItems.splice(index, 1);
    this.setState({
      items: nextItems
    });
  };

  getTotal = () => {
    const { customer, items } = this.state;
    const checkout = new Checkout(Customer.create(customer));
    checkout.addAll(items);
    return checkout.total();
  };

  render() {
    return (
      <Box className="checkout">
        <Title>Checkout</Title>
        <Field isHorizontal>
          <FieldLabel isNormal>
            <Label>Customer</Label>
          </FieldLabel>
          <FieldBody>
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
          </FieldBody>
        </Field>
        {["classic", "standout", "premium"].map(itemType => (
          <Field key={itemType} isHorizontal>
            <FieldLabel isNormal>
              <Label>
                {capitalize(itemType)} ({this.numItems(itemType)})
              </Label>
            </FieldLabel>
            <FieldBody>
              <Field isGrouped>
                <Control>
                  <Button onClick={() => this.addItem(itemType)}>Add</Button>
                </Control>
                <Control>
                  <Button onClick={() => this.removeItem(itemType)}>
                    Remove
                  </Button>
                </Control>
              </Field>
            </FieldBody>
          </Field>
        ))}
        <Field isHorizontal>
          <FieldLabel isNormal>
            <Label>Total</Label>
          </FieldLabel>
          <FieldBody>
            <Control>
              <Input disabled value={`$${this.getTotal().toFixed(2)}`} />
            </Control>
          </FieldBody>
        </Field>
      </Box>
    );
  }
}

export default App;
