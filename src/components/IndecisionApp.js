import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: []
      }
    });
  };
  handleClearSelectedOption = () => {
    this.setState(() => {
      return {
        selectedOption: undefined
      };
    });
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => {
      return {
        selectedOption: option
      };
    });
  };
  handleAddOption = (option) => {
    if(!option) {
      return 'enter valid value to add item';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'this option already exists';
    } else {

    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      };
    });
  };


  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if(options){
        this.setState(() => {
          return {
            options: options
          };
        });
      }
    } catch(e) {
      //do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('will mount');
  }


  render() {
    const subtitle = 'Let your computer decide';
    return (
      <div>
        <Header subtitle={subtitle}/>
        <div className="container ">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}
