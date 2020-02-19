import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    // const result = schema.validate({ username: 'abc', password: 'abc' });
    const { error } = this.schema.validate(this.state.data, options);
    // const { error } = Joi.validate(this.state.data, this.schema, options);
    //const error = null;
    console.log("error is: ", error);

    if (!error) return null;

    // get array of error messages nested inside result and map it into an object
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }

    // Block of code not working
    /*     const Joi = require("@hapi/joi");
    
    const schemaOriginal = {
      username: Joi.string()
        .required()
        .label("Username"),
      password: Joi.string()
        .required()
        .label("Password")
    };

    const obj = { [name]: value };
    //const options = { abortEarly: false };
    const schema = schemaOriginal[name] ;
    console.log('obj is: ', obj);
    console.log('schema is: ', schema);
    const options = { abortEarly: false };
    const { error } = schema.validate(obj, options);
    return error ? error.details[0].message : null; */
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log("from handleSubmit method: ", errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
