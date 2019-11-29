// we store confighuration information for our server
// this is now we work here

module.exports = {
    // this is where we export the secret key 
    // secret key is for signing the json webtoken
    'secretKey':'12345-6789-98765',
    'mongoUrl':'mongodb://localhost:27017/hello'
}

// now we go to the authenticate.js file and now
// import the configuration file