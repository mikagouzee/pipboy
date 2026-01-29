#!/bin/bash

# Prevent screen from dimming/sleeping
xset s off
xset -dpms
xset s noblank

# Wait for the backend
until $(curl --output /dev/null --silent --head --fail http://localhost:5000); do
    sleep 1
done

# Launch Chromium (Targeting the specific X11 display if needed)
# On SPI screens, you might need to specify DISPLAY=:0
export DISPLAY=:0
chromium --kiosk --noerrdialogs --disable-infobars http://localhost:5000