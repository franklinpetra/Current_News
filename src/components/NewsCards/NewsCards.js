import React, { useState } from 'react';
import NewsCard from './NewsCard/NewsCard';
import Alert from '../Alert/Alert';
import { Grid, Grow, Typography } from '@material-ui/core';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import useStyles from'./styles.js';
import Axios from"axios";



const NewsCards = () => {
  const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] =useState("");



const infoCards = [
    { color: '#ff9966', title: 'Latest News', text: 'Give me the latest news' , button:"Get Headlines", query:"top-headlines"},
    { color: '#66b3ff', title: 'Request by Interests', subhead: "Categories", info: 'Business, Arts, Health, Science, Technology...', text: 'Give me the latest Tech news', button:"Science News", query:"science-news"},
    { color: '#bf80ff', title: 'Request by Subjects', subhead:"Terms" ,info: 'Bitcoin, iPhone, VR headsets, the Election...', text: 'What\'s up with Apple?', button:"Get Election News" , query:"election-news"},
    { color: '#339966', title: 'Request by Sources', subhead:"Publications" , info: 'The Washington Post, Wired, BBC News, Time, Buzzfeed ...', text: "Open the Washington Post" , button:"Washington Post", query:"Washington-Post"},
];

  const API_KEY = "3ef8500dc4264ff186f1f7173c54f8f3";
  const NEWS_API_URL = `https://newsapi.org/v2/${infoCards.query}?apiKey=${API_KEY}&country=us`;
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(NEWS_API_URL);
      if (!result.data.more) {
        return setAlert("Low NEWS day.  Maybe if you ask Alan he can find something.");
      }
      console.log(result);
      setNewsArticles(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Something didn't work. Please ask Alan for the headlines.");
    }
  };
  const onSubmit  = e => {
    e.preventDefault();
    getData();
  };

  const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();
  
    if (!articles.length) {
      return (
        <Grow in>
          <Grid className={classes.container} container alignItems="stretch" spacing={2}>
            {infoCards.map((infoCard) => (
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                  <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                    {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.subhead}</strong>: <br />{infoCard.info}</Typography> : null}
                  <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                  <CardActions>
                    <Button variant="contained" onSubmit={onSubmit} size="medium" color="primary"><i>{infoCard.button}</i></Button>
                    {alert !== "" && <Alert alert={alert} />}
                  </CardActions>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grow>
      );
    }
  
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
          {articles.map((article, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
              <NewsCard activeArticle={activeArticle} i={i} article={article} />
            </Grid>
          ))}
        </Grid>
      </Grow>
  );
};


}
export default NewsCards;