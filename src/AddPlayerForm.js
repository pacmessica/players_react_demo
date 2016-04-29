import React from 'react';


class AddPlayerForm extends React.Component {

  onSubmit(event){
    event.preventDefault();
    var playerName = this.refs.playerInput.value;
    this.props.onSubmit(playerName); 

  }

  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Player name:</label>
        <input ref="playerInput"/>
        <button>Add Player</button>
      </form>
    );
  }
}




export default AddPlayerForm;
