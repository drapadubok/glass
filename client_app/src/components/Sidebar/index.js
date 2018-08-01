import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "@reach/router";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Divider from '@material-ui/core/Divider';


const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  links: {
    textDecoration: 'none'
  }
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List>
          <Link to="/login" className={classes.links}>
            <ListItem button>
              <ListItemIcon>
                <PlayArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/dashboard" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/eventeditor" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Event Editor" />
            </ListItem>
          </Link>
          <Link to="/eventlist" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Events" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
