import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Typography, Grid } from '@mui/material';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo';
import Logo from 'assets/images/logo.png'
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid item>
          <img src={Logo} style={{width: '70px', height: '70px'}}/>
        </Grid>
        <Grid item alignItems='center' alignSelf='center'>
          <Typography variant='h1'>Yummy-Data</Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default LogoSection;
