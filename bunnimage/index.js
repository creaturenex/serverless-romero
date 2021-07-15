function getImage() {
  event.preventDefault()
  if (document.getElementById("name").value != '') {
    $('#output').text("Thanks!")
  } else {
    alert("No name error.")
  }

  let bunniForm = document.getElementById("submitImage");

  //At this point in time the form data has no image as we are only creating it
  let payload = new FormData(bunniForm);


  //Where is fileInput from/assigned? Per instructions its saying get the first file from fileInput
  // fileInput is the file upload input element
  const file = bunniForm.files[0];

  payload.append("file", file);

  try {
    const response = await fetch(resource, {
      method: 'POST',
      body: '',
      headers: {
        'image': 'file'
      }
    });
    console.log(response)
    context.log(response)
  } catch (e) {
    let errorMessage = "An error has occurred and now the dumpster on fire"
    console.log(errorMessage) && context.log(errorMessage)
  }
}
