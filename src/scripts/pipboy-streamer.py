import os
import time
import subprocess
from PIL import Image

# Configuration
URL = "http://localhost:5000"
FB_DEVICE = "/dev/fb1"
SIZE = (480, 320)  # Adjust to your screen resolution

def capture_and_blit():
    # 1. Capture the webpage using headless chromium
    # This creates a 'screenshot.png' without needing X11/Wayland
    subprocess.run([
        "chromium",
        "--headless",
        "--screenshot",
        f"--window-size={SIZE[0]},{SIZE[1]}",
        "--default-background-color=000000",
        URL
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    if os.path.exists("screenshot.png"):
        # 2. Open and convert to the format your FB1 expects (usually RGB565 or RGB)
        img = Image.open("screenshot.png").convert("RGB")
        
        # 3. Push to framebuffer
        with open(FB_DEVICE, "wb") as f:
            f.write(img.tobytes())

print("Pip-Boy Display Bridge Started...")
while True:
    try:
        capture_and_blit()
        time.sleep(0.5) # Refresh rate. Increase once confirmed working.
    except Exception as e:
        print(f"Error: {e}")
        time.sleep(2)