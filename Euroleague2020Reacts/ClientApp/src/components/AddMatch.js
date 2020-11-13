import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export class Match {
    constructor() {
        this.matchID = 0;
        this.RoundNo = 0;
        this.Home_Team = "";
        this.Away_Team = "";
        this.HomePointsScored = 0;
        this.AwayPointsScored = 0;
        this.hadExtraTime = false;
        this.endOfFourthPeriodPoints = 0;
    }
}
export class Team {
    constructor() {
        this.teamID = 0;
        this.Name = "";
        this.Country = "";
        this.Coach = "";
    }
}

export class AddMatch extends Component {
    constructor(props) {
        super(props);      
        this.state = { title: "", match: new Match, loading: true };
        this.initialize();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }
   

    async initialize() {

        var matchID = this.props.match.params["MatchID"];
        if (matchID > 0) {         
            const response = await fetch('api/MatchesAPI/' + matchID);
            const data = await response.json();           
            this.setState({ title: "Edit", match: data, loading: false });
        } else {
            this.state = { title: "Create", match: new Match, loading: false };
            const responseTeams = await fetch('api/TeamsAPI');
            const dataTeams = await responseTeams.json();
            this.state = { teams: new Team, loading: false };
        }
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1> {this.state.title}</h1>
            <h3>Match</h3>
            <hr />
            {contents}
        </div>;
    }
    handleSave(event) {
        event.preventDefault();
        const dataMatch = new FormData(event.target);
        if (this.state.match.matchID) {
            var response1 = fetch('api/MatchesAPI/' + this.state.match.matchID, { method: 'PUT', body: dataMatch });
            this.props.history.push("/fetch-matches");
        } else {
            var response2 = fetch('api/MatchesAPI', { method: 'POST', body: dataMatch });
            this.props.history.push("/fetch-matches");
        }
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-matches");
    }
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="matchID" value={this.state.match.matchID} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="RoundNo">Round #</label>
                    <div className="col-md-4">
                        <input type="text" name="RoundNo" defaultValue={this.state.match.roundNo} className="form-control" required />
                    </div>
                </div>              
                  <div className="form-group row">
                        <label className="control-label col-md-12" htmlFor="Home_Team">Home Team Team</label>
                    <select value={this.state.valueHome} onChange={this.handleChangeHome}>
                            <option value="ALBA Berlin">ALBA Berlin</option>
                            <option value="Anadolu Efes Istanbul">Anadolu Efes Istanbul</option>
                            <option value="AX Armani Exchange Milan">AX Armani Exchange Milan</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Bayern Munich">Bayern Munich</option>
                            <option value="Crvena Zvezda mts Belgrade">Crvena Zvezda mts Belgrade</option>
                            <option value="CSKA Moscow">CSKA Moscow</option>
                            <option value="Fenerbahce Beko Istanbul">Fenerbahce Beko Istanbul</option>
                            <option value="Khimki Moscow">Khimki Moscow</option>
                            <option value="LDLC ASVEL Villeurbanne">LDLC ASVEL Villeurbanne</option>
                            <option value="Maccabi Tel Aviv">Maccabi Tel Aviv</option>
                            <option value="Olympiacos Piraeus">Olympiacos Piraeus</option>
                            <option value="Panathinaikos OPAP Athens">Panathinaikos OPAP Athens</option>
                            <option value="Real Madrid">Real Madrid</option>
                            <option value="TD Systems Baskonia Vitoria-Gasteiz">TD Systems Baskonia Vitoria-Gasteiz</option>
                            <option value="Valencia Basket">Valencia Basket</option>
                            <option value="Zalgiris Kaunas">Zalgiris Kaunas</option>
                            <option value="Zenit St Petersburg">Zenit St Petersburg</option>
                    </select>
                 </div>  
                 <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Home_Team">Home Team</label>
                    <div className="col-md-4">
                        <input type="text" name="Home_Team" defaultValue={this.state.match.home_Team} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Away_Team">Away Team</label>
                    <select value={this.state.valueAway} onChange={this.handleChangeAway}>
                        <option value="ALBA Berlin">ALBA Berlin</option>
                        <option value="Anadolu Efes Istanbul">Anadolu Efes Istanbul</option>
                        <option value="AX Armani Exchange Milan">AX Armani Exchange Milan</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Bayern Munich">Bayern Munich</option>
                        <option value="Crvena Zvezda mts Belgrade">Crvena Zvezda mts Belgrade</option>
                        <option value="CSKA Moscow">CSKA Moscow</option>
                        <option value="Fenerbahce Beko Istanbul">Fenerbahce Beko Istanbul</option>
                        <option value="Khimki Moscow">Khimki Moscow</option>
                        <option value="LDLC ASVEL Villeurbanne">LDLC ASVEL Villeurbanne</option>
                        <option value="Maccabi Tel Aviv">Maccabi Tel Aviv</option>
                        <option value="Olympiacos Piraeus">Olympiacos Piraeus</option>
                        <option value="Panathinaikos OPAP Athens">Panathinaikos OPAP Athens</option>
                        <option value="Real Madrid">Real Madrid</option>
                        <option value="TD Systems Baskonia Vitoria-Gasteiz">TD Systems Baskonia Vitoria-Gasteiz</option>
                        <option value="Valencia Basket">Valencia Basket</option>
                        <option value="Zalgiris Kaunas">Zalgiris Kaunas</option>
                        <option value="Zenit St Petersburg">Zenit St Petersburg</option>
                    </select>
                    </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Away_Team">Away Team</label>
                    <div className="col-md-4">
                        <input type="text" name="Away_Team" defaultValue={this.state.match.away_Team} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="HomePointsScored">Points Scored By Home Team</label>
                    <div className="col-md-4">
                        <input type="text" name="HomePointsScored" defaultValue={this.state.match.homePointsScored} className="form-control" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="AwayPointsScored">Points Scored By Away Team</label>
                    <div className="col-md-4">
                        <input type="text" name="AwayPointsScored" defaultValue={this.state.match.awayPointsScored} className="form-control" required/>
                    </div>
                </div>              
                <div className="radio">
                    <h4>Had Extra Time</h4>
                    <label>
                        <input
                            type="radio"
                            name="hadExtraTime"
                            defaultValue={this.state.hadExtraTime === "false"}//teleutaia dokimastiki prosthiki to ===...
                            value="false"
                            checked={this.state.hadExtraTime === "false"}
                            onChange={this.onValueChange}
                        />False
                     </label>
                    <label>
                        <input
                            type="radio"
                            name="hadExtraTime"
                            defaultValue={this.state.hadExtraTime === "true"}//teleutaia dokimastiki prosthiki to ===...
                            value="true"
                            checked={this.state.hadExtraTime === "true"}
                            onChange={this.onValueChange}
                        />   True                    
                     </label>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="EndOfFourthPeriodPoints">Points Before Extra Time</label>
                    <div className="col-md-4">
                        <input type="text" name="EndOfFourthPeriodPoints" defaultValue={this.state.match.endOfFourthPeriodPoints} className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form >
        );
    }
    onValueChange(event) {
        this.setState({
            hadExtraTime: event.target.value
        });
    }
    handleChangeHome = (event) => {
        this.setState({
            valueHome: event.target.value
        });
    }
    handleChangeAway = (event) => {
        this.setState({
            valueAway: event.target.value
        });
    }
}