import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      stop: 0,
      clock: 'Session',
      play: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.runTimer = this.runTimer.bind(this);
  this.pauseTimer = this.pauseTimer.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.reset = this.reset.bind(this);
  this.changeClock = this.changeClock.bind(this);
  this.playSound = this.playSound.bind(this);
  }
  increment(type) {
if (this.state.stop === 1) {
  return;
}
    type === 'bre' ?
    this.state.breakLength === 60 ? true :
    this.state.clock === 'Break' ? this.setState({breakLength: this.state.breakLength + 1, minutes: this.state.breakLength + 1, seconds: 0}) :
    this.setState({breakLength: this.state.breakLength + 1})
  : this.state.sessionLength === 60 ? true :
  this.state.clock === 'Session' ? this.setState({sessionLength: this.state.sessionLength + 1, minutes: this.state.sessionLength + 1, seconds: 0})
 : this.setState({sessionLength: this.state.sessionLength + 1})

  }
  decrement(type) {
    if (this.state.stop === 1) {
      return;
    }
    type === 'bre' ?
    this.state.breakLength <= 1 ? true :
    this.state.clock === 'Break' ? this.setState({breakLength: this.state.breakLength - 1, minutes: this.state.breakLength - 1, seconds: 0}) :
    this.setState({breakLength: this.state.breakLength - 1})
    : this.state.sessionLength <= 1 ? true :
    this.state.clock === 'Session' ? this.setState({sessionLength: this.state.sessionLength - 1, minutes: this.state.sessionLength - 1, seconds: 0})
    : this.setState({sessionLength: this.state.sessionLength - 1})

  }

  runTimer() {
   const TIMER = () => {
 if (this.state.stop === 0) {
  clearTimeout(LOOP);
  return;
} else if (this.state.minutes === 0 && this.state.seconds === 0) {
this.setState({play: 0});
  this.changeClock();
}
 else if (this.state.seconds === 0) {
  this.setState({minutes: this.state.minutes - 1, seconds: 59})
} else {this.setState({seconds: this.state.seconds - 1})}
const LOOP = setTimeout(TIMER, 1000);
    }
  const LOOP = setTimeout(TIMER, 1000);
}

pauseTimer() {
  this.state.stop === 0 ? this.setState({stop: 1}) : this.setState({stop: 0})
}
handleClick() {
  if (this.state.stop === 1) {
  this.pauseTimer();
} else {
  this.pauseTimer();
  this.runTimer();
  }
}
reset() {
  this.setState({
    breakLength: 5,
    sessionLength: 25,
    minutes: 25,
    seconds: 0,
    stop: 0,
    clock: 'Session',
    play: 0
  });
  document.getElementById('beep').pause();
  document.getElementById('beep').currentTime = 0;
}
changeClock() {
  this.setState({play: 1});
  this.state.clock === 'Session' ? this.setState({clock: 'Break', minutes: this.state.breakLength, seconds: 0})
  : this.setState({clock: 'Session', minutes: this.state.sessionLength, seconds: 0});

}
playSound() {
  if (this.state.play === 1) {
    document.getElementById('beep').play();
  }
}
  render() {
    return (
      <div className='container-fluid p-3' id='wrapper'>
        <div id='clockface' className='p-4 container-fluid'>
        <div id='timer-label' className='text-center'>{this.state.clock}</div>
        <div id='time-left' className='text-center'>
          {this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
        </div>
        <div className='row'>
        <button className='btn btn-sm oi oi-power-standby col-2 offset-3 text-success' alt='start and stop' id='start_stop' onClick={() => this.handleClick()}></button>
        <button className='btn btn-sm oi oi-loop-circular col-2 offset-2 text-danger' id='reset' onClick={this.reset}></button>
        </div>
        </div>
      <div className='row d-flex align-items-center justify-content-end'>
        <div id='break-label' className='col-5 pl-1'>Break Length</div>
        <div id='session-label' className='col-6 pl-3'>Session Length</div>
      </div>
<div className='row d-flex justify-content-start align-items-center'>
  <button className='pl-3 offset-1 col-1 btn btn-sm oi oi-caret-bottom'  id='break-decrement' alt='decrement' onClick={() => this.decrement('bre')}></button>
  <div id='break-length' className='col-1 pt-1'>{this.state.breakLength}</div>
  <button className='col-1 btn btn-sm oi oi-caret-top' id='break-increment' alt='increment' onClick={() => this.increment('bre')}></button>
    <button className='offset-2 col-1 btn btn-sm oi oi-caret-bottom' id='session-decrement' alt='decrement' onClick={() => this.decrement('session')}></button>
    <div id='session-length' className='col-1 pt-1 pr-4'>{this.state.sessionLength}</div>
    <button className='col-1 btn btn-sm oi oi-caret-top' id='session-increment' alt='increment' onClick={() => this.increment('session')}></button>
</div>
<audio id='beep' src='http://soundbible.com/mp3/Smoke%20Alarm-SoundBible.com-1551222038.mp3' />
{this.playSound()}
</div>
    );
  }
}

export default App;
