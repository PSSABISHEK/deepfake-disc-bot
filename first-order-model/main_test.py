from skimage import img_as_ubyte
from demo import make_animation
from demo import load_checkpoints
from io import BytesIO
import requests
import imageio
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from skimage.transform import resize
#from IPython.display import HTML
import warnings
warnings.filterwarnings("ignore")

source_image = imageio.imread('kii.jpeg')
driving_video = imageio.mimread('04.mp4')


# Resize image and video to 256x256

source_image = resize(source_image, (256, 256))[..., :3]
driving_video = [resize(frame, (256, 256))[..., :3] for frame in driving_video]

generator, kp_detector = load_checkpoints(config_path='first-order-model/config/vox-256.yaml',
                                          checkpoint_path='first-order-model/vox-cpk.pth.tar')


#predictions = make_animation(source_image, driving_video, generator, kp_detector, relative=True, cpu=True)
predictions = make_animation(
    source_image, driving_video, generator, kp_detector, relative=True)

# save resulting video
imageio.mimsave('out.mp4', [img_as_ubyte(frame) for frame in predictions])
# video can be downloaded from /content folder
