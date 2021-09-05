import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import axios from "axios";
import css from "../scss/video_module.scss";
import Clock from "./clock.jsx";
import ReactPlayer from "react-player";
import Button from 'react-bootstrap/Button';
import Videocard from "./videocard.jsx";

class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            selectYearOptions: [],
            selectGamenameOptions: [],
            selectSchoolOptions: [],
            selectStausOptions: [],
            selectGroupOptions: [],
            selectOptions: [],
            gameAllData:[],
            selected: "",
            value: ""
        };
        //
        this.selectedHandleChange = this.selectedHandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // load view on start
    componentDidMount() {
        this.getSelectYearOptions();
        this.getSelectGamenameOptions();
        this.getSelectSchoolOptions();
        this.getSelectStausOptions();
        this.getSelectGroupOptions();
        this.getSelectOptions();
    }

    // Get Select Year Options
    async getSelectYearOptions() {
        const options = [
            { value: '0', label: '2019' },
            { value: '1', label: '2020' },
            { value: '2', label: '2021' }
        ]
        this.setState({ selectYearOptions: options });
    }

    // Get Select Gamename Options
    async getSelectGamenameOptions() {
        const options = [
            { value: '0', label: 'UBA' },
            { value: '1', label: '友誼賽' },
            { value: '2', label: '實習盃' }
        ]
        this.setState({ selectGamenameOptions: options });
    }

    // Get Select School Options
    async getSelectSchoolOptions() {
        const options = [
            { value: '0', label: '台灣體大' },
            { value: '1', label: '世新大學' },
            { value: '2', label: '政治大學' }
        ]
        this.setState({ selectSchoolOptions: options });
    }

    // Get Select Staus Options
    async getSelectStausOptions() {
        const options = [
            { value: '0', label: '進攻' },
            { value: '1', label: '防守' }
        ]
        this.setState({ selectStausOptions: options });
    }

    // Get Select Group Options
    async getSelectGroupOptions() {
        const options = [
            {
                label: "禁區",
                options: [
                  { value: "value_1", label: "HIGH LOW" },
                  { value: "value_2", label: "LOW POST" }
                ]
            },
            {
                label: "擋拆",
                options: [
                  { value: "value_3", label: "Pick and Roll" },
                  { value: "value_4", label: "Pick and Pop" },
                  { value: "value_5", label: "Screen" },
                  { value: "value_6", label: "Double Screen" }
                ]
            },
            {
                label: "空手切",
                options: [
                  { value: "value_7", label: "Back Door" },
                  { value: "value_8", label: "Give and Go" }
                ]
            },
            {
                label: "全場防守",
                options: [
                  { value: "value_1", label: "全場大3-2" },
                  { value: "value_2", label: "全場大2-2-1" },
                  { value: "value_3", label: "全場盯人" },
                  { value: "value_4", label: "全場大1盯4" },
                  { value: "value_5", label: "全場包夾" }
                ]
            },
            {
                label: "半場防守",
                options: [
                  { value: "value_5", label: "半場盯人" },
                  { value: "value_6", label: "半場包夾" }
                ]
            },
            {
                label: "陣地防守",
                options: [
                  { value: "value_7", label: "2-3區域" },
                  { value: "value_8", label: "3-2區域" },
                  { value: "value_9", label: "1-3-1區域" }
                ]
            }
            ]
            this.setState({ selectGroupOptions: options });
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

    async handleChange(e){

        console.log('handleChange:',e);
        console.log('input:', e.target.value);

        this.setState({selected: e.target.value});
        // this.setState({value: Number(e.target.value)+1});

    }

    async handleSubmit(){

        const value = this.state.selected;

        const dataApiUrl = ("/parameter");
        const res = await axios.post(dataApiUrl, { 'value': value });
        const data = res.data;

        this.setState({ gameAllData: data });

        alert('您送出的是： ' + this.state.selected);

    }

    render() {

        const {
            selectYearOptions,
            selectGamenameOptions,
            selectSchoolOptions,
            selectStausOptions,
            selectGroupOptions,
            selectOptions,
            selected,
            gameAllData
        } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-4">
                            <h2>搜尋條件</h2>
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
                                <Select
                                    placeholder="選擇戰術"
                                    options={selectGroupOptions}
                                //    onChange={this.selectedHandleChange}
                                />
                                <div className="2buttons">
                                    <Button variant="secondary" size="lg" className="button mb-2">
                                        Clear
                                    </Button>{' '}
                                    <Button variant="primary" size="lg" className="button mb-2">
                                        Apply
                                    </Button>
                                </div>

                            {/* <Clock ></Clock> */}
                                {/* <Select
                                className="mb-2"
                                    placeholder="選擇"
                                    options={selectOptions}
                                    onChange={this.selectedHandleChange}
                                />

                                <p className="text-center mb-2">{selected}</p>
                                
                                <form className="form-group" onSubmit={this.handleSubmit}>
                                    <input type="text" className="form-control mb-2" defaultValue={this.state.value} onChange={this.handleChange} />
                                    <input type="submit" value="送出" className="btn btn-primary form-control mb-2" />
                                </form> */}

                            </div>

                        <div className="col">
                            <div>
                                <ReactPlayer
                                    url='https://www.youtube.com/watch?v=yUm6VbWetMA'
                                    controls={true}
                                    width='100%'
                                />
                            </div>
                            <div>
                                <h3>搜尋結果</h3>
                            </div>
                            <div className="Searchresult">
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                                <Videocard></Videocard>
                            </div>
                            {/* <table className="table table-striped">
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
                            </table> */}
                        </div>

                    </div>
                </div>
            </React.Fragment >
        );
    }
}
// export default VideoModule;


if (document.getElementById("video_module")) {
    ReactDOM.render(<VideoModule />, document.getElementById("video_module"));
}