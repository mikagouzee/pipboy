#!/bin/bash

#Environment setup
export DISPLAY=:0
export URL="http://localhost:5000"

# Prevent screen from dimming/sleeping
xset s off
xset -dpms
xset s noblank

# Wait for the backend
echo "Waiting for backend to be available at $URL..."
until curl --output /dev/null --silent --head --fail "$URL"; do
    sleep 1
done

# Kill any existing Chromium instances
pkill chromium || echo "No existing Chromium instances to kill."

# Launch Chromium (Targeting the specific X11 display if needed)
# On SPI screens, you might need to specify DISPLAY=:0
# remote 9222 port is for debugging purposes
export DISPLAY=:0
chromium  \
    --kiosk \
    --no-first-run \
    --noerrdialogs \
    --disable-infobars \
    --disable-session-crashed-bubble \
    --ozone-platform=X11 \
    --disable-gpu \
    --disable-software-rasterizer \
    --check-for-update-interval=31536000 \
    --remote-debugging-port=9222 \
    "$URL"