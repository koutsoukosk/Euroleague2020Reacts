import React, { Component } from 'react';

export class Team {
    constructor() {
        this.teamID = 0;
        this.Name = "";
        this.Country = "";
        this.Coach = "";
    }
}
export class AddTeam extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", team: new Team, loading: true };
        this.initialize();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    async initialize() {
        var teamID = this.props.match.params["TeamID"];
        if (teamID > 0) {
            const response = await fetch('api/TeamsAPI/' + teamID);
            const data = await response.json();
            this.setState({ title: "Edit", team: data, loading: false });
        } else {
            this.state = { title: "Create", team: new Team, loading: false };
        }
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1> {this.state.title}</h1>
            <h3>Team</h3>
            <hr />
            {contents}
        </div>;

    }
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.team.teamID) {
            var response1 = fetch('api/TeamsAPI/' + this.state.team.teamID, { method: 'PUT', body: data });
            this.props.history.push("/fetch-teams");
        } else {
            var response2 = fetch('api/TeamsAPI', { method: 'POST', body: data });
            this.props.history.push("/fetch-teams");
        }
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-teams");
    }
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="teamID" value={this.state.team.teamID} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input type="text" name="Name" defaultValue={this.state.team.name} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="country">Country</label>
                    <div className="col-md-4">
                        <input type="text" name="country" defaultValue={this.state.team.country} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="coach">Coach</label>
                    <div className="col-md-4">
                        <input type="text" name="coach" defaultValue={this.state.team.coach} className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form >
        );
    }
}