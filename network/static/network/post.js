document.addEventListener('DOMContentLoaded', function() {

  if (document.querySelector('#compose-form')){
    document.querySelector('#compose-form').onsubmit = create_post;
  }

  // if (document.querySelector('#follow')){
  //   document.querySelector('#follow').addEventListener('click', () => follow(''));
  // }

  document.addEventListener('click', click_post,false);

});

function follow(id) {

  // const user_name = document.querySelector('h2').textContent;

  // console.log(user_name);
  console.log('holi');
  // change status follow or unfollow

  // reload
  // location.reload();

}


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



function click_post(e) {
  const element = e.target;
  let post_id;

  switch (element.id) {
    case 'like_post':
      // window.alert('like');
      const p_like = element.parentElement;
      let div_post = p_like.parentElement; 
      post_id = div_post.dataset.page;

      // like function
      like_post(post_id,p_like);
      break;
    case 'edit_post':
      let divp = element.parentElement;
      post_id = divp.dataset.page;
      let text_content = divp.querySelector('p.post-content').textContent;

      // Form Edit
      divp.innerHTML =  `<textarea id='edit_post_textarea' class="form-control" id="compose-content" rows="3">${text_content}</textarea>`;
      divp.innerHTML = divp.innerHTML + "<button id='save' type='button' class='btn btn-info'>Save</button>";

      document.querySelector('#save').addEventListener('click', () => save_edit(divp,post_id));
      break;
    case 'follow':
      const user_name = document.querySelector('#profile').textContent;

      console.log(user_name);

      // api
      fetch(`/profile/${user_name}`,{
        method: 'PUT',
        body: JSON.stringify({
          content: user_name
        })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
      });
      // reload
      location.reload();
      
    
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

// HECHO

function like_post(post_id, p_like) {
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
      const span_element = p_like.querySelector('span');
      span_element.textContent = result.likes
  });
}

function save_edit(element, post_id) {
  let content = document.querySelector('#edit_post_textarea').value;
  console.log(post_id);
  fetch(`/edit_posts/${post_id}`,{
    method: 'PUT',
    body: JSON.stringify({content: content})
  })
  
  location.reload();

}