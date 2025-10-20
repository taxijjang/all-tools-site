const qs = (selector) => document.querySelector(selector);

const base64Input = qs("#base64-input");
const base64Output = qs("#base64-output");
const encodeButton = qs("#btn-encode");
const decodeButton = qs("#btn-decode");
const swapButton = qs("#btn-swap");
const base64Status = qs("#base64-status");

const jsonInput = qs("#json-input");
const jsonOutput = qs("#json-output");
const jsonFormatButton = qs("#btn-json-format");
const jsonMinifyButton = qs("#btn-json-minify");
const jsonCopyButton = qs("#btn-json-copy");
const jsonStatus = qs("#json-status");

const colorInput = qs("#color-picker-input");
const colorDisplay = qs("#color-display");
const colorHex = qs("#color-hex");
const colorRgb = qs("#color-rgb");
const colorCopyButton = qs("#btn-color-copy");
const colorStatus = qs("#color-status");

const year = qs("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const showStatus = (element, message, isError = false) => {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("error", isError);
  if (message) {
    setTimeout(() => {
      element.textContent = "";
      element.classList.remove("error");
    }, 4000);
  }
};

const handleBase64 = () => {
  if (!base64Input || !base64Output) return;

  encodeButton?.addEventListener("click", () => {
    try {
      base64Output.value = window.btoa(base64Input.value);
      showStatus(base64Status, "Encoded successfully");
    } catch (error) {
      showStatus(base64Status, "Encoding failed: invalid input.", true);
    }
  });

  decodeButton?.addEventListener("click", () => {
    try {
      base64Output.value = window.atob(base64Input.value);
      showStatus(base64Status, "Decoded successfully");
    } catch (error) {
      showStatus(base64Status, "Decoding failed: not valid Base64.", true);
    }
  });

  swapButton?.addEventListener("click", () => {
    const temp = base64Input.value;
    base64Input.value = base64Output.value;
    base64Output.value = temp;
    showStatus(base64Status, "Swapped input/output");
  });
};

const handleJson = () => {
  if (!jsonInput || !jsonOutput) return;

  const parseJson = () => {
    try {
      return JSON.parse(jsonInput.value);
    } catch (error) {
      throw new Error("Invalid JSON");
    }
  };

  jsonFormatButton?.addEventListener("click", () => {
    try {
      const formatted = JSON.stringify(parseJson(), null, 2);
      jsonOutput.value = formatted;
      showStatus(jsonStatus, "JSON formatted");
    } catch (error) {
      showStatus(jsonStatus, "Formatting failed: invalid JSON.", true);
    }
  });

  jsonMinifyButton?.addEventListener("click", () => {
    try {
      const minified = JSON.stringify(parseJson());
      jsonOutput.value = minified;
      showStatus(jsonStatus, "JSON minified");
    } catch (error) {
      showStatus(jsonStatus, "Minify failed: invalid JSON.", true);
    }
  });

  jsonCopyButton?.addEventListener("click", async () => {
    if (!jsonOutput.value) {
      showStatus(jsonStatus, "Nothing to copy.", true);
      return;
    }
    try {
      await navigator.clipboard.writeText(jsonOutput.value);
      showStatus(jsonStatus, "Copied to clipboard");
    } catch (error) {
      showStatus(jsonStatus, "Clipboard not available.", true);
    }
  });
};

const handleColor = () => {
  if (!colorInput || !colorDisplay || !colorHex || !colorRgb) return;

  const updateColor = (hex) => {
    colorDisplay.style.background = hex;
    colorHex.textContent = hex;
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    colorRgb.textContent = `${r}, ${g}, ${b}`;
  };

  colorInput.addEventListener("input", (event) => {
    updateColor(event.target.value);
  });

  colorCopyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(colorHex.textContent);
      showStatus(colorStatus, "Color HEX copied");
    } catch (error) {
      showStatus(colorStatus, "Clipboard not available.", true);
    }
  });

  updateColor(colorInput.value);
};

const setupShortcuts = () => {
  const page = document.body.dataset.page || "landing";
  const prefix = page === "landing" ? "." : "..";
  const routes = {
    b: `${prefix}/tools/base64.html`,
    j: `${prefix}/tools/json.html`,
    k: `${prefix}/tools/color.html`,
    h: `${prefix}/index.html`,
  };

  const focusHandlers = {
    landing: () => qs(".hero-actions a")?.focus(),
    base64: () => base64Input?.focus(),
    json: () => jsonInput?.focus(),
    color: () => colorInput?.focus(),
  };

  document.addEventListener("keydown", (event) => {
    if (!event.ctrlKey) return;
    const key = event.key.toLowerCase();
    const target = routes[key];
    if (!target) return;
    event.preventDefault();

    const resolved = new URL(target, window.location.href);
    if (resolved.pathname === window.location.pathname) {
      focusHandlers[page]?.();
      return;
    }

    window.location.href = resolved.href;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleBase64();
  handleJson();
  handleColor();
  setupShortcuts();
});
