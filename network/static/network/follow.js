document.addEventListener('DOMContentLoaded', function(){
   
    document.querySelector('#follow').addEventListener('click', () => follow('follow', this.state));

});

function follow(state, v) {
    window.alert(state, v);
}