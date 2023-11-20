
export default  `

## Crawling

### Why Do I Crawl Social Media?

Upon examining the given social media accounts for additional information that could be collected, it was found that accessing actual posts written by the authors would require a paid subscription through the API (referring to X's former Twitter). During the exploration for data available via crawling, it was noted that the registration date is a standard piece of information provided by the account.

Visualizing data related to the sign-up dates suggested the potential to identify when the efforts for Foreign Interference through social media could have been intensified.

### How I Crawled the Data

To efficiently gather data, the SNS platforms selected for crawling additional data were based on the 'Proportion of Data by Social Media Platform' Bar Chart, focusing on X, which held the largest proportions.

1. Filtered data for accounts with X
2. Accessed pages through Selenium.
3. Verified account validity before crawling the registration dates.
4. Compiled the crawled data with the existing dataset.

### Filtering Stale User

During the crawling process, it was discovered that some X accounts had been suspended or deleted.
`