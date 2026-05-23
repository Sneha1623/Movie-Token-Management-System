const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "www");
const entries = ["index.html", "html", "css", "js", "images"];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const entry of entries) {
    const source = path.join(root, entry);
    const target = path.join(output, entry);

    if (fs.existsSync(source)) {
        fs.cpSync(source, target, { recursive: true });
    }
}

console.log("Prepared Capacitor web assets in www");
