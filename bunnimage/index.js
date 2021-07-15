async function getImage(event) {
  event.preventDefault()
  var myform = document.getElementById("myform")
  var payload = new FormData(myform);
  console.log(payload)
  if (document.getElementById("username").value != '') {
      $('#output').text("Thanks!")

      console.log("Posting your image...");
      const resp = await fetch("https://priscool.azurewebsites.net/api/w3s3?code=WXnJgVXmLh1VRmcNyZhyr9yy5GSu94iTuEsvSI0chEoHmWazwBK/dg==", {
          method: 'POST',
          headers: {
              'codename' : document.getElementById("username").value
          },
          body: payload
      });

      try {
          var data = await resp.text();
          console.log(data);
          $('#output').text("Your image has been stored successfully!")
      } catch (e) {
          alert("Backend error!")
      }
  } else {
      alert("No name error.")
  }
}
