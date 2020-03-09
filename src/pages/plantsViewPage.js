import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  List,
  CardMedia,
  Typography,
  Container,
  Card,
  CardActionArea,
  Paper,
  Tab,
  Tabs,
  Box,
  AppBar,
  Avatar,
  Link,
  Button,
} from "@material-ui/core";

import PageBase from "./pageBase";
import MessageDialog from '../components/message'

import { viewPlant } from '../utils/API'

import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../utils/globalContext'
import { MessageContext } from '../utils/messageContext'
import { CancelPresentationOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    plantTop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
    },
    plantImage: {
        width: '200px',
        height: '200px',
    },
    plantHeadings: {

    },
    plantTitle: {
        fontWeight: 'bold',
    },
    plantSubtitle: {
        fontStyle: 'italic',
        color: theme.palette.grey[700],
    },
    backButton: {
        marginTop: '10px',
        marginLeft: '10px',
    },
  }));

const StyledPaper = withStyles({
    root: {
      margin: '10px',
    },
  })(Paper);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PlantsIndexPage(props) {
    
    const [currentPlant, setCurrentPlant] = useState()
    const classes = useStyles();
    const history = useHistory()
    const global = useContext(GlobalContext);
    const message = useContext(MessageContext)

    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue);
      };

  useEffect(() => {
      handleFindPlant()
    }, [])

    const handleFindPlant = async () => {
        try {
            const response = await viewPlant(props.match.params.id)
            if (response.status === '401'){
                    history.push('/')
                } else {
                    console.log(response)
                    setCurrentPlant(response.data)
                }
        } catch (error) {
                console.log(error)
            }
    }

    const handleBack = e => {
        e.preventDefault()
        history.goBack()
    }

  const handleRedirect = (id, event) => {
    event.preventDefault()
    history.push(`/yourplants/${id}/`)
  }

  return (
    <PageBase barTitle={ currentPlant && `${currentPlant.name}`}>
        <Button className={classes.backButton} variant='contained' color='primary' onClick={(e) => {handleBack(e)}}>
            <i className="fas fa-arrow-left fa-lg"></i>
        </Button>
        <StyledPaper>
            <div className={classes.plantTop}>
                <Avatar variant='rounded' className={classes.plantImage} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplantcaretoday.com%2Fwp-content%2Fuploads%2Falocasia-amazonica-809.jpg&f=1&nofb=1" />
                <div className={classes.plantHeadings}>
                    <Typography variant='h5' className={classes.plantTitle}>
                        {currentPlant && `${currentPlant.name}`}
                    </Typography>
                    <Typography variant='h7' className={classes.plantSubtitle}>
                        {currentPlant && `${currentPlant.species}`}
                    </Typography>
                </div>
            </div>
            <AppBar position="static">
                <Tabs centered value={tab} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Details" {...a11yProps(0)} />
                    <Tab label="Schedules" {...a11yProps(1)} />
                    <Tab label="Observations" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                { currentPlant && `${currentPlant.id}` === props.match.params.id &&
                    <p>SUCCESS</p>
                }
            </TabPanel>
            <TabPanel value={tab} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={tab} index={2}>
                Item Three
            </TabPanel>
        </StyledPaper>
    </PageBase>
  );
}
