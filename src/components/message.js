import React, { useContext } from 'react'
import { MessageContext } from '../utils/messageContext'
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        margin: theme.spacing(2),
        background: theme.palette.success.light,
        justifyContent: 'center',
    },
    content: {
        display: "flex",
        padding: "8px 12px",
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    titleContainer: {
        display: "flex",
        padding: theme.spacing(0),
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(0),
        fontWeight: "bold",
        textTransform: 'uppercase',
    },
    }))

export default function MessageDialog(props) {
    const classes = useStyles();
    const message = useContext(MessageContext)

    return (
    <Card className={classes.root}>
            <div className={classes.content}>
              <Container className={classes.titleContainer}>
                <Typography className={classes.title}>
                  {message.message}
                </Typography>
              </Container>
            </div>
          </Card>
)
}