from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from imageai.Prediction import ImagePrediction
from PIL import Image
import base64
import os
import urllib.request as url

#Dataset path (we use the resnet50 one, but we also have three others downloaded)
dataset = 'dataset/resnet50_weights_tf_dim_ordering_tf_kernels.h5'
#Temp photo name (and maybe path), it doesn't actually matter how it's called
photo = 'tmp.jpeg'
#Number of desired results (default is one, we olny care about the most likely result)
results = 1

#Updates tensorflow to latest version for maximum accuracy
os.system('pip install tensorflow --upgrade')

#Downloads datasets if not found
if(not os.path.isfile(dataset)):
    os.mkdir('dataset')
    print('Starting datasets donwload...')
    #Downloads DenseNet dataset
    print('Dowloading DenseNet dataset...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/DenseNet-BC-121-32.h5')
    datatowrite = filedata.read()
    with open('dataset/DenseNet-BC-121-32.h5', 'wb') as f:
        f.write(datatowrite)
    #Downloads Inceptionv3 dataset
    print('Dowloading Inceptionv3 dataset...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/inception_v3_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/inception_v3_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    #Downloads ResNet50 dataset
    print('Dowloading ResNet50 dataset...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/resnet50_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/resnet50_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    #Downloads SqueezeNet dataset
    print('Dowloading SqueezeNet dataset...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/squeezenet_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset/squeezenet_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)

#Flask setup (with CORS settings)
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Defines request path and type
@app.route('/', methods=['POST'])
@cross_origin()
def result():
    #Gets base64 encoded image from request body and saves it in a temporary file
    imagedata = base64.b64decode(str(request.json['image']))
    with open(photo, 'wb') as f:
        f.write(imagedata)

    #Calls Tensorflow and sets its main settings
    execution_path = os.getcwd()
    prediction = ImagePrediction()

    #Sets model type (change it if using a different type dataset)
    prediction.setModelTypeAsResNet()

    #Sets the correct dataset (defined above)
    prediction.setModelPath(os.path.join(execution_path, dataset))
    prediction.loadModel()

    #Recognizes image, based on how many results we requested
    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, photo), result_count=results)

    #Prints all the chosen results (for debug purpose)
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        print(eachPrediction , " : " , eachProbability)

    #Removes underscores from result if present (result must be read out loud, so the underscore must be removed)
    announcement = predictions[0].replace("_", " ")

    #Deletes the prediction image from system
    os.remove('tmp.jpeg')

    #Responds to the received request with a JSON
    return jsonify(announcement)

#Sets the server ip and port based on what the hosting space supports (or to a fallback value otherwise)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
