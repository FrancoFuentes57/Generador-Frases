//Constantes para nuestros ID
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

//Get Quote from API
const getQuote = async () => {
  //Loading function
  showLoadingSpinner();

  //ProxyURL - Cors problem
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();

    //Condition: If there isn't an author the text change to unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reduce font-size for long quotes (120)
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    alert("¡Oops! Ha ocurrido un error, favor de reiniciar la página");
  }
};

//Twitter Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https:twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

//Event listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

//On Load
getQuote();
