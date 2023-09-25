const searchHandler = async (event) => {
    event.preventDefault();

    const keyWord = document.querySelector('#keyword').value.trim();
    //console.log(keyWord);
    if (keyWord) {
        const response = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({ keyWord }),
            headers: { 'Content-Type': 'application/json' },
            
        });
        console.log('response', response);
        if (response.ok) {
            document.location.replace('/search');
          } else {
            alert('');
          }
        }
    };

document.querySelector('#search-form').addEventListener('submit', searchHandler);