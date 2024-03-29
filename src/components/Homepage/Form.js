import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/coronavirus.png';
import { Context } from '../../Context';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.backgroundColor,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form() {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useContext(Context);

  const isValid = state.population && state.totalHospitalBeds
  && state.reportedCases && state.timeToElapse;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.avatar} alt="covid-19" src={logo} />
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          An overly simplified COVID-19 infection impact estimator
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                type="number"
                id="population"
                name="population"
                label="Population"
                variant="outlined"
                onChange={handleChange}
                value={state.population}
                inputProps={{ 'data-population': true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                id="reported-cases"
                variant="outlined"
                name="reportedCases"
                label="Reported Cases"
                onChange={handleChange}
                value={state.reportedCases}
                inputProps={{ 'data-reported-cases': true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                variant="outlined"
                id="total-hospital-beds"
                name="totalHospitalBeds"
                label="Total Hospital Beds"
                onChange={handleChange}
                value={state.totalHospitalBeds}
                inputProps={{ 'data-total-hospital-beds': true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                variant="outlined"
                name="timeToElapse"
                id="time-to-elapse"
                label="Time To Elapse"
                onChange={handleChange}
                value={state.timeToElapse}
                inputProps={{ 'data-time-to-elapse': true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="period-type">Period Type</InputLabel>
                <Select
                  native
                  fullWidth
                  name="periodType"
                  variant="outlined"
                  label="Period Type"
                  onChange={handleChange}
                  value={state.periodType}
                  inputProps={{ id: 'period-type', 'data-period-type': true }}
                >
                  <option data-period-type="true" value="days">Days</option>
                  <option data-period-type="true" value="weeks">Weeks</option>
                  <option data-period-type="true" value="months">Months</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            data-go-estimate
            disabled={!isValid}
            className={classes.submit}
          >
            Get Estimate
          </Button>
        </form>
      </div>
    </Container>
  );
}
