const venueSearch = async () => {
    const apiKey = process.env.API_KEY;
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey=${apiKey}`)
    
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
    }   catch (err) {
        console.error(err);
    }       
}