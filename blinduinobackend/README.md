# BlinduinoBackend

A lightweight backend for Blinduino, which manages image recognition requests.

Developed using flask, imageai and tensorflow, it runs as a server (tested both locally and in a Heroku instance) and waits for a POST request containing the image to process in base64 stringified format.

Once the image is received, it is saved locally, analyzed using imageai and tensorflow (which use some downloaded neural nets to recognize the image) and a result is given back as a response to the initial POST request.

The whole process could be slower or faster depending on the size and quality of the image, and of course the performance of the server who hosts the backend (as of now, Heroku is not the best, since we are using its free trial).

NOTE: the tensorflow version we use is the 2.0.1, once again due to a limit in the Heroku hosting service which doesn't allow us to upload more than 500 MB to the repository (unfortunately, tensorflow gained ~300 MB in the 2.1.0 update).