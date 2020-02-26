import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Menu,
  MenuItem,
  DialogContentText,
  CardMedia,
  Typography,
  Button,
  Dialog,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card
} from "@material-ui/core";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const ExpansionPanel = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    minHeight: "0px",
    marginBottom: -1,
    padding: "0px 10px",
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    margin: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&$expanded": {
      margin: "0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "320px"
  },
  titleContainer: {
    padding: "0px",
    margin: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  menuButton: {
    minWidth: "0px"
  },
  cardContent: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: "0px"
    }
  },
  media: {
    height: "250px"
  },
  title: {
    fontWeight: "bold"
  },
  panelBase: {},
  panelDetails: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column"
  },
  expansionContainer: {
    margin: "8px 0px",
    padding: "0px"
  },
  scheduleContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    marginRight: theme.spacing(1)
  },
  scheduleInfoContainer: {},
  scheduleTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold"
  },
  scheduleSubtitle: {
    fontStyle: "italic"
  },
  minusButton: {
    minWidth: "0px"
  },
  panelSummary: {
    padding: "0px"
  },
  icon: {
    color: theme.palette.grey[800]
  },
  menuItem: {
    minHeight: "0px"
  },
}));

export default function AddPlantFormPage(props) {
  const { open, onClose } = props
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDeletePrompt = () => {
    setDeletePrompt(!deletePrompt);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Add Care Routine
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Add to Watchlist
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Add Observation
        </MenuItem>
      </Menu>
      <Card className={classes.root}>
        <CardMedia
          component="div"
          height="250"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplantcaretoday.com%2Fwp-content%2Fuploads%2Falocasia-amazonica-809.jpg&f=1&nofb=1"
          className={classes.media}
        />
        <CardContent className={classes.cardContent}>
          <Container className={classes.titleContainer}>
            <Typography variant="h5" className={classes.title}>
              Alocasia "Polly"
            </Typography>
            <Button
              className={classes.menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <i className="fas fa-ellipsis-h fa-lg"></i>
            </Button>
          </Container>

          <Typography
            variant="body1"
            color="textSecondary"
            style={{ fontStyle: "italic" }}
          >
            Alocasia x Amazonica "Polly"
          </Typography>
          <Container className={classes.expansionContainer}>
            <ExpansionPanel
              className={classes.panelBase}
              square
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <ExpansionPanelSummary
                className={classes.panelSummary}
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<i class={`fas fa-caret-down ${classes.icon}`}></i>}
                IconButtonProps={{ edge: false }}
              >
                <Typography variant="h6">Care Schedule</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetails}>
                <div className={classes.scheduleContainer}>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.minusButton}
                      onClick={handleDeletePrompt}
                    >
                      <i class="fas fa-minus fa-lg"></i>
                    </Button>
                  </div>
                  <div className={classes.scheduleInfoContainer}>
                    <Typography className={classes.scheduleTitle}>
                      Watering every 5 day(s)
                    </Typography>
                    <Typography className={classes.scheduleSubtitle}>
                      Next watering in 3 day(s)
                    </Typography>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.panelBase}
              square
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <ExpansionPanelSummary
                className={classes.panelSummary}
                aria-controls="panel2d-content"
                id="panel2d-header"
                expandIcon={<i class={`fas fa-caret-down ${classes.icon}`}></i>}
                IconButtonProps={{ edge: false }}
              >
                <Typography variant="h6">Watch List</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetails}>
                <div className={classes.scheduleContainer}>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.minusButton}
                      onClick={handleDeletePrompt}
                    >
                      <i class="fas fa-minus fa-lg"></i>
                    </Button>
                  </div>
                  <div className={classes.scheduleInfoContainer}>
                    <Typography className={classes.scheduleTitle}>
                      Mealybugs reported 4 day(s) ago
                    </Typography>
                    <Typography className={classes.scheduleSubtitle}>
                      Checked 1 day(s) ago
                    </Typography>
                  </div>
                </div>
                <div className={classes.scheduleContainer}>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.minusButton}
                      onClick={handleDeletePrompt}
                    >
                      <i class="fas fa-minus fa-lg"></i>
                    </Button>
                  </div>
                  <div className={classes.scheduleInfoContainer}>
                    <Typography className={classes.scheduleTitle}>
                      Spidermites reported 2 day(s) ago
                    </Typography>
                    <Typography className={classes.scheduleSubtitle}>
                      Checked today
                    </Typography>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.panelBase}
              square
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <ExpansionPanelSummary
                className={classes.panelSummary}
                aria-controls="panel3d-content"
                id="panel3d-header"
                expandIcon={<i class={`fas fa-caret-down ${classes.icon}`}></i>}
                IconButtonProps={{ edge: false }}
              >
                <Typography variant="h6">Observations</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetails}>
                <div className={classes.scheduleContainer}>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.minusButton}
                      onClick={handleDeletePrompt}
                    >
                      <i class="fas fa-minus fa-lg"></i>
                    </Button>
                  </div>
                  <div className={classes.scheduleInfoContainer}>
                    <Typography className={classes.scheduleTitle}>
                      New leaf growth
                    </Typography>
                    <Typography className={classes.scheduleSubtitle}>
                      12/1/20 9:34am
                    </Typography>
                  </div>
                </div>
                <div className={classes.scheduleContainer}>
                  <div className={classes.buttonContainer}>
                    <Button
                      className={classes.minusButton}
                      onClick={handleDeletePrompt}
                    >
                      <i class="fas fa-minus fa-lg"></i>
                    </Button>
                  </div>
                  <div className={classes.scheduleInfoContainer}>
                    <Typography className={classes.scheduleTitle}>
                      Leaf impact damage
                    </Typography>
                    <Typography className={classes.scheduleSubtitle}>
                      13/12/19 4:17pm
                    </Typography>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Container>
        </CardContent>
      </Card>
      <Dialog open={deletePrompt} onClose={handleDeletePrompt}>
        <DialogTitle id="alert-dialog-title">{"Please Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePrompt} color="primary">
            No
          </Button>
          <Button onClick={handleDeletePrompt} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
