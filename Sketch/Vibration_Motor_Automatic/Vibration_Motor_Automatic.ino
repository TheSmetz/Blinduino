#define vibrationOut 8
#define distanceMeterEcho 9
#define distanceMeterTrigger 10

float soundvelocity=0.03434;
long timeMeasure; //Time measure taken from distance meter
long distanceMeasure; //Distance measure taken from distance meter
int vibrationDuration = 500; //Duration of the vibration done by the motor
int maxDistance = 400; //Maximum relevant distance

void setup() {
  pinMode(vibrationOut, OUTPUT);
  pinMode(distanceMeterEcho, INPUT);
  pinMode(distanceMeterTrigger, OUTPUT);
  digitalWrite(distanceMeterTrigger, LOW);
}

void loop() {
  digitalWrite(distanceMeterTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(distanceMeterTrigger, LOW);
  timeMeasure = pulseIn(distanceMeterEcho, HIGH);
  distanceMeasure = soundvelocity*timeMeasure/2;

  if(distanceMeasure < maxDistance) {
    digitalWrite(vibrationOut, HIGH);
    delay(vibrationDuration);
    digitalWrite(vibrationOut, LOW);
    delay(timeMeasure/20);
  }
}
