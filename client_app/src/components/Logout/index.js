import React, { Component } from 'react';
import { navigate } from "@reach/router";

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


const styles = theme => ({
});

class LogoutButtonr extends Component {
    logout = () => {
        localStorage.removeItem("phoenixAuthToken");
        navigate(`/`)
    }

    render() {
        const { classes } = this.props;
        return (
            <Button variant="contained" onClick={this.logout}>
                Logout
            </Button>
        );
    }
}

export default withStyles(styles)(LogoutButtonr);
