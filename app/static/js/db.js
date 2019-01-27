// Initialize the App Client
  const client = stitch.Stitch.initializeDefaultAppClient("wellspring-pugwj");
  // Get a MongoDB Service Client
  const mongodb = client.getServiceClient(
    stitch.RemoteMongoClient.factory,
    "mongodb-atlas"
  );
  // Get a reference to the blog database
  const db = mongodb.db("WellspringUsers");

  function displayResponses() {
    db.collection("Profiles")
      .find({}, {limit: 1000})
      .toArray()
      .then(docs => {
        const html = docs.map(doc => `<div>${doc.Response}</div>`);
        document.getElementById("Responses").innerHTML = html;
      });
  }

  function displayResponsesOnLoad() {
    client.auth
  
      .loginWithCredential(new stitch.AnonymousCredential())
  
      .then(displayResponses)
      .catch(console.error);
  }

  function addResponse() {
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    const newResponse = r3.concat(r2, r3);
    console.log("add Response", client.auth.user.id);
    db.collection("Profiles")
      .insertOne({ user_id : client.auth.user.id, response: newResponse.value })
      .then(displayResponses);
    newResponse.value = "";
  }

  