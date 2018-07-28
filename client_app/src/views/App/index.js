import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Appbar from '../../components/Appbar';
import Sidebar from '../../components/Sidebar';
import Content from '../Content';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    }
});
  
class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>          
                <Appbar />
                <Sidebar />
                <Content />
            </div>
        );
    }
}
  
  export default withStyles(styles)(App);
  
  