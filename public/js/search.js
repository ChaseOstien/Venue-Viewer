async function fetchAndDisplayArticles() {
    try {
        console.log('fetchAndDisplayArticles called');
        let keyWord = document.querySelector('#keyword').value;
        //const apiKey = process.env.API_KEY;
        const url = `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${keyWord}&apikey=KhmZhazbRv5fZzhMfN38QaddApQaAfR0`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        fetchDataAndRender(data);
        return data._embedded.venues;
        
    }   catch (err) {
        console.error(err);
    }
}

function fetchDataAndRender(data) {
    console.log('fetchDataAndRender called');
    try {
        
        const venues = data._embedded.venues;
        console.log('Data', venues);
        // Compile the Handlebars template
        const source = document.getElementById('template').innerHTML;
        
        console.log('Source', source);
        const template = Handlebars.compile(source);
        console.log('Template', template);
        const renderedHtml = template({ venues });
        console.log('Rendered HTML', renderedHtml);

        // Render the template with the data and insert it into the specified element
        const articlesContainer = document.getElementById('container1');
        articlesContainer.innerHTML = renderedHtml;

    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
};

