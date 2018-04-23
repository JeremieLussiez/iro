const currentDate = new Date();

const gaugeMessage = {
  "payload": {
    "type": "gauge",
    "value": 0.75,
    "background": {
      "r": 32,
      "g": 32,
      "b": 32
    },
    "gradient": {
      "end": {
        "r": 0,
        "g": 127,
        "b": 255
      },
      "start": {
        "r": 255,
        "g": 127,
        "b": 0
      }
    }
  },
  "duration": 10,
  "text": "Look ! A Gauge !",
  "date": currentDate,
  "to": "IRO00001",
  "from": "Loots"
};

const rainbowMessage = {
  "payload": {
    "type": "rainbow",
    "speed": 1,
  },
  "duration": -1,
  "text": "Look ! A Rainbow !",
  "date": new Date(currentDate.getTime() + 20000),
  "to": "IRO00001",
  "from": "RPGWanderer"
};

module.exports = {
  gaugeMessage,
  rainbowMessage
};
