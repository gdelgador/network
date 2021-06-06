document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    // document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    
    document.querySelector('#compose-form').onsubmit = create_post;

    // By default, load the posts
    load_post();
  });

function create_post() {
  // Content Form
  const content = document.querySelector('#compose-content').value;

  // window.alert(content)
  // Send API
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        content: content
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  });
  // Reload Page
  location.reload();
}


function load_post() {
    // document.querySelector('#posts-view').innerHTML = '<h1>hola</h1>';

    // console.log(`${mailbox}`)
  
    fetch(`/posts`)
    .then(response => response.json())
    .then(posts => {
    console.log(posts);

    for(var k in posts) {  
      const id = posts[k].id;
      const content = posts[k].content;
      const date = posts[k].date;
      const username = posts[k].username;
      const likes = posts[k].likes;

      // creating new element and adding class
      let element = document.createElement('div');
      element.className = "border border-primary"
      // element.style.cssText = (posts[k].read) ? ("border: double; background-color: gray;") : ("border: double; background-color: white;");

      // create div's to insert
      element.innerHTML = `<h2>${username}</h2>`;
      // element.innerHTML = `<button class="btn btn-sm btn-outline-primary" id="Edit">Edit</button>`;
      element.innerHTML +=`<p>${content}</p>`;
      element.innerHTML +=`<p>${date}</p>`;
      element.innerHTML +=`<p>${likes}</p>`;
      element.innerHTML +=`<button class="btn btn-sm btn-outline-primary" id="comment">Comment</button>`;

      // element.addEventListener('click', () => open_email(id,mailbox));
      // inserting new data 
      document.querySelector('#posts-view').append(element);
      }
  });
    
}