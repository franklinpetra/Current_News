import React from 'react';
import NewsCard from './NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from'./styles.js';

const infoCards = [
    { color: 'seaGreen', title: 'Latest News', text: 'Give me the latest news.', button:'Latest News'},
    { color: 'seaGreen', title: 'News by Categories', info: 'Business, Entertainment, Health, Science, Technology', text: 'Give me the latest Technology news'},
    { color: 'seaGreen', title: 'News by Terms', info: 'Cultural Icons, Bitcoin, PlayStation 5, Smartphones, President...', text: 'What\'s up with Apple'},
    { color: 'seaGreen', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN'},
];

const NewsCards = ({ articles, activeArticle  }) => {
    const classes = useStyles();
    
    if (!articles.length) {
        return (
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        infoCards.map((infoCard) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                                {
                                    infoCard.info 
                                    ? <Typography variant="h6" component="h6">
                                        <strong>
                                            {infoCard.title.split(' ')[2]}
                                        </strong>: <br />
                                        {infoCard.info}
                                    </Typography> : null
                                }
                                <Typography variant="h6" component="h6">You can ask: <br /> <i>{infoCard.text}</i></Typography>
                                
                            </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grow>
        );
    }
    
    return (
        <Grow in>
            <Grid classname={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} style={{display:"flex"}}>
                    <NewsCard activeArticle={activeArticle} i={i} article={article}/>
                </Grid>
                ))}
            </Grid>
        </Grow>
    );
};

export default NewsCards