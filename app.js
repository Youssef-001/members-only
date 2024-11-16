let express = require("express");
let path = require("path");

const db = require("./db/queries");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const PgSession = require("connect-pg-simple")(session);
const messageController = require("./controllers/messageController");
const authenticationHandler = require("./controllers/authenticationHandler");

let app = express();
app.use(express.urlencoded({ extended: false }));

let memberController = require("./controllers/memberController");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let pool = require("./db/pool");

app.use(
  session({
    store: new PgSession({
      pool: pool, // Connection pool
      tableName: "session", // Optional: defaults to 'session'
    }),
    secret: "your-secret-key", // Change this to a secure key
    resave: false, // Recommended setting
    saveUninitialized: false, // Recommended setting
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);
app.use(passport.initialize());
app.use(passport.session()); // Enable persistent login sessions
app.use(express.static("public"));
app.get("/", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/message-board");
  else res.redirect("/login");
});

app.get("/new-message", (req, res) => {
  res.render("createMessage");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});
app.get("/login", (req, res) => res.render("login"));

app.get("/message-board", async (req, res, next) => {
  messageController.getMessages(req, res);
});
app.post("/create-message", (req, res) => {
  messageController.createMessage(req, res);
});

app.post("/sign-up", (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      else {
        req.body.password = hashedPassword;
        memberController.addMember(req, res);
        res.redirect("/");
      }
    });
  } catch (err) {
    return next(err);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await db.getUserByEmail(email);
        console.log("user is: ", user);
        console.log("hello");

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = db.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/success", (req, res) => res.render("success"));
app.get("/fail", (req, res) => res.render("fail"));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/message-board",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, (req, res) => {});
