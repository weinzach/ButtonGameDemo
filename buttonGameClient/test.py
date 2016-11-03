import RPi.GPIO as GPIO
import time
from socketIO_client import SocketIO, LoggingNamespace
IP = '192.168.1.100'
print("Connecting to "+IP+"...")
socketIO = SocketIO(IP, 3000, LoggingNamespace)
print("Connected!")
GPIO.setmode(GPIO.BCM)

GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(17,GPIO.OUT)
state = False
while True:
    input_state = GPIO.input(4)
    if (input_state != state)and(input_state==True):
        print('Button Pressed')
	GPIO.output(17, GPIO.HIGH)
	state = input_state
	socketIO.emit('message', '1')
    elif(input_state!=state)and(input_state==False):
	GPIO.output(17, GPIO.LOW)
	state = input_state
    time.sleep(0.2)

