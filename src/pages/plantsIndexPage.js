import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  CardMedia,
  Typography,
  Container,
  Card,
  CardActionArea,
} from "@material-ui/core";

import PageBase from "./pageBase";
import AddPlantForm from './addPlantForm'
import MessageDialog from '../components/message'

import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../utils/globalContext'
import { MessageContext } from '../utils/messageContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(2)
  },
  actionArea: {
    display: 'flex'
  },
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

export default function PlantsIndexPage(props) {
  const classes = useStyles();
  const [showPlantForm, setShowPlantForm] = useState(false)
  const history = useHistory()
  const global = useContext(GlobalContext);
  const message = useContext(MessageContext)

  useEffect(() => {
    return () => {
      
    }
  }, [])

  const checkPlants = () => {
    if (!global.userPlants) {
      global.setUserPlants()
    } else console.log(global.userPlants)
  }
  
  useEffect(checkPlants, [])

  const handleClosePlantForm = () => {
    setShowPlantForm(!showPlantForm)
  }

  const handleSearchSubmit = () => {
  };

  const handleRedirect = (id, event) => {
    event.preventDefault()
    history.push(`/yourplants/${id}/`)
  }

  return (
    <PageBase barTitle={"Your Plants"} onSearchSubmit={handleSearchSubmit} onAddForm={handleClosePlantForm}>
      {message.message && <MessageDialog />}
      <List disablePadding={true}>
        {global.userPlants && global.userPlants.map(plant => 
          
            <Card className={classes.root}>
              <CardActionArea 
                className={classes.actionArea}
                onClick={(e) => handleRedirect(plant.id, e)}
                >
              <CardMedia
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplantcaretoday.com%2Fwp-content%2Fuploads%2Falocasia-amazonica-809.jpg&f=1&nofb=1"
                className={classes.media}
              ></CardMedia>
              <div className={classes.content}>
                <Container className={classes.titleContainer}>
                  <Typography className={classes.title}>
                    {plant.name}
                  </Typography>
                  <Typography className={classes.subtitle}>
                    {plant.species}
                  </Typography>
                </Container>
                <Container className={classes.infoContainer}>
                  <Typography className={classes.contentInfo}>
                    {plant.schedules[1] && <span>{plant.schedules[1].type}</span>}
                  </Typography>
                </Container>
              </div>
              </CardActionArea>
            </Card>
          
        )}
      </List>
        
      <AddPlantForm open={showPlantForm} onClose={handleClosePlantForm}/>

    </PageBase>
  );
}
