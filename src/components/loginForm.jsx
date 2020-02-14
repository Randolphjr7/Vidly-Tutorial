import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {
      username: ""
    }
  };

  validate = () => {
    const Joi = require("@hapi/joi");
    const schema = Joi.object({
      username: Joi.string()
        .required()
        .label("Username"),
      password: Joi.string()
        .required()
        .label("Password")
    });

    const options = { abortEarly: false };
    // const result = schema.validate({ username: 'abc', password: 'abc' });
    const { error } = schema.validate(this.state.account, options);
    console.log("error is: ", error);

    if (!error) return null;

    // get array of error messages nested inside result and map it into an object
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
    /*     
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors; 
*/
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log("from handleSubmit method: ", errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }

    // Block of code not working 
   /*  const Joi = require("@hapi/joi");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null; */
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
