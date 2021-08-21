import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import ReactPlayer from 'react-player/youtube';
import axios from "axios";
import css from "../scss/video_module.scss";

class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            selectYearOptions: [],
            selectGamenameOptions: [],
            selectSchoolOptions: [],
            selectStausOptions: [],
            selectOptions: [],
            gameAllData:[],
            selected: ""
        };
        //
        this.selectedHandleChange = this.selectedHandleChange.bind(this);
    }

    // load view on start
    componentDidMount() {
        this.getSelectOptions();
    }

    // Get Data
    async getGameAllData(teamType) {
        const dataApiUrl = ("/data");
        const res = await axios.post(dataApiUrl, { 'teamType': teamType });
        const data = res.data;
        this.setState({ gameAllData: data });
    }

    // Get Select Options
    async getSelectOptions() {
        const options = [
            { value: '0', label: 'Guest' },
            { value: '1', label: 'Home' }
        ]
        this.setState({ selectOptions: options });
        this.getSelectYearOptions();
    }

    // Get Select Year Options
    async getSelectYearOptions() {
        const options = [
            { value: '0', label: '2019' },
            { value: '1', label: '2020' },
            { value: '2', label: '2021' }
        ]
        this.setState({ selectYearOptions: options });
        this.getSelectGamenameOptions();
    }

    // Get Select Gamename Options
    async getSelectGamenameOptions() {
        const options = [
            { value: '0', label: 'UBA' },
            { value: '1', label: '友誼賽' },
            { value: '2', label: '實習盃' }
        ]
        this.setState({ selectGamenameOptions: options });
        this.getSelectSchoolOptions();
    }

    // Get Select School Options
    async getSelectSchoolOptions() {
        const options = [
            { value: '0', label: '台灣體大' },
            { value: '1', label: '世新大學' },
            { value: '2', label: '政治大學' }
        ]
        this.setState({ selectSchoolOptions: options });
        this.getSelectStausOptions();
    }

    // Get Select Staus Options
    async getSelectStausOptions() {
        const options = [
            { value: '0', label: '進攻' },
            { value: '1', label: '防守' }
        ]
        this.setState({ selectStausOptions: options });
    }

    // select Handle Change
    async selectedHandleChange(e) {

        this.getGameAllData(e.label)

        if (e.label == 'Guest'){
            const selected = "此選項編號: " + e.value + " 您選擇的是: 客隊"
            this.setState({ selected: selected });
        }else{
            const selected = "此選項編號: " + e.value + " 您選擇的是: 主隊"
            this.setState({ selected: selected });
        }
    }

    render() {

        const {
            selectYearOptions,
            selectGamenameOptions,
            selectSchoolOptions,
            selectStausOptions,
            selectOptions,
            selected,
            gameAllData
        } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-4">
                            <Select
                                placeholder="選擇"
                                options={selectOptions}
                                onChange={this.selectedHandleChange}
                            />
                            <Select
                                placeholder="選擇年份"
                                options={selectYearOptions}
                            //    onChange={this.selectedHandleChange}
                            />
                            <Select
                                placeholder="選擇盃賽"
                                options={selectGamenameOptions}
                            //    onChange={this.selectedHandleChange}
                            />
                            <Select
                                placeholder="選擇學校"
                                options={selectSchoolOptions}
                            //    onChange={this.selectedHandleChange}
                            />
                            <Select
                                placeholder="進攻/防守"
                                options={selectStausOptions}
                            //    onChange={this.selectedHandleChange}
                            />
                            <p className="text-center">{selected}</p>
                        </div>

                        <div className="col">
                            <ReactPlayer
                                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                playing
                                width='100%'
                                height='100%'
                            />
                            <table className="table table-striped">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">局數</th>
                                        <th scope="col">打者</th>
                                        <th scope="col">投手</th>
                                        <th scope="col">球種</th>
                                        <th scope="col">球速</th>
                                        <th scope="col">結果</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {gameAllData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.局數}</td>
                                            <td>{data.投手}</td>
                                            <td>{data.打者}</td>
                                            <td>{data.球種}</td>
                                            <td>{data.球速}</td>
                                            <td>{data.結果}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default VideoModule;

if (document.getElementById("video_module")) {
    ReactDOM.render(<VideoModule />, document.getElementById("video_module"));
    ReactDOM.render(<VideoModule />, document.getElementById('col'));
}