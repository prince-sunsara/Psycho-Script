// Global variables for enhanced functionality
let currentStyles = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  uppercase: false,
  lowercase: false,
  capitalize: false,
  smallCaps: false,
  fontFamily: "Poppins",
  fontSize: 18,
  textColor: "#ffffff",
  backgroundColor: "#1a1a2e",
  shadowColor: "#00f5ff",
  shadowBlur: 0,
  letterSpacing: 0,
  lineHeight: 1.4,
  rotation: 0,
  scale: 1,
  currentEffect: "none",
};

let savedTemplates = [];
let discoMode = false;
let speechSynthesis = window.speechSynthesis;

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  createEnhancedParticles();
  createAnimatedCharacters();
  updatePreview();
  addVisualEffects();
  addTypingIndicator();
  addScrollEffects();
  loadSavedTemplates();

  // Welcome animation
  setTimeout(() => {
    showNotification(
      "🎉 Welcome to PsychoScript! Let's create something amazing!",
      "success"
    );
  }, 1000);

  // Add some random tips
  setTimeout(() => {
    showRandomTip();
  }, 10000);
});

// Enhanced particle system
function createEnhancedParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 75;
  const colors = [
    "#00f5ff",
    "#ff006e",
    "#39ff14",
    "#bf00ff",
    "#ff4500",
    "#ffff00",
  ];
  const sizes = ["small", "medium", "large"];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = `particle ${
      sizes[Math.floor(Math.random() * sizes.length)]
    }`;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // Add random movement direction
    if (Math.random() > 0.5) {
      particle.style.animationDirection = "reverse";
    }

    particlesContainer.appendChild(particle);
  }
}

// Animated characters system
function createAnimatedCharacters() {
  const charactersContainer = document.getElementById("characters");
  const characters = [
    "🚀",
    "✨",
    "🎨",
    "🌈",
    "💫",
    "🎭",
    "🎪",
    "🎠",
    "🎡",
    "🎢",
    "🦄",
    "🌟",
    "⭐",
    "💖",
    "💝",
    "🎁",
    "🎉",
    "🎊",
    "🎈",
    "🎀",
    "🔥",
    "❄️",
    "⚡",
    "🌙",
    "☀️",
    "🌺",
    "🌸",
    "🌼",
    "🌻",
    "🌷",
  ];

  const speeches = [
    "Amazing!",
    "So Cool!",
    "Wow!",
    "Epic!",
    "Fantastic!",
    "Love it!",
    "Brilliant!",
    "Awesome!",
    "Magic!",
    "Perfect!",
    "Super!",
    "Incredible!",
  ];

  function createCharacter() {
    const character = document.createElement("div");
    character.className = "character";
    character.textContent =
      characters[Math.floor(Math.random() * characters.length)];

    // Random starting position and properties
    character.style.left = "-100px";
    character.style.top = Math.random() * (window.innerHeight - 100) + "px";
    character.style.animationDuration = Math.random() * 6 + 8 + "s";
    character.style.animationDelay = Math.random() * 3 + "s";

    // Sometimes add speech bubble
    if (Math.random() > 0.7) {
      character.classList.add("talking");
      character.setAttribute(
        "data-speech",
        speeches[Math.floor(Math.random() * speeches.length)]
      );
    }

    charactersContainer.appendChild(character);

    // Remove after animation
    setTimeout(() => {
      if (charactersContainer.contains(character)) {
        charactersContainer.removeChild(character);
      }
    }, 15000);
  }

  // Create characters periodically
  setInterval(createCharacter, 3000);

  // Create initial characters
  for (let i = 0; i < 3; i++) {
    setTimeout(createCharacter, i * 1000);
  }
}

// Show page - Fixed version
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  const activePage = document.getElementById(pageId);
  activePage.classList.add("active");
  activePage.style.animation = "fadeIn 0.5s ease-out";

  // Update nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("onclick").includes(pageId)) {
      link.classList.add("active");
    }
  });

  // Close mobile menu if open
  document.getElementById("navLinks").classList.remove("show");
  document.getElementById("mobileMenu").classList.remove("active");

  // Scroll to top
  window.scrollTo(0, 0);
}
// Mobile menu toggle - Fixed version
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const mobileMenu = document.getElementById("mobileMenu");

  navLinks.classList.toggle("show");
  mobileMenu.classList.toggle("active");

  // Close menu when clicking a link
  if (navLinks.classList.contains("show")) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        mobileMenu.classList.remove("active");
      });
    });
  }
}

