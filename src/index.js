import React, { Component } from 'react'
import Bodymovin from 'bodymovin'

class BodymovinReact extends Component {

  static defaultProps = { 
    loop: false,
    renderer: 'svg',
    autoplay: true,
    data: {},
    style: {},
  }

  constructor (props) {
    super(props)
    this.state = {
      play: this.props.autoplay
    }
  }
  
  componentDidMount() {
    const { renderer, loop, autoplay, data } = this.props

    const animData = {
      container: this.refs.container,
      renderer: renderer,
      loop: loop,
      autoplay: autoplay,
      animationData: data
    }

    this.anim = Bodymovin.loadAnimation(animData)

    this.anim.addEventListener('complete', () => this.setState({ play: false }))
    // this.anim.addEventListener('loopComplete', () => console.log('loopComplete'))
    // this.anim.addEventListener('enterFrame', () => console.log('enterFrame'))
    // this.anim.addEventListener('segmentStart', () => console.log('segmentStart'))

    function createGradient(svg,id,stops){
      var svgNS = svg.namespaceURI;
      var grad  = document.createElementNS(svgNS,'linearGradient');
      grad.setAttribute('id',id);
      for (var i=0;i<stops.length;i++){
        var attrs = stops[i];
        var stop = document.createElementNS(svgNS,'stop');
        for (var attr in attrs){
          if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
        }
        grad.appendChild(stop);
      }

      var defs = svg.querySelector('defs') || svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild );
      return defs.appendChild(grad);
    }

    createGradient(document.querySelector('svg') ,'MyGradient',[
      {offset:'5%', 'stop-color':'#f60'},
      {offset:'95%','stop-color':'#ff6'}
    ]);
  }

  componentWillUnmount() {
    // this.anim.removeEventListener('complete', () => console.log('complete'))
    // this.anim.removeEventListener('loopComplete', () => console.log('loopComplete'))
    // this.anim.removeEventListener('enterFrame', () => console.log('enterFrame'))
    // this.anim.removeEventListener('segmentStart', () => console.log('segmentStart'))
    this.anim.destroy()
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.play) {
      this.anim.play()
    }
  }
  
  
  render() {
    const { style } = this.props
    return <div style={style} ref='container' />
  }

}

export default BodymovinReact
