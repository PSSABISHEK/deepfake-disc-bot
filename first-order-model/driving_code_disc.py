import imageio
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from skimage.transform import resize
from demo import load_checkpoints
from IPython.display import HTML
import warnings

warnings.filterwarnings("ignore")

source_image = imageio.imread('C:/Users/asus/Desktop/dameBot/disc_image.png')
driving_video = imageio.mimread('C:/Users/asus/Desktop/dameBot/disc_vid.mp4')

# Resize image and video to 256x256

source_image = resize(source_image, (256, 256))[..., :3]
driving_video = [resize(frame, (256, 256))[..., :3] for frame in driving_video]




generator, kp_detector = load_checkpoints(config_path='C:/Users/asus/Desktop/dameBot/first-order-model/config/vox-256.yaml',
                            checkpoint_path='C:/Users/asus/Desktop/dameBot/first-order-model/vox-cpk.pth.tar')

from demo import make_animation
from skimage import img_as_ubyte

predictions = make_animation(source_image, driving_video, generator, kp_detector, relative=True)

#save resulting video

imageio.mimsave('C:/Users/asus/Desktop/dameBot/first-order-model/disc_out.mp4', [img_as_ubyte(frame) for frame in predictions])