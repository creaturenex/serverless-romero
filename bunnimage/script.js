async function getImage(event) {
  event.preventDefault()
  let myform = document.getElementById("myform")
  let payload = new FormData(myform);
  console.log(payload)
  if (document.getElementById("username").value != '') {
      $('#output').text("Thanks!")

      console.log("Posting your image...");
      const resp = await fetch("https://romeroserverless.azurewebsites.net/api/bunnimage-upload", {
          method: 'POST',
          headers: {
              'codename' : document.getElementById("username").value
          },
          body: payload
      });

      try {
          let data = await resp.text();
          console.log(data);
          $('#output').text("Your image has been stored successfully!")
      } catch (e) {
          alert("Backend error!")
      }
  } else {
      alert("No name error.")
  }
}

async function downloadImage(event) {
    event.preventDefault()
    let dlform = document.getElementById("downloadform")
    let dlpayload = new FormData(dlform);
    console.log(dlpayload)
    if (document.getElementById("downloadUsername").value != '') {
        $('#output').text("Thanks!")

        console.log("Grabbing your image...");
        const resp = await fetch("https://romeroserverless.azurewebsites.net/api/bunnimage-download", {
            method: 'GET',
            headers: {
                'username' : document.getElementById("downloadUsername").value
            },
        });

        try {
            let dldata = await resp.text();
            let imageUrl = JSON.parse(dldata).downloadUri
            console.log(typeof imageUrl);
            $('#output').text("Image downloaded successfully!")

            window.open(imageUrl, 'Download Image')

        } catch (e) {
            alert("Backend error!")
        }
    } else {
        alert("No name error.")
    }
  }