// Enhanced format toggle
function toggleFormat(formatType) {
  const btn =
    document.getElementById(formatType + "Btn") ||
    document.getElementById(formatType.replace("-", "") + "Btn");

  switch (formatType) {
    case "bold":
      currentStyles.bold = !currentStyles.bold;
      break;
    case "italic":
      currentStyles.italic = !currentStyles.italic;
      break;
    case "underline":
      currentStyles.underline = !currentStyles.underline;
      break;
    case "line-through":
      currentStyles.strikethrough = !currentStyles.strikethrough;
      break;
    case "uppercase":
      currentStyles.uppercase = !currentStyles.uppercase;
      if (currentStyles.uppercase) {
        currentStyles.lowercase = false;
        currentStyles.capitalize = false;
        document.getElementById("lowercaseBtn").classList.remove("active");
        document.getElementById("capitalizeBtn").classList.remove("active");
      }
      break;
    case "lowercase":
      currentStyles.lowercase = !currentStyles.lowercase;
      if (currentStyles.lowercase) {
        currentStyles.uppercase = false;
        currentStyles.capitalize = false;
        document.getElementById("uppercaseBtn").classList.remove("active");
        document.getElementById("capitalizeBtn").classList.remove("active");
      }
      break;
    case "capitalize":
      currentStyles.capitalize = !currentStyles.capitalize;
      if (currentStyles.capitalize) {
        currentStyles.uppercase = false;
        currentStyles.lowercase = false;
        document.getElementById("uppercaseBtn").classList.remove("active");
        document.getElementById("lowercaseBtn").classList.remove("active");
      }
      break;
    case "small-caps":
      currentStyles.smallCaps = !currentStyles.smallCaps;
      break;
  }

  btn.classList.toggle("active");
  btn.classList.add("bounce");
  setTimeout(() => btn.classList.remove("bounce"), 500);

  updatePreview();
}

