import React, { useState, useContext } from "react";
import { makeStyles,  } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Button,
  Dialog,
} from "@material-ui/core";

import API from '../utils/API'
import { GlobalContext } from '../utils/globalContext'

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

export default function EditPlantFormPage(props) {
  const global = useContext(GlobalContext);
  const { open, onClose, currentPlant } = props
  const [ name, setName ] = useState(currentPlant.name)
  const [ species, setSpecies ] = useState(currentPlant.species)
  const [ location, setLocation ] = useState(currentPlant.location)
  const [ purchasedate, setPurchasedate ] = useState(currentPlant.purchasedate)
  const [ purchaseloc, setPurchaseloc ] = useState(currentPlant.purchaseloc)
  const [ price, setPrice ] = useState(currentPlant.price)
  const [ growthstage, setGrowthstage ] = useState(currentPlant.growthstage)
  const [ user ] = useState(sessionStorage.getItem('id'))
  const classes = useStyles();

  const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const handleSubmit = event => {
    event.preventDefault();

    API({method: 'put', url: `/plants/${currentPlant.id}/`, headers:{'X-CSRFTOKEN': getCookie('csrftoken')}, 
      data : {
        user: user,
        name: name,
        species: species,
        location: location,
        purchasedate: purchasedate,
        purchaseloc: purchaseloc,
        price: price,
        growthstage: growthstage,
      }})
      .then(res => onClose())
      .catch(err => console.log(err))
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
        <form className={classes.form} noValidate>
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
              value={name}
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
              value={species}
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
              value={location}
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
              defaultValue={growthstage}
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
              value={purchaseloc}
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
              value={purchasedate}
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
              value={price}
            />
          </FormControl>
          <Button className={classes.button} variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </form>
      </div>
      </Dialog>
  );
}
