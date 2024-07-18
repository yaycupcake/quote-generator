const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []
let currentQuote = {
    author: 'Clodsire',
    tag: 'meme',
    text: 'Hello. You are here. Welcome. I am Clodsire. Press the "New Quote" button to generate a new quote.'
}

// Show Loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

// Load Current Quote
function loadCurrentQuote() {
    quoteText.textContent = currentQuote.text
    authorText.textContent = currentQuote.author ? currentQuote.author : 'Unknown'
    // Check Quote length to determine styling
    if (currentQuote.text.length > 150) {
        quoteText.classList.remove('long-quote')
        quoteText.classList.add('super-long-quote')
    } else if (currentQuote.text.length > 120) {
        quoteText.classList.add('long-quote')
        quoteText.classList.remove('super-long-quote')
    } else {
        quoteText.classList.remove('long-quote')
        quoteText.classList.remove('super-long-quote')
    }
}

// Generate and Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const index = Math.floor(Math.random() * apiQuotes.length)
    currentQuote = apiQuotes[index]
    loadCurrentQuote()
}

// Get Quotes From API
async function getQuotes() {
    loading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        complete()
    } catch (error) {
        currentQuote = {
            author: 'System',
            tag: 'error',
            text: `An error occurred while fetching the quotes. Please refresh the page to try again, or come back later. Details: ${error}`
        }
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" -${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
loadCurrentQuote()