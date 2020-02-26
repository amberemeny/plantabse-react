import React, {  } from "react";
import { makeStyles,  } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Button,
  Dialog,
} from "@material-ui/core";

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
  const classes = useStyles();
  

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
            />
          </FormControl>
          <FormControl>
            <TextField
              id="scName"
              label="Scientific name"
              type="text"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
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
            />
            <TextField
              id="growthSt"
              label="Growth Stage"
              select
              variant="outlined"
              size="small"
              color="primary"
              SelectProps={{
                native: true
              }}
            >
              <option value="null"></option>
              <option value="sprout">Sprout</option>
              <option value="seedling">Seedling</option>
              <option value="juvenile">Juvenile</option>
              <option value="established">Established</option>
              <option value="mature">Mature</option>
            </TextField>
          </FormControl>
          <FormControl>
            <TextField
              id="purchaseDate"
              label="Date Purchased"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              color="primary"
            />
          </FormControl>
          <Button className={classes.button} variant="contained">
            Add Plant
          </Button>
        </form>
      </div>
      </Dialog>
  );
}
