import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";

export class FetchTeams extends Component {
    constructor(props) {
        super(props);
        this.state = { teams: [], loading: true };
    }
    componentDidMount() {      
        this.populateTeamsData();
    }
    async populateTeamsData() {
        const response = await fetch('api/TeamsAPI');
        const data = await response.json();
        this.setState({ teams: data , loading: false });
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTeamsTable(this.state.teams);
        return (
            <div>
                <h1 id="tableLabel">Teams</h1>
                <p>
                    <Link to="/addteam">Create New Team</Link>
                </p>
                {contents}
            </div>
        );
    }
    renderTeamsTable(teams) {
        return (
            <table class="table table-striped table-bordered table-hover">
                <tr>
                    <th>Team #</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Coach</th>
                </tr>
                <tbody>
                    {teams.map(team =>
                        <tr key={team.teamID} >
                            <td >{team.teamID}</td>
                            <td>{team.name}</td>
                            <td>{team.country}</td>
                            <td>{team.coach}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(team.teamID)}>Edit</button>&nbsp;
                                 <button className="btn btn-danger" onClick={(id) => this.handleDelete(team.teamID, team.name)}>Delete</button>&nbsp;
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        );
    }
    handleEdit(id) {
        this.props.history.push("/teams/edit/" + id);
    }
    handleDelete(id, name) {
        if (!window.confirm("Do you want to delete: " + name)) {
            return;
        } else {
            fetch('api/TeamsAPI/' + id, { method: 'delete' }).then(data => {
                this.setState({
                    data: this.state.teams.filter((rec) => {
                        return rec.TeamID != id;
                    })
                })
            });
        }

    }
}