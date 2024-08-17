import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
        }

        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }

        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };


    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };


    const signin = async (req, res) => {
        console.log("in signin", req.session);
        const { username, password } = req.body;
        console.log("username", username);

        try {
            const currentUser = await dao.findUserByCredentials(username, password);

            if (currentUser) {
                // Explicitly set `req.session.currentUser`
                req.session.currentUser = currentUser;

                // Save the session explicitly
                req.session.save((err) => {
                    if (err) {
                        console.error("Error saving session:", err);
                        return res.status(500).json({ message: "Internal Server Error" });
                    }

                    // Send response after session is saved
                    res.json(currentUser);
                    console.log("current user is set", currentUser);
                });
            } else {
                res.status(401).json({ message: "Unable to login. Try again later." });
            }
        } catch (err) {
            console.error("Error during sign-in:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    const signout = (req, res) => {
        console.log("Session before destroy:", req.session);
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Failed to sign out." });
            }
            res.clearCookie("connect.sid", { path: '/' }); // Clear the session cookie
            res.sendStatus(200);
            console.log("Session after destroy:", req.session);
        });
    };


    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.get("/api/users/profile", profile);
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
}
