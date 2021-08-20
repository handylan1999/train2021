import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import axios from "axios";
import css from "../scss/video_module.scss";

class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options_test:[]
        };
        //
    }


    // load view on start
    componentDidMount() {
        this.getOptions();
    }

    async getOptions() {
        const options = [
            { value: '0', label: 'Coco' },
            { value: '1', label: 'Strawberry' },
            { value: '2', label: 'Vanilla' }
        ]
        this.setState({ options_test: options });
        
        const res = await axios.post('http://localhost:5500/api',
        {
            id: 0,
            title: 'Chocolate',
            author: 'User'
        });

        console.log(res.data);
    }

    render() {
        //
        return (
            <React.Fragment>
                <nav>
                    <h1>條件選擇</h1>
                    <ul className="choose">
                        <li>
                            <a href="#">選擇年份</a>
                            <ul>
                                <li><a href="#">2018</a></li>
                                <li><a href="#">2019</a></li>
                                <li><a href="#">2021</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">選擇盃賽</a>
                            <ul>
                                <li><a href="#">UBA</a></li>
                                <li><a href="#">友誼賽</a></li>
                                <li><a href="#">實習盃</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">選擇學校</a>
                            <ul>
                                <li><a href="#">台灣體大</a></li>
                                <li><a href="#">世新大學</a></li>
                                <li><a href="#">政治大學</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">進攻/防守</a>
                            <ul>
                                <li><a href="#">進攻</a></li>
                                <li><a href="#">防守</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div>
                        <h1>附加條件</h1>
                        <h2>條件選擇：</h2>
                        <div>
                            <h2>條件選擇：</h2>
                            <li><a href="#">HIGH LOW</a></li>
                            <li><a href="#">LOW POST</a></li>
                            <li><a href="#">Pick and Roll</a></li>
                            <li><a href="#">Pick and Pop</a></li>
                            <li><a href="#">Double Screen</a></li>
                            <li><a href="#">Screen</a></li>
                            <li><a href="#">Back Door</a></li>
                            <li><a href="#">Give and Go</a></li>
                        </div>
                        <div>
                            <h2>條件選擇：</h2>
                            <li><a href="#">全場大3-2</a></li>
                            <li><a href="#">全場大2-2-1</a></li>
                            <li><a href="#">全場盯人</a></li>
                            <li><a href="#">全場大1盯4</a></li>
                            <li><a href="#">全場包夾</a></li>
                            <li><a href="#">半場盯人</a></li>
                            <li><a href="#">半場包夾</a></li>
                            <li><a href="#">2-3區域</a></li>
                            <li><a href="#">3-2區域</a></li>
                            <li><a href="#">1-3-1區域</a></li>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm bg-danger">
                        One of three columns
                        </div>
                        <div className="col-sm bg-info">
                        One of three columns
                        </div>
                        <div className="col-sm bg-secondary">
                        One of three columns
                        </div>
                    </div>
                </div>
                <Select options={this.state.options_test}/>

            </React.Fragment >
        );
    }
}
export default VideoModule;

if (document.getElementById("video_module")) {
    ReactDOM.render(<VideoModule />, document.getElementById("video_module"));
}

