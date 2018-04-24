const char* host = "www.my-iro.com";
const int httpsPort = 443;
const char* fingerprint = "02 30 85 ab 67 44 c4 09 d2 4d c3 df 07 03 fd 7f 8b f3 18 6a";

String authenticationURL = "/api/users/login";
String messagesURL = "/api/messages/latest";

WiFiClientSecure client;

client.setTimeout(100);
  if (!client.connect(host, httpsPort)) {
    Serial.println("connection failed");
    return;
  }

  if (client.verify(fingerprint, host)) {
    Serial.println("certificate matches");
  } else {
    Serial.println("certificate doesn't match");
  }

  Serial.print("requesting URL: ");
  Serial.println(url);

  client.print(String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Content-Type: application/json\r\n" +
               "Content-Length: 64\r\n\r\n" +
               "{\"email\": \"jeremie.lussiez@gmail.com\", \"password\": \"opensesame\"}\r\n");

  Serial.println("request sent");
  while (client.connected()) {
    Serial.println("Connected");
    String line = client.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }
  Serial.println("reading response...");
  String line = client.readStringUntil('\n');
  Serial.println("response read");
  if (line.startsWith("{\"state\":\"success\"")) {
    Serial.println("esp8266/Arduino CI successfull!");
  } else {
    Serial.println("esp8266/Arduino CI has failed");
  }
  Serial.println("reply was:");
  Serial.println("==========");
  Serial.println(line);
  Serial.println("==========");
  Serial.println("closing connection");
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(255, 127, 0));
  }
  pixels.show();
  delay(100);