from PIL import Image

img = Image.open('frontend/public/image copy 4.png')
pixels = img.load()
width, height = img.size

# We want to find the bounding box of the "screen" which has the bright deities.
# The laptop bezel is dark (almost black). The background outside the laptop is also dark in the immediate vicinity (maybe some stars).
# Let's sample the center row and column to find the edges of the bright screen.
cy = height // 2
cx = width // 2

left, right, top, bottom = cx, cx, cy, cy

# Walk left
while left > 0:
    r,g,b = pixels[left, cy][:3]
    if r < 30 and g < 30 and b < 30:  # Hit the black bezel
        break
    left -= 1

# Walk right
while right < width - 1:
    r,g,b = pixels[right, cy][:3]
    if r < 30 and g < 30 and b < 30:
        break
    right += 1

# Walk up
while top > 0:
    r,g,b = pixels[cx, top][:3]
    if r < 30 and g < 30 and b < 30:
        break
    top -= 1

# Walk down
while bottom < height - 1:
    r,g,b = pixels[cx, bottom][:3]
    if r < 30 and g < 30 and b < 30:
        break
    bottom += 1

print(f"L: {left}, R: {right}, T: {top}, B: {bottom}")
print(f"L%: {left/width*100:.2f}%, R%: {(width-right)/width*100:.2f}%, T%: {top/height*100:.2f}%, B%: {(height-bottom)/height*100:.2f}%")
