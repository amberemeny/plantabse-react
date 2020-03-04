import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Typography,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  Card
} from "@material-ui/core";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import { useHistory } from "react-router-dom";

import AddPlantForm from "./addPlantForm";
import PageBase from "./pageBase";
import { GlobalContext } from '../utils/globalContext'
import { AuthContext } from '../utils/Authorization'

const useStyles = makeStyles(theme => ({
  base: {
    margin: theme.spacing(2),
    padding: theme.spacing(0)
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around"
  },
  userTitle: {
    padding: theme.spacing(2)
  },
  headingText: {
    textAlign: "center"
  },
  headingTextTitle: {
    textAlign: "center"
  },
  icon: {
    marginRight: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  listBase: {
    padding: "0px",
    margin: "0px"
  },
  list: {
    listStyle: "none"
  },
  details: {
    paddingBottom: "8px"
  },
  careScheduleGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 140,
    backgroundPosition: "bottom"
  },
  watchlist: {
    padding: "0px"
  }
}));

// ExpansionPanel Styling
const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
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

// Expansion Panel Summary Styling
const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    padding: "0px 15px",
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

export default function DashboardPage() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const history = useHistory();

  // For the Add Plant Form.
  const [showPlantForm, setShowPlantForm] = useState(false);

  // Handles the opening and closing of the Add Plantschedule form.
  const handleClosePlantForm = () => {
    setShowPlantForm(!showPlantForm);
  };

  // Handles the ExpansionPanel changes.
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Controls the redirection of links.
  const handleRedirect = (event, url) => {
    history.push(`${url}`);
  };

  return (
    <PageBase barTitle={"Dashboard"}>
      <Card className={classes.base}>
        {/* Welcome User Div */}
        <Typography variant="h5" className={classes.userTitle}>
          Welcome, {sessionStorage.getItem('username')}.
        </Typography>
      </Card>
      {/* Easy Links */}
      <Container className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={e => handleRedirect(e, "/yourplants")}
        >
          Your Plants
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClosePlantForm}
        >
          Add a Plant
        </Button>
      </Container>
      {/* Daily Care Schelule */}
      <Card className={classes.base}>
        <CardMedia
          className={classes.media}
          image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmediad.publicbroadcasting.net%2Fp%2Fvpr%2Ffiles%2Fstyles%2Fmedium%2Fpublic%2F201607%2Fwatering-gardens-amenic191-iStock.jpg&f=1&nofb=1"
          title=""
        />
        <CardContent>
          <Container className={classes.careScheduleGroup}>
            <Typography variant="h5" className={classes.headingTextTitle}>
              Daily Care Schedule
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
            >
              <AddIcon />
            </Button>
          </Container>
            {/* Watering Panel */}
          <ExpansionPanel
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <i className={`fas fa-tint fa-lg ${classes.icon}`}></i>
              <Typography>Water</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <ul className={classes.listBase}>
                <li className={classes.list}>
                  <FormControlLabel
                    control={<Checkbox value="Monstera Deliciosa" />}
                    label="Monstera Deliciosa"
                  />
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            {/* Fertilising Panel */}
          <ExpansionPanel
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <i className={`fas fa-allergies fa-lg ${classes.icon}`}></i>
              <Typography>Fertilizer</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <ul className={classes.listBase}>
                <li className={classes.list}>
                  <FormControlLabel
                    control={<Checkbox value="Golden Pothos" />}
                    label="Golden Pothos"
                  />
                </li>
                <li className={classes.list}>
                  <FormControlLabel
                    control={<Checkbox value="Pepperomia Gravolens" />}
                    label="Pepperomia Gravolens"
                  />
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            {/* Pest Control Panel */}
          <ExpansionPanel
            square
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <i className={`fas fa-bug fa-lg ${classes.icon}`}></i>
              <Typography>Pest Control</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <ul className={classes.listBase}>
                <li className={classes.list}>
                  <FormControlLabel
                    control={<Checkbox value="Pothos Green Dragon" />}
                    label="Pothos Green Dragon"
                  />
                </li>
                <li className={classes.list}>
                  <FormControlLabel
                    control={<Checkbox value="Hoya Australis" />}
                    label="Hoya Australis"
                  />
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>

      {/* The Watchlist Panel */}
      <Card className={classes.base}>
        <CardMedia
          className={classes.media}
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.aCl_a17s7CGZ1r2JiFz8BwHaE8%26pid%3DApi&f=1"
          title=""
        />
        <CardContent>
          <Container className={classes.careScheduleGroup}>
            <Typography variant="h5" className={classes.headingTextTitle}>
              The Watch List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
            >
              <AddIcon />
            </Button>
          </Container>
          <List component="div" aria-label="watchlist" disablePadding="true">
            <ListItem button>
              <ListItemText
                primary="Philodendron 'Xanadu'"
                secondary="Mealybugs reported 1 day(s) ago"
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Alocasia lauterbachiana"
                secondary="Caterpillars reported 3 day(s) ago"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      {/* Add Plant Form Rendering */}
      <AddPlantForm open={showPlantForm} onClose={handleClosePlantForm} />
    </PageBase>
  );
}
