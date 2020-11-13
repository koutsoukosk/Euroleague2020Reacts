import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class FetchMatches extends Component {
    constructor(props) {
        super(props);
        this.state = { matches: [], loading: true };
    }
    componentDidMount() {
        this.populateMatchesData();
    }
    async populateMatchesData() {
        const responseMatch = await fetch('api/MatchesAPI');
        const dataMatch = await responseMatch.json();
        this.setState({ matches: dataMatch, loading: false });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMatchesTable(this.state.matches);
        return (
            <div>
                <h1 id="tableLabel">Matches</h1>
                <p>
                    <Link to="/addmatch">Create New Match</Link>
                </p>
                {contents}
            </div>
        );
    }

    renderMatchesTable(matches) {
        return (
            <table class="table table-striped table-bordered table-hover" >
                <tr>
                    <th>Round #</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Home Points Scored</th>
                    <th>Away Points Scored</th>
                    <th>Had Extra Time</th>
                    <th>End Of Fourth Period Points</th>
                </tr>
                <tbody>
                    {matches.map(match =>
                        <tr key={match.matchID} >
                            <td>{match.roundNo}</td>
                            <td>{match.home_Team}</td>
                            <td>{match.away_Team}</td>
                            <td>{match.homePointsScored}</td>
                            <td>{match.awayPointsScored}</td>
                            <td>{match.hadExtraTime.toString()}</td>
                            <td>{match.endOfFourthPeriodPoints}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(match.matchID)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(match.matchID, match.home_Team, match.away_Team)}>Delete</button>&nbsp;
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        );
    }
    handleEdit(id) {
        this.props.history.push("/matches/edit/" + id);
    }
    handleDelete(id, hometeam,awayteam) {
        if (!window.confirm("Do you want to delete the match between " + hometeam + " and " + awayteam)) {
            return;
        } else {
            fetch('api/MatchesAPI/' + id, { method: 'delete' }).then(data => {
                this.setState({
                    dataMatch: this.state.matches.filter((rec) => {
                        return rec.matchID != id;
                    })
                })
            });
        }

    }
}