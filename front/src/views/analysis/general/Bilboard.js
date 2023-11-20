import React, {useEffect, useRef} from "react";
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import bb from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css
import BillboardJS from "@billboard.js/react";

function TestChart({ data, chartOption, title }) {
  const ref = useRef()
	useEffect(() => {
		const chart = ref.current?.instance

    console.log(chartOption.data.columns)
    
    setTimeout(() => {
      chart.load({
        columns: data,
        load: true
      });
    }, 560);
	}, []);


    return <MainCard>
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BillboardJS 
          ref={ref}
          bb={bb}
          options={chartOption} />
      </Grid>
    </Grid>
    </Grid>
  </MainCard>        
}

export default TestChart