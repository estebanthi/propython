import {Component} from "react";
const axios = require("axios");


class DatabaseQueries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.UsersList();
    }

    UsersList() {

        axios.get("/api/users")
            .then((res) => res.data).then(data => this.setState({users:data}))
    }


    render() {

        var users;
        if (this.state.users) {
            return this.state.users.map(user => <li>{user.username}</li>)
        }
        else {
            return <h1>None</h1>
        }

        return (

            users
        );
    }
}

export default DatabaseQueries