document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#compose-form').onsubmit = create_post;
    document.addEventListener('click', click_post,false);
    // document.querySelectorAll('#posts').forEach(post_content);
    
    // By default, load the posts
  // document.querySelectorAll('button.page-link').forEach(button => {
  //   button.onclick = function() {
  //     const section = this.dataset.section;
  //     history.pushState({section: section}, "", "");
  //     showSection(section);
  //     };
  // });


});

function post_content(element) {

  const post_id = element.dataset.page;

  // console.log(post_id);

  // element.addEventListener('#comment_post')
  element.querySelector('#comment_post').addEventListener('click', comment_post(post_id));
}



// APIS

function create_post() {
  // Content Form
  const content = document.querySelector('#compose-content').value;

  // Send API
  fetch('/compose', {
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


function edit_post(post_id) {
  console.log('update post' + post_id);

  fetch(`/emails/${post_id}`,{
    method: 'PUT',
    body: JSON.stringify({content: content
    })
  })

}

function click_post(e) {
  const element = e.target;

  switch (element.id) {
    case 'like_post':
      // window.alert('like');
      const div_post = element.parentElement.parentElement; 
      const post_id = div_post.dataset.page;

      console.log(post_id)

      fetch('/like', {
        method: 'POST',
        body: JSON.stringify({
            post_id: post_id
        })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
      });
      
      break;
    case 'edit_post':
      window.alert('edit');
      break;
    case 'comment_post':
      window.alert('comment_post');
      break;
  }
  
}

function follow(state) {
  window.alert(Request.username,state)
}

function comment_post(post_id) {
  console.log(post_id, "comment");
}

// PAGINATOR
function showSection(section) {
                
  fetch(`?page=${section}`)
  .then(response => response.text())
  .then(text => {
      console.log(text);
      document.querySelector('#content').innerHTML = text;
  });

}



