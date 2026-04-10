import cv2
import os

video_path = r"d:\TechbrahamandAbhikSir\TechBramhand\Brahma_Vishnu_Shiva_202604092142.mp4"
output_dir = os.path.join(r"d:\TechbrahamandAbhikSir\TechBramhand\frontend", "public", "video-frames")

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error opening video stream or file")
    exit(1)

frame_count = 1
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Save frame as JPEG with decent quality (80)
    output_path = os.path.join(output_dir, f"frames_{frame_count:04d}.jpg")
    cv2.imwrite(output_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
    frame_count += 1

cap.release()
print(f"Extraction complete! Extracted {frame_count - 1} frames to {output_dir}")
