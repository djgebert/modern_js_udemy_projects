const searchInputElem = document.getElementById("searchUser");

searchInputElem.addEventListener("keyup", handleSearchInputChange);

function handleSearchInputChange(e) {
  const searchText = searchInputElem.value;
  if(searchText != '') {
    GitHubAccess.getProfileWithAjaxAndCallback(searchText, handleProfileAjaxResult);
  }

  e.preventDefault();
}

function handleProfileAjaxResult() {
  // This function intended to be used as a callback assigned to XMLHttpRequest.onload
  console.log(this.status);
}


class GitHubAccess {
  static clientId = "1dcde2019364993c57b0";
  static clientSecret = "952acae1a3c26948a29bbd0823204ae6bde3ffff";

  static profileUrl(username) {
    return `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
  }

  static getProfileWithAjaxAndCallback(username, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.profileUrl(username), true);
    xhr.onload = callback;
    xhr.send();
  }

}


