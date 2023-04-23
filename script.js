const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Global variable Quotes
let quotes = [];

// Create New Quote
const newQuote = () => {
  loading();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  if (quote.text.length > 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;

  quoteAuthor.textContent = quote.author ? quote.author : "Unknown";

  if (quoteAuthor.textContent !== "Unknown") {
    if (quoteAuthor.style.color !== "#511055")
      quoteAuthor.style.color = "#511055";
    complete();
    return;
  }

  quoteAuthor.style.color = "#FF5733";
  complete();
};

const loading = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
};

const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};
// Get Quotes from API
const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    quotes = await res.json();
    newQuote();
  } catch (err) {
    // Catch Error Here
    console.log(err);
    complete();
  }
};

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${
    quoteText.textContent + " - " + quoteAuthor.textContent
  }`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
