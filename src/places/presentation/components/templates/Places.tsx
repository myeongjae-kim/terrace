import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { PageTitle } from 'src/common/presentation/components/molecules';


const useStyles = makeStyles((theme: Theme) => createStyles({
  mapContainer: {
    padding: "0 10px 0 10px",
    maxWidth: 1000,
    margin: 'auto'
  },
  map: {
    height: 500,
    width: '100%',
    textAlign: 'justify',
    border: 0,
    boxShadow: '2px 2px 15px #ccc',
    display: 'block',
    margin: 'auto'
  },
  content: {
    marginBottom: theme.spacing(2)
  }
}));

const Places: React.FC = () => {
  const classes = useStyles();
  return <div>
    <PageTitle title="places" />
    <Typography align="center" className={classes.content}>where I have been</Typography>
    <div className={classes.mapContainer}>
      <iframe className={classes.map} src="https://api.mapbox.com/styles/v1/myeongjae/cjl07pcz14j9t2sqmsp0swqhg.html?fresh=true&title=true&access_token=pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg" />
    </div>
  </div>
}

export default Places;