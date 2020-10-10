import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    color:"red",
    textTransform: "upperCase"
  }
}));

 function InfoPanel() {

  const classes = useStyles();
  const [globalData,setGlobalData] = useState({ });

  useEffect(() => {
       const getData = async () => {
          const response = await fetch('https://api.thevirustracker.com/free-api?global=stats');
          const data = await response.json()
          delete data.results[0].source;
          setGlobalData(data.results[0]);
          console.log(data.results[0]);
       }
       getData();
  },[]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

          {Object.keys(globalData).map((val,index) => {
            return (

              <Grid item xs={12} sm={4} key = {index}>

                <Paper className={classes.paper} elevation={3}>
                   <h3 className={classes.title}>{val.replace(/_/g,' ') }</h3>
                   <h3>{globalData[val]}</h3>
                 </Paper>

            </Grid>
            )
          }) }
      </Grid>
    </div>
  );
}

export default InfoPanel;
