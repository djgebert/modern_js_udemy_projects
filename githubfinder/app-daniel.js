const searchInputElem = document.getElementById("searchUser");
const profileDivElem = document.getElementById("profile");

searchInputElem.addEventListener("keyup", handleSearchInputChange);

function handleSearchInputChange(e) {
  const searchText = searchInputElem.value;
  if(searchText != '') {
    
    // With fetch and promises
    GitHubAccess.getProfileWithFetchAndPromises(searchText);
    
    // With Ajax
    // GitHubAccess.getProfileWithAjaxAndCallback(searchText, GitHubAccess.handleProfileAjaxResult);
  }
  else{
    UI.clearProfileAndRepos();
  }
  e.preventDefault();
}


class GitHubAccess {
  static clientId = "1dcde2019364993c57b0";
  static clientSecret = "952acae1a3c26948a29bbd0823204ae6bde3ffff";

  static profileUrl(username) {
    return `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
  }

  static reposUrl(username) {
    return `https://api.github.com/users/${username}/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
  }

  static getProfileWithAjaxAndCallback(username, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.profileUrl(username), true);
    xhr.onload = function() {
      if(this.status === 200) {
        UI.displayProfile(this.responseText);
        // Now get repos
        const xhttp = new XMLHttpRequest();
        
        xhttp.open('GET', GitHubAccess.reposUrl(username), true);
        xhttp.onload = GitHubAccess.handleReposAjaxResult;
        xhttp.send();
      }
      else {
        UI.displayError("Username not found.");
      }
    };
    xhr.send();
  }

  static handleReposAjaxResult() {
    if(this.status === 200) {
      UI.displayRepos(this.responseText);
    }
    else {
      UI.displayError("Could not find repos.");
    }
  }

  static getProfileWithFetchAndPromises(username) {
    const fetchPromise = fetch(this.profileUrl(username))
    console.log(fetchPromise);
  }
}

class UI {
  static displayError(message) {
    profileDivElem.innerHTML = `
    <div class="alert alert-danger">
      Username not found.
    </div>`

    setTimeout(this.clearProfileAndRepos, 3000);
  }

  static displayProfile(dataJSON) {
    const data = JSON.parse(dataJSON);
    
    profileDivElem.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${data.avatar_url}">
          <a href="${data.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${data.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${data.public_gists}</span>
          <span class="badge badge-success">Followers: ${data.followers}</span>
          <span class="badge badge-info">Following: ${data.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${data.company}</li>
            <li class="list-group-item">Website/Blog: <a href="https://${data.blog}" target="_blank">${data.blog}</a></li>
            <li class="list-group-item">Location: ${data.location}</li>
            <li class="list-group-item">Member Since: ${data.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
  `;
  }

  static displayRepos(dataJSON) {
    const data = JSON.parse(dataJSON);
    let html = "";
    for(let i=0; i<5; i++) {
      if(data[i]){
        const repo = data[i];
        html += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>`
      }
      else break;
    }
    document.getElementById("repos").innerHTML = html;
  }

  static clearProfileAndRepos() {
    profileDivElem.innerHTML = "";
  }

}