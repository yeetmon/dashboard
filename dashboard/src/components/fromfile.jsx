import React from 'react';
import $ from 'jquery';
import HistoricalChart from './historicalChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PlayerSwitch from './switches';
import dateFormat from 'dateformat';


class FromFile extends React.Component {
    loadFile(fileName) {
        $.when(
            $.getJSON(fileName, (content) => {
                this.setState({
                    data: content,
                    loaded: true,
                });
            })
        );
    }

    getFileName = () => {
        let fileName = this.state.eamon ? 'stack-logs/eamon' : 'stack-logs/yeetmon';
        fileName += dateFormat(this.state.date, "-yyyy-mm-dd");
        fileName += '.json';
        return fileName
    }

    onDateChange = date => {
        this.setState({ date });
        let fileName = this.getFileName();
        this.loadFile(fileName);
    }

    handleSwitch = () => {
        this.setState({eamon: !this.state.eamon});
        let fileName = this.getFileName();
        this.loadFile(fileName);
    }

    state = {
        data: null,
        loaded: false,
        date: new Date(),
        eamon: true
    };

    componentDidMount() {
        console.log('here');
        $.when(
            $.getJSON('stack-logs/eamon-2020-09-09.json', (content) => {
                this.setState({
                    data: content,
                    loaded: true
                });
            })
        );
        console.log('mounted');
    }

    render() {
        if (this.state.loaded) {
            return (
                <>
                    <PlayerSwitch handleSwitch={this.handleSwitch.bind(this)} />
                    <Calendar
                        onChange={this.onDateChange}
                        value={this.state.date}
                    />
                    <HistoricalChart data={this.state.data} />
                </>
            );
        }
        else {
            return <p>Loading...</p>;
        }
    }

}

export default FromFile;