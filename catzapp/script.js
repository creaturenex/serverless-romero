async function y1k3s() {
  event.preventDefault()

  let url = "https://cataas.com/cat/says/"

  let name1 = document.getElementById('name1').value

  if (name1 != '') {
    document.getElementById('image1').src = `${url}` + `${name1}`
  }

  let name2 = document.getElementById('name2').value

  if (name2 != '') {
    document.getElementById('image2').src = `${url}` + `${name2}`
  }

  let name3 = document.getElementById('name3').value

  if (name3 != '') {
    document.getElementById('image3').src = `${url}` + `${name3}`
  }

  let name4 = document.getElementById('name4').value

  if (name4 != '') {
    document.getElementById('image4').src = `${url}` + `${name4}`
  }
}
