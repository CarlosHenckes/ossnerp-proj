#include <ArduinoJson.h>
int sensorValue;
void setup()
{
  Serial.begin(9600);
}

void loop()
{
    sensorValue = analogRead(A0);
    String str = "{";
            str = str + "\"read\":";
            str = str + map(sensorValue, 0, 1023, 0, 190);
            str = str + "}";
    Serial.println(str);
    delay(1000);
}
