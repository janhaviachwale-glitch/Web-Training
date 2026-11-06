const crypto = require("crypto");
const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = 3000;

// Expose only non-sensitive user information to the client.
const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
};

app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString("base64");

    res.locals.cspNonce = nonce;

    res.setHeader(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            `script-src 'self' 'nonce-${nonce}'`,
            `style-src 'self' 'nonce-${nonce}'`,
            "img-src 'self' data:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
        ].join("; ")
    );

    res.setHeader("X-Frame-Options", "DENY");

    next();
});

app.use(express.json());

/*
 * Home page
 */
app.get("/", (req, res) => {
    const initialUserData = JSON.stringify(publicUser);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>User Security Dashboard</title>
            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>
            <header class="header">
                <h1>User Security Dashboard</h1>
                <nav>
                    <a href="/">Dashboard</a>
                    <a href="/account">Account Settings</a>
                </nav>
            </header>

            <main class="container">
                <div id="app"></div>

                <section class="settings">
                    <h2>User Settings</h2>

                    <label>
                        Theme:
                        <select id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>

                    <label>
                        Language:
                        <select id="language">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </label>

                    <label>
                        Font Size:
                        <select id="fontSize">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </label>

                    <button id="save-settings">
                        Save Settings
                    </button>

                    <p id="settings-status"></p>
                </section>
            </main>

            <script nonce="${res.locals.cspNonce}">
                window.initialUser = ${initialUserData};
            </script>

            <script src="/app.js"></script>
        </body>
        </html>
    `);
});

/*
 * Profile API
 */
app.get("/api/profile", (req, res) => {
    res.json(publicUser);
});

/*
 * Settings API
 */
app.get("/api/settings", (req, res) => {
    res.json(defaultSettings);
});

app.post("/api/settings", (req, res) => {
    const incomingSettings = req.body;

    const allowedValues = {
        theme: ["light", "dark"],
        language: ["en", "fr"],
        fontSize: ["small", "medium", "large"]
    };

    if (
        !incomingSettings ||
        typeof incomingSettings !== "object" ||
        Array.isArray(incomingSettings)
    ) {
        return res.status(400).json({
            message: "Invalid settings data."
        });
    }

    const allowedKeys = Object.keys(allowedValues);

    const invalidKeys = Object.keys(incomingSettings).filter(
        (key) => !allowedKeys.includes(key)
    );

    if (
        invalidKeys.length > 0 ||
        !allowedKeys.every(
            (key) => allowedValues[key].includes(incomingSettings[key])
        )
    ) {
        return res.status(400).json({
            message: "Invalid settings values or keys."
        });
    }

    const settings = {
        theme: incomingSettings.theme,
        language: incomingSettings.language,
        fontSize: incomingSettings.fontSize
    };

    return res.json({
        message: "Settings saved successfully.",
        settings
    });
});

/*
 * Account page
 */
app.get("/account", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>Account Settings</title>

            <style nonce="${res.locals.cspNonce}">
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f4f4;
                    margin: 0;
                    padding: 40px;
                }

                .account-card {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                }

                .danger {
                    background: #c62828;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    cursor: pointer;
                    border-radius: 4px;
                }
            </style>
        </head>

        <body>
            <div class="account-card">
                <h1>Account Settings</h1>

                <p>
                    <strong>Name:</strong>
                    ${user.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${user.role}
                </p>

                <button
                    id="delete-account"
                    class="danger"
                >
                    Delete Account
                </button>

                <p id="status"></p>
            </div>

            <script nonce="${res.locals.cspNonce}">
                document
                    .getElementById("delete-account")
                    .addEventListener("click", () => {
                        document.getElementById("status").textContent =
                            "Account deletion action triggered.";
                    });
            </script>
        </body>
        </html>
    `);
});

app.use(express.static(path.join(__dirname, "..", "client")));

app.listen(PORT, () => {
    console.log(`Application running at http://localhost:${PORT}`);
});