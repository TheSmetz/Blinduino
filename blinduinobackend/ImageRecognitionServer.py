from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from imageai.Prediction import ImagePrediction
from PIL import Image
import base64
import os
import urllib.request as url

#Dataset path
dataset = 'dataset/resnet50_weights_tf_dim_ordering_tf_kernels.h5'
#Photo path
photo = 'tmp.jpeg'
#Number of desired results
results = 1

#Downloads datasets if not found
if(not os.path.isfile(dataset)):
    os.mkdir('dataset')
    print('Dowloading datasets...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/DenseNet-BC-121-32.h5')
    datatowrite = filedata.read()
    with open('dataset/DenseNet-BC-121-32.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/inception_v3_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/inception_v3_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/resnet50_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/resnet50_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/squeezenet_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/squeezenet_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST'])
@cross_origin()
def result():
    #Gets base64 encoded image from request body and saves it
    imagedata = base64.b64decode(str(request.json['image']))
    with open(photo, 'wb') as f:
        f.write(imagedata)

    #Calls Tensorflow and sets its main settings
    execution_path = os.getcwd()
    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    prediction.setModelPath(os.path.join(execution_path, dataset))
    prediction.loadModel()

    #Recognizes image
    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, photo), result_count=results)

    #Prints all the chosen results
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        print(eachPrediction , " : " , eachProbability)

    #Removes underscores if present
    announcement = predictions[0].replace("_", " ")

    #Deletes the prediction image from system
    os.remove('tmp.jpeg')

    #Responds to the received request
    return jsonify(announcement)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)