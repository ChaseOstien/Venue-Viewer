const venue_id = document.querySelector('input[name="post-id"]').value;

console.log("testing");
console.log(venue_id);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_content = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;
  console.log(comment_content);

  if (comment_content) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment_content,
        venue_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
