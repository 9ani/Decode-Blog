// getQuote.js
async function fetchQuote(category, container) {
    try {
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/quotes?category=' + category,
            {
                headers: {
                    'X-Api-Key': '8NSItaW/ng/lQkMTBny8AQ==jMSrO4P3UNuoMatq'
                }
            }
        );
        const quoteData = response.data;


        if (quoteData.length > 0) {
            displayQuote(quoteData[0].quote, quoteData[0].author, container);
        } else {
            console.error('No quotes found for the category:', category);
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}
function displayQuote(content, author, container) {
    const quoteContainer = document.querySelector(container);
    quoteContainer.innerHTML = `<p>"${content}"</p><p>- ${author}</p>`;
}

// Specify the category and container where you want to display the quote
const category = 'computers';
const container = '.quote-container';

// Fetch and display the quote
fetchQuote(category, container);
