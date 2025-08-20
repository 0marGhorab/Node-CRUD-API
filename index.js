const HTTP = require("http");
const users = require("./dp");

HTTP.createServer((req, res) => {
  const { url, method } = req;

  // ---------------- HOME ----------------
  if (url === "/" && method === "GET") {
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        message: "ALL USERS",
        users: users,
        count: users.length,
        status: 200,
      })
    );
  }

  // ---------------- REGISTER (CREATE) ----------------
  if (url === "/register" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const isEmailExist = users.find((user) => user.email === data.email);
        if (isEmailExist) {
          res.statusCode = 409;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "email already exist" }));
        }

        users.push(data);
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "user added successfully" }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
    return;
  }

  // ---------------- UPDATE (PUT) ----------------
  if (url.startsWith("/update/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "user not found" }));
        }

        users[userIndex] = { ...users[userIndex], ...data };
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "user updated successfully",
            user: users[userIndex],
          })
        );
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
    return;
  }

  // ---------------- DELETE ----------------
  if (url.startsWith("/delete/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: "user not found" }));
    }

    users.splice(userIndex, 1);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "user deleted successfully" }));
    return;
  }

  // ---------------- NOT FOUND ----------------
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("404 not found");
}).listen(5050, () => {
  console.log("✅ Server is running on http://localhost:5050");
});