// Enhanced preview update
function updatePreview() {
  const textInput = document.getElementById("textInput");
  const textPreview = document.getElementById("textPreview");

  // Update all control values
  const controls = {
    fontFamily: document.getElementById("fontFamily"),
    fontSize: document.getElementById("fontSize"),
    textColor: document.getElementById("textColor"),
    backgroundColor: document.getElementById("backgroundColor"),
    shadowColor: document.getElementById("shadowColor"),
    shadowBlur: document.getElementById("shadowBlur"),
    letterSpacing: document.getElementById("letterSpacing"),
    lineHeight: document.getElementById("lineHeight"),
    rotation: document.getElementById("rotation"),
    scale: document.getElementById("scale"),
  };

  // Update current styles
  Object.keys(controls).forEach((key) => {
    if (controls[key]) {
      currentStyles[key] = controls[key].value;
    }
  });

  // Update display values
  document.getElementById("fontSizeValue").textContent =
    currentStyles.fontSize + "px";
  document.getElementById("shadowBlurValue").textContent =
    currentStyles.shadowBlur + "px";
  document.getElementById("letterSpacingValue").textContent =
    currentStyles.letterSpacing + "px";
  document.getElementById("lineHeightValue").textContent =
    currentStyles.lineHeight;
  document.getElementById("rotationValue").textContent =
    currentStyles.rotation + "°";
  document.getElementById("scaleValue").textContent = currentStyles.scale + "x";

  // Build comprehensive style string
  let styleString = `
                font-family: '${currentStyles.fontFamily}', sans-serif;
                font-size: ${currentStyles.fontSize}px;
                color: ${currentStyles.textColor};
                background-color: ${currentStyles.backgroundColor};
                font-weight: ${currentStyles.bold ? "bold" : "normal"};
                font-style: ${currentStyles.italic ? "italic" : "normal"};
                text-decoration: ${
                  [
                    currentStyles.underline ? "underline" : "",
                    currentStyles.strikethrough ? "line-through" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || "none"
                };
                text-transform: ${
                  currentStyles.uppercase
                    ? "uppercase"
                    : currentStyles.lowercase
                    ? "lowercase"
                    : currentStyles.capitalize
                    ? "capitalize"
                    : "none"
                };
                font-variant: ${
                  currentStyles.smallCaps ? "small-caps" : "normal"
                };
                text-shadow: ${
                  currentStyles.shadowBlur > 0
                    ? `0 0 ${currentStyles.shadowBlur}px ${currentStyles.shadowColor}`
                    : "none"
                };
                letter-spacing: ${currentStyles.letterSpacing}px;
                line-height: ${currentStyles.lineHeight};
                transform: rotate(${currentStyles.rotation}deg) scale(${
    currentStyles.scale
  });
                padding: 2rem;
                border-radius: 20px;
                transition: all 0.3s ease;
                min-height: 350px;
                overflow-wrap: break-word;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            `;

  // Apply current effect
  if (currentStyles.currentEffect !== "none") {
    styleString += getEffectStyles(currentStyles.currentEffect);
  }

  textPreview.style.cssText = styleString;

  let displayText =
    textInput.value || "Your styled text will appear here like magic! ✨";

  // Apply text transformations
  if (currentStyles.uppercase) displayText = displayText.toUpperCase();
  if (currentStyles.lowercase) displayText = displayText.toLowerCase();

  textPreview.textContent = displayText;

  // Add visual feedback
  if (textInput.value) {
    textPreview.style.boxShadow = "0 0 30px rgba(0, 245, 255, 0.2)";
    textPreview.classList.add("pulse");
    setTimeout(() => textPreview.classList.remove("pulse"), 1000);
  }
}

// Apply special effects
function applyEffect(effectName) {
  currentStyles.currentEffect = effectName;

  // Show effect notification
  showNotification(`✨ Applied ${effectName} effect!`, "success");

  updatePreview();
}

// Get effect styles
function getEffectStyles(effectName) {
  switch (effectName) {
    case "rainbow":
      return `
                        background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: rainbowShift 3s linear infinite;
                    `;
    case "glow":
      return `
                        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
                        animation: glow 2s ease-in-out infinite alternate;
                    `;
    case "3d":
      return `
                        text-shadow: 
                            1px 1px 0 #ccc, 2px 2px 0 #c9c9c9, 3px 3px 0 #bbb,
                            4px 4px 0 #b9b9b9, 5px 5px 0 #aaa, 6px 6px 1px rgba(0,0,0,.1),
                            0 0 5px rgba(0,0,0,.1), 1px 1px 3px rgba(0,0,0,.3),
                            3px 3px 5px rgba(0,0,0,.2), 5px 5px 10px rgba(0,0,0,.25);
                    `;
    case "neon":
      return `
                        color: #00f5ff;
                        text-shadow: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff, 0 0 20px #00f5ff;
                    `;
    case "fire":
      return `
                        background: linear-gradient(45deg, #ff4500, #ff6347, #ffa500, #ff0000);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
                    `;
    case "ice":
      return `
                        color: #87ceeb;
                        text-shadow: 0 0 20px rgba(135, 206, 235, 0.8), 0 0 30px rgba(173, 216, 230, 0.6);
                    `;
    case "gold":
      return `
                        background: linear-gradient(45deg, #ffd700, #ffed4e, #fff200, #ffd700);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                    `;
    case "chrome":
      return `
                        background: linear-gradient(45deg, #c0c0c0, #ffffff, #c0c0c0, #a0a0a0);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                    `;
    case "gradient":
      return `
                        background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    `;
    case "outline":
      return `
                        color: transparent;
                        -webkit-text-stroke: 2px ${currentStyles.textColor};
                    `;
    default:
      return "";
  }
}

