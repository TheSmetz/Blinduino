from imageai.Prediction import ImagePrediction
import os
import urllib.request as url
import win32com.client as wincl

#Dataset path
dataset = 'dataset\\resnet50_weights_tf_dim_ordering_tf_kernels.h5'
#Photo path
photo = 'photos\\photo.jpg'
#Number of desired results
results = 5

execution_path = os.getcwd()

prediction = ImagePrediction()
prediction.setModelTypeAsResNet()

#Downloads datasets if not found
if(not os.path.isfile(dataset)):
    os.mkdir('dataset')
    print('Dowloading datasets...')
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/DenseNet-BC-121-32.h5')
    datatowrite = filedata.read()
    with open('dataset\\DenseNet-BC-121-32.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/inception_v3_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset\\inception_v3_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/resnet50_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset\\resnet50_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)
    filedata = url.urlopen('https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/squeezenet_weights_tf_dim_ordering_tf_kernels.h5')
    datatowrite = filedata.read()
    with open('dataset\\squeezenet_weights_tf_dim_ordering_tf_kernels.h5', 'wb') as f:
        f.write(datatowrite)

prediction.setModelPath(os.path.join(execution_path, dataset))
prediction.loadModel()

predictions, probabilities = prediction.predictImage(os.path.join(execution_path, photo), result_count=results)

for eachPrediction, eachProbability in zip(predictions, probabilities):
    print(eachPrediction , " : " , eachProbability)

announcement = predictions[0].replace("_", " ")

speak = wincl.Dispatch("SAPI.SpVoice")
speak.Speak("This object is a " + announcement)