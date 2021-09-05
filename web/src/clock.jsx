import React, { Component } from "react";
import axios from "axios";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            date: new Date(),
            E_Angle:"",
            E_Direct:"",
            E_Velo:"",
            Velo_rel:"",
            state:"",
                        
        };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    async tick() {
      this.setState({
        date: new Date()
      });
      const dataApiUrl = ("https://karmazone-4a7ed-default-rtdb.asia-southeast1.firebasedatabase.app/.json")
      const res = await axios.get(dataApiUrl)
      this.setState( {E_Angle: res.data['Tianmu']['E_Angle']} )
      this.setState( {E_Direct: res.data['Tianmu']['E_Direct']} )
      this.setState( {E_Velo: res.data['Tianmu']['E_Velo']} )
      this.setState( {Velo_rel: res.data['Tianmu']['E_Angle']} )

      if (res.data['Tianmu']['E_Angle'] == 0.0) {
        this.setState( {state: "未出棒"} )
      }else{
        this.setState( {state: "出棒"} )
      }
    }
  
    render() {
      return (
        <div>
          <h1>天母棒球場即時數據</h1>
          <ul>
              <li>擊球仰角: {this.state.E_Angle}</li>
              <li>擊球方向: {this.state.E_Direct}</li>
              <li>擊球初速: {this.state.E_Velo}</li>
              <li>速度: {this.state.Velo_rel}</li>
              <li>出棒判斷: {this.state.state}</li>
          </ul>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
}

export default Clock;