// Enhanced copy to clipboard
async function copyToClipboard() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification("🤔 No text to copy! Type something first!", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showNotification(
      "📋 Text copied successfully! Paste it anywhere!",
      "success"
    );

    // Fun animation
    document
      .querySelector(".action-btn.primary")
      .classList.add("success-state");
    setTimeout(() => {
      document
        .querySelector(".action-btn.primary")
        .classList.remove("success-state");
    }, 1000);
  } catch (err) {
    textInput.select();
    document.execCommand("copy");
    showNotification("📋 Text copied to clipboard!", "success");
  }
}

// Enhanced download functionality
function downloadText() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification(
      "🤔 No text to download! Create something first!",
      "error"
    );
    return;
  }

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const filename = `PsychoScript-${timestamp}.txt`;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("💾 File downloaded successfully!", "success");
}

// Share text functionality
async function shareText() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification("🤔 No text to share! Create something first!", "error");
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out my PsychoScript creation!",
        text: text,
        url: window.location.href,
      });
      showNotification("🚀 Shared successfully!", "success");
    } catch (err) {
      copyToClipboard(); // Fallback to copy
    }
  } else {
    copyToClipboard(); // Fallback to copy
    showNotification("🚀 Copied to clipboard for sharing!", "success");
  }
}

// Clear all functionality
function clearText() {
  if (
    confirm(
      "🗑️ Are you sure you want to clear everything? This cannot be undone!"
    )
  ) {
    document.getElementById("textInput").value = "";

    // Reset all styles to defaults
    currentStyles = {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      uppercase: false,
      lowercase: false,
      capitalize: false,
      smallCaps: false,
      fontFamily: "Poppins",
      fontSize: 18,
      textColor: "#ffffff",
      backgroundColor: "#1a1a2e",
      shadowColor: "#00f5ff",
      shadowBlur: 0,
      letterSpacing: 0,
      lineHeight: 1.4,
      rotation: 0,
      scale: 1,
      currentEffect: "none",
    };

    // Reset all controls
    document.getElementById("fontFamily").value = "Poppins";
    document.getElementById("fontSize").value = "18";
    document.getElementById("textColor").value = "#ffffff";
    document.getElementById("backgroundColor").value = "#1a1a2e";
    document.getElementById("shadowColor").value = "#00f5ff";
    document.getElementById("shadowBlur").value = "0";
    document.getElementById("letterSpacing").value = "0";
    document.getElementById("lineHeight").value = "1.4";
    document.getElementById("rotation").value = "0";
    document.getElementById("scale").value = "1";

    // Reset format buttons
    document.querySelectorAll(".format-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    updatePreview();
    showNotification(
      "🗑️ Everything cleared! Ready for new creativity!",
      "success"
    );
  }
}

// Random style generator
function randomizeStyle() {
  const fonts = [
    "Poppins",
    "Orbitron",
    "Pacifico",
    "Fredoka One",
    "Comfortaa",
    "Dancing Script",
    "Righteous",
    "Bungee",
  ];
  const colors = [
    "#ff006e",
    "#00f5ff",
    "#39ff14",
    "#bf00ff",
    "#ff4500",
    "#ffff00",
    "#ff69b4",
    "#87ceeb",
  ];
  const effects = [
    "rainbow",
    "glow",
    "3d",
    "neon",
    "fire",
    "ice",
    "gold",
    "chrome",
  ];

  // Randomize font
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  document.getElementById("fontFamily").value = randomFont;
  currentStyles.fontFamily = randomFont;

  // Randomize size
  const randomSize = Math.floor(Math.random() * 40) + 20;
  document.getElementById("fontSize").value = randomSize;
  currentStyles.fontSize = randomSize;

  // Randomize colors
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("textColor").value = randomColor;
  currentStyles.textColor = randomColor;

  // Random effect
  const randomEffect = effects[Math.floor(Math.random() * effects.length)];
  applyEffect(randomEffect);

  // Random formatting
  if (Math.random() > 0.5) {
    toggleFormat("bold");
  }
  if (Math.random() > 0.7) {
    toggleFormat("italic");
  }

  updatePreview();
  showNotification("🎲 Random style applied! Looking amazing!", "success");
}

// Save as template
function saveAsTemplate() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification("🤔 No text to save as template!", "error");
    return;
  }

  const templateName = prompt("💾 Give your template a cool name:");
  if (templateName) {
    const template = {
      name: templateName,
      text: text,
      styles: { ...currentStyles },
    };

    savedTemplates.push(template);
    localStorage.setItem(
      "psychoscript-templates",
      JSON.stringify(savedTemplates)
    );

    showNotification(
      `💾 Template "${templateName}" saved successfully!`,
      "success"
    );
  }
}

