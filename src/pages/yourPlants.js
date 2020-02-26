import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  List,
  CardMedia,
  Typography,
  Button,
  Container,
  Card,
} from "@material-ui/core";

import PageBase from "./pageBase";
import AddPlantForm from './addPlantForm'
import ViewPlantDialog from './viewPlantDialog'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(2)
  },
  action: {},
  media: {
    width: "25%",
    minHeight: "100%"
  },
  content: {
    display: "flex",
    width: "75%",
    padding: "8px 12px",

    flexDirection: "column"
  },
  titleContainer: {
    display: "flex",
    padding: theme.spacing(0),
    flexDirection: "column"
  },
  infoContainer: {
    display: "flex",
    padding: "8px 0px"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0),
    fontWeight: "bold"
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontStyle: "italic",
    fontSize: "0.8rem"
  },
  contentInfo: {
    color: theme.palette.grey[800],
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: theme.palette.grey[800],
    marginRight: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    minWidth: "0px"
  },
  menuItem: {
    minHeight: "0px"
  },
  buttonAdd: {
    display: "flex",
    margin: theme.spacing(2),
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "right"
  },
  buttonGroup: {
    display: "flex",
    padding: theme.spacing(2),
    paddingBottom: "0px"
  },
  searchForm: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
}));

export default function YourPlantsPage(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPlantForm, setShowPlantForm] = useState(false)
  const [showDialog, setShowDialog] = useState(null)

  const handleClosePlantForm = () => {
    setShowPlantForm(!showPlantForm)
  }

  const handleSearchSubmit = () => {
    console.log("It did a thing.");
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowDialog = () => {
    handleClose()
    setShowDialog(!showDialog)
  }

  return (
    <PageBase barTitle={"Your Plants"} onSearchSubmit={handleSearchSubmit} onAddForm={handleClosePlantForm}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem} onClick={handleShowDialog}>
          View Plant
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Add Care Routine
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Add to Watchlist
        </MenuItem>
      </Menu>

      <List disablePadding={true}>
        <Card className={classes.root}>
          <CardMedia
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplantcaretoday.com%2Fwp-content%2Fuploads%2Falocasia-amazonica-809.jpg&f=1&nofb=1"
            className={classes.media}
          ></CardMedia>
          <div className={classes.content}>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title}>
                Alocasia "Polly"
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  test="Alocasia"
                  onClick={handleClick}
                >
                  <i class="fas fa-ellipsis-h fa-lg"></i>
                </Button>
              </Typography>
              <Typography className={classes.subtitle}>
                Alocasia x amazonica "Polly"
              </Typography>
            </Container>
            <Container className={classes.infoContainer}>
              <i className={`fas fa-tint fa-lg ${classes.icon}`}></i>
              <Typography className={classes.contentInfo}>
                Needs watering in 3 day(s)
              </Typography>
            </Container>
          </div>
        </Card>

        <Card className={classes.root}>
          <CardMedia
            image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F58db2d14e6f2e1051b2c5044%2F58db32ee86e6c00da4711a2a%2F58ec3603be6594f50f264834%2F1491876026729%2Fstatic1.squarespace.com.jpg%3Fformat%3D1000w&f=1&nofb=1"
            className={classes.media}
          ></CardMedia>
          <div className={classes.content}>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title}>
                Indoor Monstera
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <i class="fas fa-ellipsis-h fa-lg"></i>
                </Button>
              </Typography>
              <Typography className={classes.subtitle}>
                Monstera Deliciosa
              </Typography>
            </Container>
            <Container className={classes.infoContainer}>
              <i className={`fas fa-tint fa-lg ${classes.icon}`}></i>
              <Typography className={classes.contentInfo}>
                Needs watering in 1 day(s)
              </Typography>
            </Container>
          </div>
        </Card>

        <Card className={classes.root}>
          <CardMedia
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg0.etsystatic.com%2F000%2F0%2F5385160%2Fil_570xN.316091980.jpg&f=1&nofb=1"
            className={classes.media}
          ></CardMedia>
          <div className={classes.content}>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title}>
                Oxalis Triangularis
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <i class="fas fa-ellipsis-h fa-lg"></i>
                </Button>
              </Typography>
              <Typography className={classes.subtitle}>
                Oxalis Trangularis
              </Typography>
            </Container>
            <Container className={classes.infoContainer}>
              <i
                className={`fas fa-tint fa-lg ${classes.icon}`}
                style={{ color: "#cc5200" }}
              ></i>
              <Typography
                className={classes.contentInfo}
                style={{ color: "#cc5200" }}
              >
                Needs watering today
              </Typography>
            </Container>
          </div>
        </Card>

        <Card className={classes.root}>
          <CardMedia
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fi%2F232341477288-0-1%2Fs-l1000.jpg&f=1&nofb=1"
            className={classes.media}
          ></CardMedia>
          <div className={classes.content}>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title}>
                Pothos Snow Queen
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <i class="fas fa-ellipsis-h fa-lg"></i>
                </Button>
              </Typography>
              <Typography className={classes.subtitle}>
                Pothos "Snow Queen"
              </Typography>
            </Container>
            <Container className={classes.infoContainer}>
              <i
                className={`fas fa-tint fa-lg ${classes.icon}`}
                style={{ color: "#cc0000" }}
              ></i>
              <Typography
                className={classes.contentInfo}
                style={{ color: "#cc0000" }}
              >
                Needs watering 2 day(s) ago
              </Typography>
            </Container>
          </div>
        </Card>
      </List>
      <AddPlantForm open={showPlantForm} onClose={handleClosePlantForm}/>
      <ViewPlantDialog open={showDialog} onClose={handleShowDialog}/>
    </PageBase>
  );
}
