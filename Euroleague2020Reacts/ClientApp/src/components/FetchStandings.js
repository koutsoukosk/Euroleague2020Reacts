import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchStandings extends Component {
    constructor(props) {
        super(props);
        this.state = { standings: [], loading: true };
    }
    componentDidMount() {
        this.populateStandingsData();
    }
    async populateStandingsData() {
        const responseStandings = await fetch('api/StandingsAPI');
        const dataStandings = await responseStandings.json();
        this.setState({ standings: dataStandings, loading: false });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStandingsTable(this.state.standings);
        return (
            <div>
                <h1 id="tableLabel">Standings</h1>
                {contents}
            </div>
        );
    }
    renderStandingsTable(standings) {
        return (
            <table class="table table-striped table-bordered table-hover" >
                <tr>
                    <th>Position #</th>
                    <th>Matches #</th>
                    <th>Home Team</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Points +</th>
                    <th>Points -</th>
                    <th>Points Dif</th>
                    <th>Extra Times</th>
                </tr>
                <tbody>
                    {standings.map(standing =>
                        <tr key={standing.positionNo} >
                            <td>{standing.positionNo}</td>
                            <td>{standing.matchesNo}</td>
                            <td>{standing.teamName}</td>
                            <td>{standing.wins}</td>
                            <td>{standing.loses}</td>
                            <td>{standing.pointsPlus}</td>
                            <td>{standing.pointsMinus}</td>
                            <td>{standing.pointsDif}</td>
                            <td>{standing.extraTimeMatches}</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        );
    }

}