// Export as image (simplified version)
function exportAsImage() {
  showNotification(
    "🖼️ Image export feature coming soon! For now, take a screenshot!",
    "info"
  );
}

// Disco mode activation
function activateDiscoMode() {
  discoMode = !discoMode;

  if (discoMode) {
    document.body.classList.add("disco-mode");
    showNotification("🕺 DISCO MODE ACTIVATED! Party time!", "success");

    // Stop disco mode after 10 seconds
    setTimeout(() => {
      discoMode = false;
      document.body.classList.remove("disco-mode");
      showNotification(
        "🎉 Disco mode ended! Hope you enjoyed the party!",
        "info"
      );
    }, 10000);
  } else {
    document.body.classList.remove("disco-mode");
    showNotification("😎 Disco mode deactivated!", "info");
  }
}

// Show random tip
function showRandomTip() {
  const tips = [
    "💡 Try combining different effects for unique looks!",
    "🌈 Use rainbow effect with large fonts for maximum impact!",
    "✨ Experiment with shadow blur for mystical effects!",
    "🎨 Mix complementary colors for professional designs!",
    "🔥 Fire effect works great with bold fonts!",
    "❄️ Ice effect is perfect for winter themes!",
    "🎭 3D effect makes text pop off the screen!",
    "💎 Chrome effect gives a metallic look!",
    "🚀 Try rotating text for dynamic layouts!",
    "🎪 Disco mode is perfect for celebrations!",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  showNotification(randomTip, "info");
}

// Text-to-speech functionality
function textToSpeech() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification("🤔 No text to speak! Type something first!", "error");
    return;
  }

  if (speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;

    speechSynthesis.speak(utterance);
    showNotification("🗣️ Listen to your text come alive!", "success");
  } else {
    showNotification("😅 Speech not supported in this browser!", "error");
  }
}

// Show text statistics
function showStats() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;

  if (!text) {
    showNotification("🤔 No text to analyze! Type something first!", "error");
    return;
  }

  const words = text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.length > 0).length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;

  const stats = `
📊 Text Statistics:
📝 Words: ${words}
🔤 Characters: ${characters}
🔡 Characters (no spaces): ${charactersNoSpaces}
📄 Sentences: ${sentences}
📑 Paragraphs: ${paragraphs}
            `;

  alert(stats);
}

