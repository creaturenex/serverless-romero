function getImage(){
  event.preventDefault()

  if (document.getElementById("name").value != ''){
    $('#output').text("Thanks!")
  } else {
    alert("No name error.")
  }
}
