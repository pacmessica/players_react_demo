import React from 'react';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';
import jQuery from 'jquery';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      message: "Nobody scored yet.",
      players: [],
      isLoading: true
    };
  }

  componentDidMount(){
    var self = this;
    jQuery.getJSON("http://hook.io/nextminds/scores", function(data){

      self.setState({
          players: data.players,
          isLoading: false
      });
    });

  }

  onScoreChanged(name, score){
    var oldPlayers = this.state.players;
    var newPlayers = oldPlayers.map(function(player){
      if(player.name == name){
        return { name: player.name, score: score };
      }
        // return player;
        return { name: player.name, score: player.score -1 }
    });

    this.setState({
      message: name + " scored, and now has " + score + " points",
      players: newPlayers
    });

    this.saveData(newPlayers);
  }

  renderPlayer( player ){
    return <Player
    name={player.name}
    score={player.score}
    onScoreChanged={this.onScoreChanged.bind(this)} />;
  }

  onNewPlayer(playerName){
    var newPlayer = {
      name: playerName,
      score: 0
    };

    var newPlayers = this.state.players.concat(newPlayer);
    this.setState({
      players: newPlayers
    });

    this.saveData(newPlayers);
  }

  saveData(newPlayers){
    jQuery.ajax({
      type: "POST",
      url: "http://hook.io/nextminds/scores",
      data: JSON.stringify({
        players: newPlayers
      }),
      contentType: "application/json",
      dataType: "json"
    });
  }

  renderLoader(){
    if(this.state.isLoading){
      return <img src="https://s-media-cache-ak0.pinimg.com/originals/eb/d7/cd/ebd7cda5560d9e2b96ed10312233ef5c.jpg" />;
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        <table>
          <tbody>
            {this.state.players.map(this.renderPlayer.bind(this))}
          </tbody>
        </table>
        {this.state.message}
        <AddPlayerForm onSubmit={this.onNewPlayer.bind(this)}/>
      </div>
    );
  }
}

export default App;