// Template loading functionality
function loadTemplate(templateType) {
  const templates = {
    rainbow: {
      text: "Rainbow Magic Text! 🌈✨",
      styles: {
        fontFamily: "Fredoka One",
        fontSize: 36,
        textColor: "#ff006e",
        backgroundColor: "#1a1a2e",
        currentEffect: "rainbow",
        bold: true,
      },
    },
    neon: {
      text: "NEON VIBES ⚡💎",
      styles: {
        fontFamily: "Orbitron",
        fontSize: 32,
        textColor: "#00f5ff",
        backgroundColor: "#0a0a0f",
        currentEffect: "neon",
        uppercase: true,
        letterSpacing: 3,
      },
    },
    "3d": {
      text: "3D EFFECT 🎭🔥",
      styles: {
        fontFamily: "Bungee",
        fontSize: 40,
        textColor: "#ff006e",
        backgroundColor: "#1a1a2e",
        currentEffect: "3d",
        bold: true,
        uppercase: true,
      },
    },
    cute: {
      text: "Cute & Fun! 🎀💖✨",
      styles: {
        fontFamily: "Fredoka One",
        fontSize: 28,
        textColor: "#ff69b4",
        backgroundColor: "#fff0f5",
        italic: true,
      },
    },
    spooky: {
      text: "SPOOKY VIBES 👻🎃",
      styles: {
        fontFamily: "Creepster",
        fontSize: 35,
        textColor: "#ff4500",
        backgroundColor: "#0a0a0a",
        currentEffect: "fire",
        uppercase: true,
      },
    },
    retro: {
      text: "RETRO STYLE 📻🕺",
      styles: {
        fontFamily: "Monoton",
        fontSize: 30,
        textColor: "#ffff00",
        backgroundColor: "#2d1b69",
        currentEffect: "glow",
        uppercase: true,
      },
    },
    elegant: {
      text: "Elegant Style ✨👑",
      styles: {
        fontFamily: "Playfair Display",
        fontSize: 32,
        textColor: "#daa520",
        backgroundColor: "#1a1a1a",
        currentEffect: "gold",
        italic: true,
      },
    },
    comic: {
      text: "COMIC POWER! 💥💢",
      styles: {
        fontFamily: "Bangers",
        fontSize: 38,
        textColor: "#ff0000",
        backgroundColor: "#ffff99",
        uppercase: true,
        bold: true,
        rotation: -3,
      },
    },
  };

  const template = templates[templateType];
  if (template) {
    // Set text
    document.getElementById("textInput").value = template.text;

    // Apply styles
    Object.assign(currentStyles, template.styles);

    // Update form controls
    document.getElementById("fontFamily").value =
      template.styles.fontFamily || "Poppins";
    document.getElementById("fontSize").value = template.styles.fontSize || 18;
    document.getElementById("textColor").value =
      template.styles.textColor || "#ffffff";
    document.getElementById("backgroundColor").value =
      template.styles.backgroundColor || "#1a1a2e";

    if (template.styles.letterSpacing !== undefined) {
      document.getElementById("letterSpacing").value =
        template.styles.letterSpacing;
    }
    if (template.styles.rotation !== undefined) {
      document.getElementById("rotation").value = template.styles.rotation;
    }

    // Reset format buttons
    document
      .querySelectorAll(".format-btn")
      .forEach((btn) => btn.classList.remove("active"));

    // Apply format buttons
    if (template.styles.bold)
      document.getElementById("boldBtn").classList.add("active");
    if (template.styles.italic)
      document.getElementById("italicBtn").classList.add("active");
    if (template.styles.underline)
      document.getElementById("underlineBtn").classList.add("active");
    if (template.styles.uppercase)
      document.getElementById("uppercaseBtn").classList.add("active");
    if (template.styles.lowercase)
      document.getElementById("lowercaseBtn").classList.add("active");

    updatePreview();
    showNotification(
      `✨ ${
        templateType.charAt(0).toUpperCase() + templateType.slice(1)
      } template loaded!`,
      "success"
    );

    // Switch to home page to see the result
    showPage("home");
  }
}

// Enhanced notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  const colors = {
    success: "#39ff14",
    error: "#ff006e",
    info: "#00f5ff",
    warning: "#ffa500",
  };

  notification.style.cssText = `
                position: fixed;
                top: 120px;
                right: 20px;
                background: ${colors[type]};
                color: #0a0a0f;
                padding: 1rem 1.5rem;
                border-radius: 15px;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                max-width: 320px;
                word-wrap: break-word;
                font-size: 0.9rem;
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
            `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0) scale(1.02)";
  }, 100);

  // Bounce effect
  setTimeout(() => {
    notification.style.transform = "translateX(0) scale(1)";
  }, 300);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 4000);
}

// Enhanced visual effects
function addVisualEffects() {
  const textEditor = document.querySelector(".text-editor");
  let mouseX = 0,
    mouseY = 0;

  textEditor.addEventListener("mousemove", function (e) {
    const rect = textEditor.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    textEditor.style.background = `
                    radial-gradient(circle at ${mouseX}px ${mouseY}px, 
                    rgba(0, 245, 255, 0.15) 0%, 
                    rgba(255, 0, 110, 0.08) 30%,
                    rgba(255, 255, 255, 0.05) 70%, 
                    rgba(255, 255, 255, 0.05) 100%)
                `;
  });

  textEditor.addEventListener("mouseleave", function () {
    textEditor.style.background = "var(--glass-bg)";
  });
}

