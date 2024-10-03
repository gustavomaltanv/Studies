import cv2
import mediapipe as mp


webcam = cv2.VideoCapture(0)
solucao = mp.solutions.face_detection
reconhecimento_facial = solucao.FaceDetection()
desenho = mp.solutions.drawing_utils

while True:
  ver, frame = webcam.read()

  if not ver:
    break

  faces = reconhecimento_facial.process(frame)

  if faces.detections:
    for fc in faces.detections:
      desenho.draw_detection(frame, fc)

  cv2.imshow("Reconhecimento:", frame)
  
  if cv2.waitKey(5) == 27:
    break


webcam.release()
cv2.destroyAllWindows()