#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <Adafruit_NeoPixel.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#define NUMPIXELS        24
#define PIN            14

#define SETUP_LOOP_MODE 1
#define RING_MODE 2
#define GAUGE_MODE 1

const char* ssid = "";
const char* password = "";

ESP8266WebServer server(80);
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

const int led = 13;

int animationMode = SETUP_LOOP_MODE;
int indicatorPosition = 0;
int loopDelay = 0;

int currentRed = 0;
int currentGreen = 0;
int currentBlue = 0;

int targetRed = 0;
int targetGreen = 0;
int targetBlue = 0;

void handleRoot() {
  animationMode = SETUP_LOOP_MODE;
  digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp8266!");
  digitalWrite(led, 0);
}

void handleNotFound() {
  digitalWrite(led, 1);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, 0);
}

void setup(void) {
  pixels.begin(); // This initializes the NeoPixel library.
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(255, 128, 0));
    pixels.show();
  }
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/inline", []() {
    server.send(200, "text/plain", "this works as well");
  });

  server.on("/ring", []() {
    int r = 0;
    int g = 0;
    int b = 0;
    if (server.args() == 1 && server.argName(0) == "color" && sscanf(server.arg(0).c_str(), "r%dg%db%d", &r, &g, &b) == 3) {
      if (r >= 0 && r < 256 && g >= 0 && g < 256 && b >= 0 && b < 256) {
        animationMode = RING_MODE;
        targetRed = r;
        targetGreen = g;
        targetBlue = b;
        String response = String("{r:") + r + ",g:" + g + ",b:" + b + "}";
        server.send(200, "application/json", response);
        return 0;
      }
    }
    server.send(400, "application/json", String("{error: \"wrong parameters\", expected:\"r0-255g0-255b0-255\", received:\"") + server.arg(0) + "\", decoded:\"r:" + r + ",g:" + g + ",b:" + b + "\"}");
    return 1;
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}


void ringMode() {
  if (currentRed > targetRed) {
    currentRed--;
  } else if (currentRed < targetRed) {
    currentRed++;
  }
  if (currentGreen > targetGreen) {
    currentGreen--;
  } else if (currentGreen < targetGreen) {
    currentGreen++;
  }
  if (currentBlue > targetBlue) {
    currentBlue--;
  } else if (currentBlue < targetBlue) {
    currentBlue++;
  }
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(currentRed, currentGreen, currentBlue));
    pixels.show();
  }
}

void setupLoopMode() {
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(10, 10, 10));
  }
  pixels.setPixelColor(indicatorPosition, pixels.Color(50, 0, 0));
  pixels.setPixelColor((indicatorPosition + 6) % 24, pixels.Color(50, 50, 0));
  pixels.setPixelColor((indicatorPosition + 12) % 24, pixels.Color(0, 0, 50));
  pixels.setPixelColor((indicatorPosition + 18) % 24, pixels.Color(0, 50, 0));
  pixels.show();
  if (loopDelay > 50) {
    loopDelay = 0;
    indicatorPosition = (indicatorPosition + 1) % NUMPIXELS;
  }
  loopDelay++;
}

void loop(void) {
  switch (animationMode) {
    case SETUP_LOOP_MODE:
      setupLoopMode();
      break;
    case RING_MODE:
      ringMode();
      break;
  }
  server.handleClient();
}
