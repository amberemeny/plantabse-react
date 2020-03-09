import React, { useState, useContext } from "react";
import { makeStyles,  } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Button,
  Dialog,
} from "@material-ui/core";

import API, { addPlant } from '../utils/API'
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

export default function AddPlantFormPage(props) {
  const { open, onClose } = props
  const [ name, setName ] = useState()
  const [ species, setSpecies ] = useState()
  const [ location, setLocation ] = useState()
  const [ purchasedate, setPurchasedate ] = useState()
  const [ purchaseloc, setPurchaseloc ] = useState()
  const [ price, setPrice ] = useState()
  const [ growthstage, setGrowthstage ] = useState()
  const [ user ] = useState(sessionStorage.getItem('id'))
  const classes = useStyles();
  const global = useContext(GlobalContext);
  const message = useContext(MessageContext)

  const handleSubmit = event => {
    event.preventDefault();
    addPlant({
      user: user,
      name: name,
      species: species,
      location: location,
      purchasedate: purchasedate,
      purchaseloc: purchaseloc,
      price: price,
      growthstage: growthstage,
    })
      .then(res => {
        res = res
        if (res.status === 201) {
          handleSuccess()
        } else {
          console.log(res)
        }}
        )
      .catch(err => console.log(err))
  }

  const handleSuccess = () => {
    message.setMessage(201, 'Saved Successfully')
    global.setUserPlants()
    onClose()
  }

  const handleChange = event => {
    const newValue = event.target.value
      if (event.target.id === 'name') {
        setName(newValue)
      } 
      else if (event.target.id === 'species') {
        setSpecies(newValue)
      } 
      else if (event.target.id === 'location') {
        setLocation(newValue)
      }
      else if (event.target.id === 'purchasedate') {
        setPurchasedate(newValue)
      }
      else if (event.target.id === 'purchaseloc') {
        setPurchaseloc(newValue)
      }
      else if (event.target.id === 'price') {
        setPrice(newValue)
      }
      else if (event.target.id === 'growthstage') {
        setGrowthstage(newValue)
      }
  } 

  return (
    <Dialog open={open} onClose={onClose} >
      <div className={classes.base}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="name"
              label="Plant name"
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
              id="species"
              label="Scientific name"
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
              id="location"
              label="Location"
              type="text"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
              onChange={handleChange}
            />
            <TextField
              id="growthstage"
              label="Growth Stage"
              select
              variant="outlined"
              size="small"
              color="primary"
              SelectProps={{
                native: true
              }}
              onChange={handleChange}
            >
              <option value="null"></option>
              <option value="SPROUT">Sprout</option>
              <option value="SEEDLING">Seedling</option>
              <option value="JUVINILLE">Juvenile</option>
              <option value="ESTABLISHED">Established</option>
              <option value="MATURE">Mature</option>
            </TextField>
          </FormControl>
          <FormControl>
            <TextField
              id="purchaseloc"
              label="Location Purchased"
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
              id="purchasedate"
              label="Date Purchased"
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
              id="price"
              label="Price"
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
          <Button className={classes.button} variant="contained" type='submit'>
            Add Plant
          </Button>
        </form>
      </div>
      </Dialog>
  );
}
