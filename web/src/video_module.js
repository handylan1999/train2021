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
            selected: ""
        };
        //
        this.selectedHandleChange = this.selectedHandleChange.bind(this);
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

    async selectedHandleChange(e) {
        const selected = "此選項編號:" + e.value + "您選擇的是:" + e.label
        this.setState({ selected: selected });
    }

    render() {

        const {
            selectNamesOptions,
            selected
        } = this.state;

        return (
            <React.Fragment>
                <div class="container">
                    <div class="row">

                        <div class="col-4 bg-danger">
                            <Select
                                placeholder="選擇"
                                options={selectNamesOptions}
                                onChange={this.selectedHandleChange}
                            />
                        </div>

                        <div class="col-8 bg-info text-center text-white">
                            <label>{selected}</label>
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