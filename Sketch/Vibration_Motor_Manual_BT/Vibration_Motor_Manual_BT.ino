// NB
/* Before starting this application, the Bluetooth-Modul (HC-05) has to be coupled 
 * to the Smartphone. In the special case of the HC-05 the default PinCode for initiating 
 * the Coupling-Process is "1234".
 * IMPORTANT: The complete StringBluetooth has to be of the Form: state,distance; state,state,distance,distance,distance;
 *  es: 1,0.5,0.6,0.7,0,1,0.4,0.3,0.2....
 * (every Value has to be seperated through a comma (',') and the message has to end with a semicolon (';')) */

#define buttonIn 7                    //Switch Pin
#define vibrationOut 8                //Vibration Pin
#define distanceMeterEcho 9           //DistanceMeterEcho Pin
#define distanceMeterTrigger 10       //DistanceMeterTrigger Pin
#include "Arduino.h"
#include <SoftwareSerial.h>           //Library about Bluetooth


bool state = false;          //Stores the state, changed by the button (on/off)
long timeMeasure;            //Time measure taken from distance meter
long distanceMeasure;        //Distance measure taken from distance meter
int vibrationDuration = 500; //Duration of the vibration done by the motor
int maxDistance = 400;       //Maximum relevant distance
SoftwareSerial BTserial(0, 1); // RX , TX Initiate our BT object. First value is RX pin, second value TX pin

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
    BTserial.begin(9600);                         // Set baud rate of HC-05
    Serial.begin(9600);                           
}

// --------------------------------------------------------------------------------------
// LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP    LOOP     LOOP
// --------------------------------------------------------------------------------------

void loop()
{
    if (digitalRead(buttonIn) == HIGH)  //Control the button HIGH or LOW
    {
        state = !state;                                       //Change state of Button in ON or OFF
        BTserial.print(state);                                //Print the state of the vibrator
        delay(500);                                           //Delay to use the button
    }
    if (state)    //Control the state
    {
        digitalWrite(distanceMeterTrigger, HIGH);             //Send a 10us pulse to the trigger
        delayMicroseconds(10);                                //Delay
        digitalWrite(distanceMeterTrigger, LOW);              //Receive pulse
        timeMeasure = pulseIn(distanceMeterEcho, HIGH);       //Save the pulse
        distanceMeasure = 0.03434 * timeMeasure / 2;          //Convert the pulse
        BTserial.print(distanceMeasure);                      //Send to App measure of distance
        BTserial.print(",");                                  //Separator
        if (distanceMeasure < maxDistance)  //Control range of distance
        {
            digitalWrite(vibrationOut, HIGH);                 //Activate Vibration
            delay(vibrationDuration);                         //Duration of vibration
            digitalWrite(vibrationOut, LOW);                  //Deactivate Vibration 
            delay(timeMeasure / 20);                          //Set up the time of Vibration based on timeMeasure (avoid 3 If cycles)
        }
        BTserial.print(";");                                  //Separator
    }
}
