What is cookies??

    to prevent adding the user and password every single time we use some mechanism
    to store this in a client side is called cokies
        remember cokies is saved in the cliend side
        and include the request you send
    but if your server wants to save it on their own 
    not in your side it will save it on the session
        remember sessiosns is saved in the server side
    
    but cookies cant save a very large data
    it only saved a simple auth information

    but session can do a lot more

    What are HTTP cookies?

        http cookies is a piece of data that is send by the webserver 
        and saved in the user session

        in the http header will send another parameter that
        tells the browser to save the data in the cookies
        cookies can be encypted with a key value that will
        be only decrypted by the server  
        server program gives a command names set cookies
        in the server side and when the client recives the request
        it will set the cookies in the client side


        you can set the expire the cookies so after a time
        this cookies will be deleted or no longer valids


        server used a secret key in the server to sign the cookie
        a secret key is  a specfic key that only the server knows
        and with the help of the key it will create a key value pair
        and use it for the encryption 
        only the server knows the server knows the key
        and sfter the information is set the 
        the client send the information with the secret key that only 
        the server knows how to decryptt it and thats how the communication becomes secure
        every node server support this with secret key
        when the cookie is parsed and signed then we can use to authticate


        