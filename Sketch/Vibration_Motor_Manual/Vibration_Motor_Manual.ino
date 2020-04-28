#define buttonIn 7                    //Switch Pin
#define vibrationOut 8                //Vibration Pin
#define distanceMeterEcho 9           //DistanceMeterEcho Pin
#define distanceMeterTrigger 10       //DistanceMeterTrigger Pin

bool state = false;                   //Stores the state, changed by the button (on/off)
long timeMeasure;                     //Time measure taken from distance meter
long distanceMeasure;                 //Distance measure taken from distance meter
int vibrationDuration = 500;          //Duration of the vibration done by the motor
int maxDistance = 400;                //Maximum relevant distance

// --------------------------------------------------------------------------------------
// SET UP  SET UP   SET UP   SET UP   SET UP   SET UP   SET UP   SET UP   SET UP
// --------------------------------------------------------------------------------------

void setup()
{
    pinMode(vibrationOut, OUTPUT);                //Setup Vibration
    pinMode(distanceMeterEcho, INPUT);            //Setup Distancemeter Echo
    pinMode(distanceMeterTrigger, OUTPUT);        //Setup Distancemeter Trigger
    pinMode(buttonIn, INPUT);                     //Setup Button ON OFF
    digitalWrite(distanceMeterTrigger, LOW);      //Setup Distancemeter Trigger Off
    Serial.begin(9600);                       
}

// --------------------------------------------------------------------------------------
// LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP     LOOP
// --------------------------------------------------------------------------------------

void loop()
{
    if (digitalRead(buttonIn) == HIGH)  //Control the button HIGH or LOW
    {
        state = !state;                                     //Change state of Button in ON or OFF
        Serial.println(state);                              //Print the state of the vibrator
        delay(500);                                         //Delay to use the button
    }
    if (state)
    {
        digitalWrite(distanceMeterTrigger, HIGH);           //Send a 10us pulse to the trigger
        delayMicroseconds(10);                              //Delay to wait the pulse
        digitalWrite(distanceMeterTrigger, LOW);            //Receive pulse
        timeMeasure = pulseIn(distanceMeterEcho, HIGH);     //Save the pulse
        distanceMeasure = 0.03434 * timeMeasure / 2;        //Convert the pulse in cm
        if (distanceMeasure < maxDistance)    //Control range of distance              
        {
            digitalWrite(vibrationOut, HIGH);               //Activate Vibration
            delay(vibrationDuration);                       //Duration of vibration
            digitalWrite(vibrationOut, LOW);                //Deactivate Vibration 
            delay(timeMeasure / 20);                        //Set up the time of Vibration based on timeMeasure (avoid 3 If cycles)
        }
    }
}
