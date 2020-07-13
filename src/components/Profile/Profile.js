import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./Profile.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import ScrollArea from "react-scrollbar";
import { resetWarningCache } from "prop-types";

// Profile page contains -->
//  axios get requests for favorites, wants, and nogo lists
//  local state containing an array of restaurants for each list
//  display of the data in each list for the user
//  the delete handler and dispatches
class ProfilePage extends Component {
  // setting state for each "list" to be an empty array
  state = {
    favorites: [],
    wants: [],
    nogos: [],
  };

  // when the component mounts, GET requests will be sent to grab
  // all of the favorites, wants and nogos.
  componentDidMount() {
    axios.get(`/favorites/${this.props.user.id}`).then((response) => {
      const responseData = response.data;
      this.setState({
        favorites: responseData, //new favorites array
      });
    });
    axios.get(`/wants/${this.props.user.id}`).then((response) => {
      const wantData = response.data;
      this.setState({
        wants: wantData, //new wants array
      });
    });
    axios.get(`/nogo/${this.props.user.id}`).then((response) => {
      const nogoData = response.data;
      this.setState({
        nogos: nogoData, //new nogos array
      });
    });
  }

  // on the click of the delete button, the delete function will run.
  // an alert will pop up for the user to confirm or cancel
  // if they choose to cancel, nothing will happen!
  // if they choose to delete, then the dispatch will be sent
  // to the corresponding type, with a payload of
  // the place that was clicked.  Then the page refreshes
  // to get the new lists
  handleDeleteFav = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_FAVORITE", payload: place });
        window.location.reload(false);
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  handleDeleteWant = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_WANT", payload: place });
        window.location.reload(false);
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  handleDeleteNogo = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_NOGO", payload: place });
        window.location.reload(false);
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  // in the render function, each list (from state) is mapped
  // through in order to display each item on the user's profile
  render() {
    return (
      <div className="profileBody">
        <Nav />
        <div className="welcomeDiv">
          <h1 id="welcome">Hey, {this.props.user.username}!</h1>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alginItems="center"
          spacing={1}
          style={{ minHeight: "20vh" }}
          className="mainGrid"
        >
          <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
            <Paper className="profilePaper" elevation={3}>
              <h2 id="favTitle" className="columnTitle">
                Favorites
              </h2>
              <ul>
                {this.state.favorites.map((place) => (
                  <div key={place.list_id} className="rowDiv">
                    <li>{place.name}</li>
                    <li className="xIcon">
                      <HighlightOffIcon
                        className="favX"
                        fontSize="small"
                        onClick={() => {
                          this.handleDeleteFav(place);
                        }}
                      />
                    </li>
                  </div>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
            <Paper className="profilePaper" elevation={3}>
              <h2 id="wantTitle" className="columnTitle">
                Want-To-Go's
              </h2>
              <ul>
                {this.state.wants.map((place) => (
                  <div key={place.list_id} className="rowDiv">
                    <li>{place.name}</li>
                    <li className="xIcon">
                      <HighlightOffIcon
                        className="wantX"
                        fontSize="small"
                        onClick={() => {
                          this.handleDeleteWant(place);
                        }}
                      />
                    </li>
                  </div>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
            <Paper className="profilePaper" elevation={3}>
              <h2 id="noTitle" className="columnTitle">
                No-Go's
              </h2>
              <ul>
                {this.state.nogos.map((place) => (
                  <div key={place.list_id} className="rowDiv">
                    <li>{place.name}</li>
                    <li className="xIcon">
                      <HighlightOffIcon
                        className="noX"
                        fontSize="small"
                        onClick={() => {
                          this.handleDeleteNogo(place);
                        }}
                      />
                    </li>
                  </div>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
        <div id="yellowBlock"></div>
        <div id="lightBlueBlock"></div>
      </div>
    );
  }
}

// bringing in the user info to use as props
// to welcome the user by their username
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfilePage);
