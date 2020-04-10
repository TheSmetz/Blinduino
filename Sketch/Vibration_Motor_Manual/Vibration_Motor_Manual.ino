#define buttonIn 7
#define vibrationOut 8
#define distanceMeterEcho 9
#define distanceMeterTrigger 10

bool state = false;          //Stores the state, changed by the button (on/off)
long timeMeasure;            //Time measure taken from distance meter
long distanceMeasure;        //Distance measure taken from distance meter
int vibrationDuration = 500; //Duration of the vibration done by the motor
int maxDistance = 400;       //Maximum relevant distance

void setup()
{
    pinMode(vibrationOut, OUTPUT);
    pinMode(distanceMeterEcho, INPUT);
    pinMode(distanceMeterTrigger, OUTPUT);
    pinMode(buttonIn, INPUT);
    digitalWrite(distanceMeterTrigger, LOW);
    Serial.begin(9600);
}

void loop()
{
    if (digitalRead(buttonIn) == HIGH)
    {
        state = !state;
        Serial.println(state);
        delay(500);
    }
    if (state)
    {
        digitalWrite(distanceMeterTrigger, HIGH);
        delayMicroseconds(10);
        digitalWrite(distanceMeterTrigger, LOW);
        timeMeasure = pulseIn(distanceMeterEcho, HIGH);
        distanceMeasure = 0.03434 * timeMeasure / 2;
        if (distanceMeasure < maxDistance)
        {
            digitalWrite(vibrationOut, HIGH);
            delay(vibrationDuration);
            digitalWrite(vibrationOut, LOW);
            delay(timeMeasure / 20);
        }
    }
}
