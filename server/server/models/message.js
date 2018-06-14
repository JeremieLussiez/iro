const maxMessageTimelineBacklog = 10000;

module.exports = function (Message) {

  Message.beforeRemote('latest', function (ctx, messageModelInstance, next) {
    const User = Message.app.models.user;
    const {
      accessToken,
    } = ctx.req;
    const {
      serialNumber,
    } = ctx.args;

    if (!accessToken) {
      const error = new Error('You are not authenticated !');
      error.statusCode = 401;
      error.name = 'authenticationRequired';
      delete error.stack;
      next(error);
    }

    if (serialNumber) {
      User.findOne({
        where: {
          id: accessToken.userId,
        },
      }).then((user) => {
        if (user.irosIds.find(iroSerialNumber => iroSerialNumber === serialNumber)) {
          next();
        } else {
          console.log(user.email, 'is not allowed to retrieve messages for', serialNumber);
          const error = new Error('This is not your IRO !');
          error.statusCode = 403;
          error.name = 'youAreNotThisIRO';
          delete error.stack;
          next(error);
        }
      });
    } else {
      next();
    }
  });

  Message.latest = (serialNumber, date, answer) => {
    console.log('Requesting latest message for', serialNumber, 'since', date);
    const currentDate = new Date();
    const conditions = [
      {
        to: serialNumber,
      },
      {
        date: {
          lt: currentDate,
        },
      },
      {
        date: {
          gt: new Date(currentDate.getTime() - maxMessageTimelineBacklog)
        },
      },
    ];

    if (date) {
      conditions.push({
        date: {
          gt: date,
        },
      });
    }

    Message.findOne({
      where: {
        and: conditions,
      },
    }).then((latestMessage) => {
      console.log('This is the latest message for', serialNumber, ':', JSON.stringify(latestMessage));
      answer(null, latestMessage);
    }, (error) => {
      console.error('ERROR', error);
      answer(null);
    });

  };

  Message.remoteMethod('latest', {
    description: 'Return the latest message for IRO to consume',
    accepts: [
      {
        arg: 'serialNumber',
        type: 'string',
        required: true,
      },
      {
        arg: 'date',
        type: 'date',
      },
    ],
    returns: {
      type: 'message',
      root: true,
    },
    http: {
      verb: 'get',
      path: '/latest',
    },
  });
};
