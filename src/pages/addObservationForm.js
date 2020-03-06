import React, { useState, useContext } from "react";
import { makeStyles,  } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Button,
  Dialog,
} from "@material-ui/core";

import API, { addObservation } from '../utils/API'
import { GlobalContext } from '../utils/globalContext'
import { MessageContext } from '../utils/messageContext'

const useStyles = makeStyles(theme => ({
  base: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  media: {
    height: 140
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  button: {
    alignSelf: "center",
    margin: theme.spacing(1),
    background: theme.palette.primary.main,
    color: theme.palette.grey[50]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  card: {
    padding: (theme.spacing(2), theme.spacing(3)),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rowForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "& > *": {
      width: "49%"
    }
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "row-reverse",
    padding: "0px"
  },
  buttonClose: {
    minWidth: "0px"
  }
}));

export default function AddObservationForm(props) {
const { observationPrompt, handleObservationPrompt, currentPlant, handleClose } = props
  const [ user ] = useState(sessionStorage.getItem('id'))
  const [type, setType] = useState(null)
  const [comment, setComment] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const classes = useStyles();
  const global = useContext(GlobalContext);
  const message = useContext(MessageContext)

  const handleSubmit = event => {
    event.preventDefault();
    addObservation({
      user: user,
      plant: currentPlant.id,
      type: type,
      comment: comment,
      date: date,
      time: time,
    })
      .then(res => handleSuccess())
      .catch(err => console.log(err))
  }

  const handleSuccess = () => {
    message.setMessage(201, 'Observation Saved')
    global.setUserPlants()
    handleObservationPrompt()
  }

  const handleChange = event => {
    const newValue = event.target.value
      if (event.target.id === 'type') {
        setType(newValue)
      } 
      else if (event.target.id === 'comment') {
        setComment(newValue)
      } 
      else if (event.target.id === 'date') {
        setDate(newValue)
      }
      else if (event.target.id === 'time') {
        setTime(newValue)
      }
  } 

  return (
    <Dialog open={observationPrompt} onClose={handleObservationPrompt} >
      <div className={classes.base}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="type"
              label="Type"
              type="text"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="comment"
              label="Comment"
              type="text"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className={classes.rowForm}>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
              onChange={handleChange}
            />
            <TextField
              id="time"
              label="Time"
              type='time'
              variant="outlined"
              size="small"
              color="primary"
              onChange={handleChange}
              inputProps={{
                  step: 300
              }}
              InputLabelProps={{
                shrink: true
              }}
            >
            </TextField>
          </FormControl>
          <Button className={classes.button} variant="contained" type='submit'>
            Add Plant
          </Button>
        </form>
      </div>
      </Dialog>
  );
}
