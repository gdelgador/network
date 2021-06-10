document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#compose-form').onsubmit = create_post;
    
    document.addEventListener('click',event => {
      const element = event.target;
      if (element.id === 'like') {
        // element.parentElement.style.animationPlayState = 'running';
        // element.parentElement.addEventListener('animationend', () =>  {
        //     element.parentElement.remove();
        // });
        window.alert('like');
      }
    });
    // document.querySelector('button.page-link').addEventListener('click', () => load_mailbox('sent'));
    
    // By default, load the posts
  // document.querySelectorAll('button.page-link').forEach(button => {
  //   button.onclick = function() {
  //     const section = this.dataset.section;
  //     history.pushState({section: section}, "", "");
  //     showSection(section);
  //     };
  // });


});



function showSection(section) {
                
  fetch(`?page=${section}`)
  .then(response => response.text())
  .then(text => {
      console.log(text);
      document.querySelector('#content').innerHTML = text;
  });

}

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


function update_post(post_id) {
  console.log('update post' + post_id);

  fetch(`/emails/${post_id}`,{
    method: 'PUT',
    body: JSON.stringify({content: content})
  })

}

function like_post(post_id) {
  window.alert('like');
}