// Typing indicator
function addTypingIndicator() {
  const textInput = document.getElementById("textInput");
  const textPreview = document.getElementById("textPreview");
  let typingTimer;

  textInput.addEventListener("input", function () {
    clearTimeout(typingTimer);

    if (!textInput.value) {
      textPreview.textContent =
        "Your styled text will appear here like magic! ✨";
      return;
    }

    textPreview.style.opacity = "0.8";
    textPreview.classList.add("pulse");

    typingTimer = setTimeout(() => {
      textPreview.style.opacity = "1";
      textPreview.classList.remove("pulse");
      updatePreview();
    }, 300);
  });
}

// Scroll effects
function addScrollEffects() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Load saved templates
function loadSavedTemplates() {
  const saved = localStorage.getItem("psychoscript-templates");
  if (saved) {
    savedTemplates = JSON.parse(saved);
  }
}

// Update navbar style based on current page
function updateNavbarStyle() {
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    const navbar = document.getElementById("navbar");
    navbar.style.borderBottom = `2px solid ${getComputedStyle(
      document.documentElement
    ).getPropertyValue("--neon-blue")}`;
  }
}

// Contact form handler
function handleContactForm(event) {
  event.preventDefault();

  // Add loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<div class="loading"></div>Sending...';
  submitBtn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    showNotification(
      "💌 Thank you for your message! We'll get back to you super soon!",
      "success"
    );
    event.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Color wheel functionality
function openColorWheel() {
  const colors = [
    "#ff006e",
    "#00f5ff",
    "#39ff14",
    "#bf00ff",
    "#ff4500",
    "#ffff00",
    "#ff69b4",
    "#87ceeb",
    "#daa520",
    "#ff1493",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById("textColor").value = randomColor;
  currentStyles.textColor = randomColor;
  updatePreview();

  showNotification("🎨 Random color applied! Looking fresh!", "success");
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    return;
  }

  if (e.ctrlKey || e.metaKey) {
    switch (e.key.toLowerCase()) {
      case "b":
        e.preventDefault();
        toggleFormat("bold");
        break;
      case "i":
        e.preventDefault();
        toggleFormat("italic");
        break;
      case "u":
        e.preventDefault();
        toggleFormat("underline");
        break;
      case "r":
        e.preventDefault();
        randomizeStyle();
        break;
      case "s":
        e.preventDefault();
        saveAsTemplate();
        break;
    }
  }
});

// Easter eggs
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Secret rainbow mode
    document.body.style.animation = "rainbowShift 2s linear infinite";
    showNotification(
      "🎉 SECRET RAINBOW MODE ACTIVATED! You found the ultimate easter egg!",
      "success"
    );

    // Create extra magical particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.textContent = ["✨", "🌟", "⭐", "💫", "🎉"][
          Math.floor(Math.random() * 5)
        ];
        particle.style.cssText = `
                            position: fixed;
                            left: ${Math.random() * 100}%;
                            top: ${Math.random() * 100}%;
                            font-size: 2rem;
                            z-index: 9999;
                            animation: bounce 2s ease-out;
                            pointer-events: none;
                        `;
        document.body.appendChild(particle);

        setTimeout(() => {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
        }, 2000);
      }, i * 100);
    }

    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);

    konamiCode = [];
  }
});

// Window resize handler
window.addEventListener("resize", function () {
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    particlesContainer.innerHTML = "";
    createEnhancedParticles();
  }
});

// Fun click effects
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("format-btn") ||
    e.target.classList.contains("effect-btn")
  ) {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
                    position: absolute;
                    left: ${e.offsetX}px;
                    top: ${e.offsetY}px;
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

    e.target.style.position = "relative";
    e.target.appendChild(ripple);

    setTimeout(() => {
      if (e.target.contains(ripple)) {
        e.target.removeChild(ripple);
      }
    }, 600);
  }
});

// Add ripple effect animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            @keyframes ripple {
                0% {
                    width: 10px;
                    height: 10px;
                    opacity: 1;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);
