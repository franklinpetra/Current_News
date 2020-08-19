import React, { useState, useEffect } from 'react';
import './App.css';
import image from "./assets/img/womenReadingNews.jpg";
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import { NewsCards, Modal } from './components';
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import image2 from "./assets/img/imagesfrontpage.jpg";


// const alanKey = "0f1af5b52f2a6e90a6bb2899427cfda32e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '0f1af5b52f2a6e90a6bb2899427cfda32e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={image}  className="image" alt="women reading news" />
          <p>
            Application Using Alan AI to enable <br />Voice Controlled Current News Queries
          </p>
          <p style={{fontSize:"large", margin:"-1% 0% 3% 0%", color: "# (57, 20, 20)", width:"70%"}}>Users can interact with a news API via voice commands and have the news read back to them by Alan AI.</p>
        </header>
      </div>

      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="http://alan.app/voice/images/previews/preview.jpg" className="alanLogo" alt="Alan Logo"/>
        <img src={image2} style={{mixBlendMode:"multiply"}}  className="newsLogo" alt="News Logo"/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className="footer">
          <Typography variant="body1" component="h2" >
            {/* Created by */}
            {/* <a className={classes.link}  href="https://www.linkedin.com/in/petra-franklin/"> Petra Franklin</a> <br/> 
            This app is based on a superb tutorial by <a href="https://linktr.ee/javascriptmastery">Alan Hajdin</a>  who explains the awesome AI interface called <a href="https://alan.app">Alan AI</a>!  It used React, Mongoose, Express, Node, Material-UI, newsapi.org and WordsToNumbers.  
            <br></br>Notes: After clicking on the microphone, you can ask for headlines, or specific categories, such as technology news, or you can use terms, such as a person's name, or you can ask for specific news providers, such as CNN, Wired, NYTs, or the BBC. Enjoy! */}
          </Typography>
        </div>
      ) : null }
    </div>
  );
};

export default App;
