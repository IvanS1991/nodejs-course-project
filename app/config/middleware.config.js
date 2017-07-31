const url = require('url');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const attach = (app, passport) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'ala bala',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    const current = req.session.current = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl,
    });

    if (current !== req.session.firstReferer
      && current !== req.session.lastReferer) {
        req.session.firstReferer = req.session.lastReferer || current;
        req.session.lastReferer = req.headers.referer;
      }

    next();
  });
};

module.exports = attach;
