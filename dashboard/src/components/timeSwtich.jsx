import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AntSwitch from './antswitch';

const TimeSwitch = ({handleSwitch}) => (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>night</Grid>
          <Grid item>
            <AntSwitch onChange={handleSwitch} />
          </Grid>
          <Grid item>day</Grid>
        </Grid>
      </Typography>
    </FormGroup>
);

export default TimeSwitch;
