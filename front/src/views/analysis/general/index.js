import { useEffect, useState } from 'react';
import { Grid, Typography, CardContent } from '@mui/material';
import { gridSpacing } from 'store/constant';
import D3Treemap from './TreeMap'
import Bilboard from './Bilboard'
import { line, bar } from 'billboard.js'
import Markdown from 'react-markdown'

// markdown
import PreProcessing from './markdown/pre-processing'
import BasicAnalysis from './markdown/basic-analysis'
import SignupSeriesMarkdown from './markdown/signup-series-analysis'
import SeriesByOwnerMarkdown from './markdown/signed-serise-by-owner-analysis'

// asset
import Progress from 'assets/images/progress.png'
import GoogleTrendX from 'assets/images/2019_08_01_2022_04_01_google_trend.png'

// data
import JoinedXYear from './data/joined-year.json'
import platforms from './data/sns-platform-users.json'
import OwnerSerise from './data/joined-date-by-entity-owner.json'
import ParentOwnerSerise from './data/joined-date-by-parent-entity-owner.json'
import MainCard from 'ui-component/cards/MainCard';

// import { pie } from 'd3';

const newlyJoinedUser = ['Newly joined user', ...JoinedXYear.map(x => x['value'])]
let sum = 0
const accumulation = [
  'Accumulation', 
  ...JoinedXYear.map(x => {
    sum += x['value']
    return sum
  })
]

const dateList = JoinedXYear.map(x => x['name'])

const owner_columns = Object.entries(OwnerSerise)
  .map(([owner, map]) => [owner, ...dateList.map(xDate => map[xDate] ?? 0 )])

const parent_owner_columns =  Object.entries(ParentOwnerSerise)
.map(([owner, map]) => [owner, ...dateList.map(xDate => map[xDate] ?? 0 )])

const GeneralAnalysis = () => {

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Grid container direction='row' spacing={gridSpacing}>
          <Grid item xs={7}>
            <MainCard>
            <Grid container direction='column' xs={12}>
              <Grid item><Typography variant='h1'>Preprocessing</Typography></Grid>
              <CardContent>
                <Grid item>
                  <Markdown>
                    {PreProcessing}
                  </Markdown>
                </Grid>
              </CardContent>
            </Grid>
            </MainCard>
          </Grid>
          <Grid container item direction='column' spacing={gridSpacing} xs={5}> 
            <Grid item xs={5}>
              <MainCard>
              <Grid container direction='column' xs={12}>
                <Grid item>
                  <Grid item><Typography variant='h1'>Progress</Typography></Grid>
                    <img src={Progress} style={{width: '100%', height: '100%'}}></img>
                  </Grid>
              </Grid>
              </MainCard>
            </Grid>
            <Grid item>
              <Bilboard 
              title='Proportion of Data by Social Media Platform'
              data={
                Object.entries(platforms)
                  .filter(([key, value]) => key != 'Total')
                  .map(([key, value], i) => {
                    console.log(key, value)
                    const ret = [key]
                    ret[4] = 0
                    ret.fill(0, 1, 4)
                    ret[i + 1] = value
                    console.log(ret)
                    return ret
                  })
              }
              chartOption={{
                axis: {
                  x: {
                    type: "category"
                  }
                },
                data: {
                  stack: {
                    normalize: true
                  },
                  x: "x",
                  groups: [
                    ['Total', 'X', 'Facebook', 'Youtube', 'Tiktok', 'Threads'],
                  ],
                    columns: [
                      ["x", 'X', 'Facebook', 'Youtube', 'Tiktok', 'Threads'],
                      ['Total', platforms['Total'], platforms['Total'], platforms['Total'], platforms['Total'], platforms['Total'], platforms['Total']],
                    ],
                    type: bar(),
                    order: null,
                  },
              }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    
      {/* Basic Analysis */}
      <Grid item xs={12}>
        <Grid container direction='row' spacing={gridSpacing}>
          <Grid item xs={6} >
              <D3Treemap id={'treemap'} />
          </Grid>
          <Grid item xs={6} >
            <Grid item>
              <MainCard>
              <Grid container direction='column' xs={12}>
                <Grid item><Typography variant='h1'>Top 50 X Accounts Ranked by Number of Followers</Typography></Grid>
                <CardContent>
                  <Grid item>
                    <Markdown>{BasicAnalysis}</Markdown>
                  </Grid>
                </CardContent>
              </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Time Series Data Analysis */}
      <Grid item xs={12}>
          <Grid container direction='column' spacing={gridSpacing}>
          <Grid item container direction='row' spacing={gridSpacing}>
              <Grid item xs={5}>
                <MainCard>
                  <Grid container direction='column' xs={12}>
                    <Grid item><Typography variant='h1'>Time Series Graph of X Sign-Up Dates</Typography></Grid>
                    <CardContent>
                      <Grid item>
                        <Markdown>{SignupSeriesMarkdown}</Markdown>
                      </Grid>
                    </CardContent>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid container direction='column' item xs={7} spacing={gridSpacing}>
                <Grid item>
                <Bilboard 
                title='Time Series Graph of X Account Sign-ups'
                chartOption={{
                  data: {
                    unselect: ['accumulation'],
                    x: "x",
                    columns: [
                      ['x', ...JoinedXYear.map(x => x['name'])],
                      newlyJoinedUser,
                      accumulation,
                    ],
                    type: line(),
                    },
                    axis: {
                    x: {
                      type: "timeseries",
                      tick: {
                      format: "%Y-%m"
                      }
                    }
                    },
                }} />
                </Grid>
                <Grid item>
                  <MainCard>
                    <img src={GoogleTrendX} style={{width: '100%'}}/>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction='row' spacing={gridSpacing}>
              <Grid item xs={5}>
                <MainCard>
                  <Grid container direction='column' xs={12}>
                    <Grid item><Typography variant='h1'>Time Series Graph of Registration Dates by Entity Owner</Typography></Grid>
                    <CardContent>
                      <Grid item>
                        <Markdown>{SeriesByOwnerMarkdown}</Markdown>
                      </Grid>
                    </CardContent>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid container direction='column' item xs={7} spacing={gridSpacing}>
              <Grid item>
                  <Bilboard 
                    title='Time Series Graph of X Account Sign-ups for the Top 5 Entity Owners'
                    chartOption={{
                    data: {
                      x: "x",
                      columns: [
                        ['x', ...JoinedXYear.map(x => x['name'])],
                        ...owner_columns,
                      ],
                      type: line(),
                      },
                      axis: {
                      x: {
                        type: "timeseries",
                        tick: {
                        format: "%Y-%m"
                        }
                      }
                      },
                  }} />
                </Grid>
                
                <Grid item>
                  <Bilboard 
                    title='Time Series Graph of X Account Sign-ups for the Top 5 Parent Entity Owners'
                    chartOption={{
                      data: {
                        x: "x",
                        columns: [
                          ['x', ...JoinedXYear.map(x => x['name'])],
                          ...parent_owner_columns,
                        ],
                        type: line(),
                        },
                        axis: {
                        x: {
                          type: "timeseries",
                          tick: {
                          format: "%Y-%m"
                          }
                        }
                      },
                  }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

      </Grid>
    </Grid>
  );
};

export default GeneralAnalysis;
