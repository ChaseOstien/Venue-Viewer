const searchHandler = async (event) => {
  event.preventDefault();

  const keyword = document.querySelector("#keyword").value.trim();
   console.log("keyword");
  if (keyword) {
    const response = await fetch("/search", {
      method: "POST",
      body: JSON.stringify({ keyword }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(keyword);
    if (response.ok) {
      console.log(keyword);
      document.location.replace("/search/" + keyword);
    } else {
      alert("No result of the search!");
    }
  }
};

document.querySelector("#search-form").addEventListener("submit", searchHandler);
