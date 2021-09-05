import React, { Component } from "react";
import axios from "axios";
import css from "../scss/videocard.scss";


class Videocard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            Video_url:"",
            Cover_url:"",
            Card_title:"",
                        
        };
    }
  
    componentDidMount() {
      this.info()
    }
  
    componentWillUnmount() {
      
    }
  
    info() {
      this.setState( {Video_url: "https://www.youtube.com/watch?v=yUm6VbWetMA"} )
      this.setState( {Cover_url: "https://i.ytimg.com/vi/PV0deTYDKek/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBBbe5gAeSbzTQaHlrgkYlGRUztiw"} )
      this.setState( {Card_title: "109UBA冠軍賽::世新大學vs政治大學::男一級 富邦人壽UBA大專籃球聯賽 完整賽事VOD"} )      

    }
  
    render() {
      return (
        <div>
          <div className="card">
            <a href={this.state.Video_url}>
              <img className="video_cover" src={this.state.Cover_url} alt=""/>
              <div className="video_info">
                <div className="card_title">
                  <h3>{this.state.Card_title}</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      );
    }
}

export default Videocard;