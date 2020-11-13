import React, { PureComponent } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export class FirstComponents extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            tableData: [],
            orgTableData: [],
            perPage: 8,
            currentPage:0
        }
    }
    componentDidMount() {
        this.populateMatchesData();
    }
    async populateMatchesData() {
        const responseMatch = await fetch('api/MatchesAPI');
        const dataMatch = await responseMatch.json();
        axios
            .get(this.state.data)
            .then(res => {
                var data = res.data;
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgTableData: res.data,
                    tableData: res.data
                })

            })
    }
   

    render() {
        return (
            <div>
                <h1> My first table with pages in React</h1>
                <table border="1">
                    <thead>
                        <th>Round #</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Home Points Scored</th>
                        <th>Away Points Scored</th>
                        <th>Had Extra Time</th>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map(match =>
                                <tr>
                                    <td >{match.roundNo}</td>
                                    <td>{match.home_Team}</td>
                                    <td>{match.away_Team}</td>
                                    <td>{match.homePointsScored}</td>
                                    <td>{match.awayPointsScored}</td>
                                    <td>{match.hadExtraTime.toString()}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={(id) => this.handleEdit(match.matchID)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(match.matchID, match.home_Team, match.away_Team)}>Delete</button>&nbsp;
                            </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            )
    }
    handleEdit(id) {
        this.props.history.push("/matches/edit/" + id);
    }
    handleDelete(id, hometeam, awayteam) {
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

export default FirstComponents