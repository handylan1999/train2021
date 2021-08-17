import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import axios from "axios";
import css from "../scss/video_module.scss";

class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            selectNamesOptions: [],
            selectOptions: [],
            selected: "1",
            selected_2: "2"
        };
        //
        this.selectedHandleChange = this.selectedHandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // load view on start
    componentDidMount() {
        this.getSelectOptions()
    }

    // Get Select Options
    async getSelectOptions() {
        const options = [
            { value: '0', label: 'Chocolate' },
            { value: '1', label: 'Strawberry' },
            { value: '2', label: 'Vanilla' }
        ]
        this.setState({ selectNamesOptions: options });
    }

    // Get Options
    async getOptions() {
        const options = [
            { value: '0', label: '111' },
            { value: '1', label: '222' },
            { value: '2', label: '333' }
        ]
        this.setState({ selectOptions: options });
    }

    async selectedHandleChange(e) {
        const selected = "此選項編號:" + e.value + "您選擇的是:" + e.label
        this.setState({ selected: selected });
        this.getOptions()
    }

    async handleChange(e) {
        const selected = "此選項編號:" + e.value + "您選擇的是:" + e.label
        this.setState({ selected_2: selected });
    }

    render() {

        const {
            selectNamesOptions,
            selected,
            selected_2,
            selectOptions
        } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-4 bg-danger">
                            <Select
                                placeholder="選擇"
                                options={selectNamesOptions}
                                onChange={this.selectedHandleChange}
                            />
                            <Select
                                placeholder="123456"
                                options={selectOptions}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="col-8 bg-info text-center text-white">
                            <label>{selected}</label>
                            <label>{selected_2}</label>
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
}