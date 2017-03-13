import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Bodymovin from '../src/index'
import json from './data.json'
import './style.css'

storiesOf('Hello', module)
  .add('simple', () => (
    <Bodymovin  data={json} />
  ))
  .add('loop', () => (
    <Bodymovin loop={true} data={json} />
  ))
  .add('play on click', () => (
    <AutoPlay />
  ))
  
class AutoPlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      play: false
    }
  }
  render () {
    return (
      <div>
        <button onClick={() => this.setState({ play: true })}>Play</button>
        <Bodymovin play={this.state.play} autoplay={false} data={json} />
      </div>
    )
  }
}
