import React, { Component } from 'react';
import Input from './input';
import Select from './select';
import Joi from 'joi-browser';
import { FadingCircle } from 'better-react-spinkit';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details ? error.details[0].message : error.message;
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    result.error.details.map(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
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

  renderInput = (name, label, type = 'text', required = true) => {
    const { errors, data } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        name={name}
        type={type}
        label={label}
        errors={errors[name]}
        value={data[name]}
        required={required}
      />
    );
  };

  renderSelect = (options, name, label, required = true) => {
    const { errors, data } = this.state;
    return (
      <Select
        errors={errors[name]}
        name={name}
        value={data[name]}
        options={options}
        label={label}
        required={required}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = (label, isRequesting, disabled = this.validate()) => {
    return (
      <button
        style={{
          color: 'white',
          background: '#0b0b61',
          margin: '10px 0 10px 0',
          fontSize: '15px',
          padding: '10px',
          borderRadius: '5px',
        }}
        disabled={disabled}
      >
        {label}{' '}
        {isRequesting && (
          <span
            style={{
              padding: '0',
              float: 'right',
              padding: '0 5px 0 10px',
            }}
          >
            <FadingCircle color={'white'} />
          </span>
        )}
      </button>
    );
  };
}

export default Form;
