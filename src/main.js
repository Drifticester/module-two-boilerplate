const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  // create request to the url and return a promise
  fetch(url)
  .then(function(response) {
    return response.json();
   })
  .then(function(data) {
    renderSearchResult(data);
  })
  .catch( alert );
}

function loadUserInfo(userid) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${userid}`
  // create request to the url and return a promise
  fetch(url)
  .then(function(response) {
    return response.json();
   })
  .then(function(data) {
    renderUserInfo(data.data[userid]);
  })
  .catch( alert );
}

function renderSpinner(domNode) {
  // clean all content of passed node and then render element with `spinner` classname
}

function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
  let users = document.getElementById('search-results');
  let html = '';
  accounts.data.forEach(function(item) {
  	html += `<li data-user-id=${item.account_id}>${item.nickname}</li>`
  })
  users.innerHTML = html;
  users.addEventListener('click', function(e) {
  	var li = e.target;
	loadUserInfo(e.target.getAttribute('data-user-id'));
  })
}

function renderUserInfo(data) {
	console.log(data);
	let userInfo = document.getElementById('user-info');
	userInfo.innerHTML = `Global Rating: ${data.global_rating}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  let searchBtn = document.getElementById('search');
  let username = document.getElementById('username');
  searchBtn.addEventListener('click', function() {
  	loadUsers(username.value);
  });
})
