// Create debounced function first
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    try {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    } catch (error) {
      console.warn("Error in debounced function:", error);
    }
  };
};

// Function to load fonts dynamically
function loadFont(fontName) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}&display=swap`;
  document.head.appendChild(link);
}

// Function to update theme selector
function updateThemeSelector(theme) {
  try {
    const selector = document.getElementById("themeSelector");
    if (selector && selector.value !== theme) {
      selector.value = theme;
    }
  } catch (error) {
    console.warn("Error updating theme selector:", error);
  }
}

// Function to set theme
function setTheme(theme) {
  const root = document.documentElement;

  // Remove all theme classes
  root.classList.remove(
    "theme-blue",
    "theme-green",
    "theme-matrix",
    "theme-dark",
    "theme-cyberpunk",
  );
  root.classList.remove("font-default", "font-matrix", "font-cyberpunk");

  // Add new theme class
  root.classList.add(`theme-${theme}`);

  // Update selector
  updateThemeSelector(theme);

  // Handle special fonts
  if (theme === "matrix") {
    root.classList.add("font-matrix");
    loadFont("Share+Tech+Mono");
  } else if (theme === "cyberpunk") {
    root.classList.add("font-cyberpunk");
    loadFont("Orbitron:wght@400;500;700");
  } else {
    root.classList.add("font-default");
  }
}

// Create debounced theme setter
const debouncedSetTheme = debounce(setTheme, 100);

// Create a safe theme setting function
function applyTheme(theme) {
  try {
    if (typeof debouncedSetTheme === "function") {
      debouncedSetTheme(theme);
    } else {
      setTheme(theme);
    }
  } catch (error) {
    console.warn("Error applying theme:", error);
    setTheme("blue");
  }
}

// Add event listener for theme selector
document.addEventListener("DOMContentLoaded", () => {
  const styleSelector = document.querySelector(".style-selector");
  const themeOptions = document.querySelectorAll(".theme-option");

  if (styleSelector) {
    // Toggle expanded state on click
    styleSelector.addEventListener("click", (e) => {
      if (!e.target.classList.contains("theme-option")) {
        styleSelector.classList.toggle("expanded");
      }
    });

    // Handle theme option clicks
    themeOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        const theme = e.target.dataset.theme;
        applyTheme(theme);
        styleSelector.classList.remove("expanded");

        // Update active state
        themeOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
      });
    });
  }

  // Set initial theme based on system preference
  const initialTheme = detectSystemTheme();
  applyTheme(initialTheme);

  // Set initial active theme option
  const initialOption = document.querySelector(
    `.theme-option[data-theme="${initialTheme}"]`,
  );
  if (initialOption) {
    initialOption.classList.add("active");
  }
});

// Function to detect system color scheme
function detectSystemTheme() {
  try {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "blue";
  } catch (error) {
    console.warn("Error detecting system theme:", error);
    return "blue";
  }
}

try {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (mediaQuery) {
    mediaQuery.addEventListener("change", (e) => {
      try {
        applyTheme(e.matches ? "dark" : "blue");
      } catch (error) {
        console.warn("Error handling theme change:", error);
      }
    });
  }
} catch (error) {
  console.warn("Error setting up theme change listener:", error);
}
