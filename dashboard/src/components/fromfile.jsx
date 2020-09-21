import React from 'react';
import $ from 'jquery';
import HistoricalChart from './historicalChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PlayerSwitch from './playerSwitch';
import TimeSwitch from './timeSwtich';
import dateFormat from 'dateformat';
import './fromfile.css';


class FromFile extends React.Component {
    loadFile() {
        $.when(
            $.getJSON(this.getFileName(), (content) => {
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
        if (!this.state.night) {
            fileName += '-day';
        }
        fileName += '.json';
        return fileName;
    }

    onDateChange = date => {
        this.setState({ date }, this.loadFile);
    }

    previousDay = () => {
        const prevData = new Date();
        prevData.setDate(this.state.date.getDate() - 1);
        this.setState({date: prevData}, this.loadFile);
    }

    nextDay = () => {
        const nextDate = new Date();
        nextDate.setDate(this.state.date.getDate() + 1);
        this.setState({date: nextDate}, this.loadFile);
    }

    handleSwitch = () => {
        this.setState({ eamon: !this.state.eamon }, this.loadFile);
    }

    handleTimeSwitch = () => {
        this.setState({ night: !this.state.night }, this.loadFile);
    }

    handleCalendarDisplay = () => {
        this.setState({ showCalendar: !this.state.showCalendar });
    }

    showTimeSwitch = () => {
        const day = this.state.date.getDay();
        return day === 5 || day === 6;
    }

    state = {
        data: null,
        loaded: false,
        date: null,
        eamon: true,
        showCalendar: false,
        night: true,
    };

    componentWillMount() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.setState({ date: yesterday });
    }

    componentDidMount() {
        this.loadFile();
    }

    render() {
        if (this.state.loaded) {
            return (
                <>
                    <div className='topPanel'>
                        <div className='topPanel__el'>
                            <PlayerSwitch handleSwitch={this.handleSwitch.bind(this)} />
                        </div>
                        <div className='topPanel__el' style={{ display: this.showTimeSwitch() ? "block" : "none" }}>
                            <TimeSwitch handleSwitch={this.handleTimeSwitch.bind(this)} className='topPanel__el' />
                        </div>
                        <button onClick={this.previousDay}>{"<"}</button>
                        <p id="date">{dateFormat(this.state.date, "dd/mm/yyyy")}</p>
                        <button onClick={this.nextDay} className='topPanel__el'>{">"}</button>
                        <button type="button" onClick={this.handleCalendarDisplay}>{this.state.showCalendar ? "hide" : "show calendar"}</button>
                        <div style={{ display: this.state.showCalendar ? "block" : "none" }}>
                            <Calendar
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                        </div>
                    </div>
                    <div style={{position: 'relative', height:'60vh', width:'80vw'}}>
                        <HistoricalChart data={this.state.data} />
                    </div>
                </>
            );
        }
        else {
            return <p>Loading...</p>;
        }
    }

}

export default FromFile;