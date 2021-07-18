async function y1k3s() {
  event.preventDefault()

  let url = "https://cataas.com/cat/gif/says/"

  let name = document.getElementById('username').value

  if (name != '') {
    document.getElementById('image').src = `${url}` + `${name}`

    console.log("Getting your image...");
  }
}
