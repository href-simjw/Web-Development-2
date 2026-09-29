/**
 * Program Description: Advanced Unit Converter Application
 * Program Details: Converts between metric and imperial units (Weight, Distance, Temperature)
 * Inputs: Single numbers or array lists of numbers provided via text inputs
 * Processing: Higher-order functions returning arrow functions to perform numeric conversions
 * Outputs: Formatted strings or array lists of rounded converted values
 */

// ==================================
// SECTION 1: HIGHER-ORDER CONVERSION
// ==================================

/**
 * Higher-order function that takes 'from' and 'to' unit identifiers 
 * and returns an arrow function capable of converting a single value or an array of values.
 */
type ConversionFn = (values: number | number[]) => number | number[];

const createConverter = (fromUnit: string, toUnit: string): ConversionFn => {
  // Returns an arrow function handling single or array inputs
  return (input: number | number[]): number | number[] => {
    
    // Core math logic based on requested conversion path
    const convertValue = (val: number): number => {
      const key = `${fromUnit.toLowerCase()}-to-${toUnit.toLowerCase()}`;
      
      switch (key) {
        case "lb-to-kg": return val * 0.45359237;
        case "kg-to-lb": return val / 0.45359237;
        case "mi-to-km": return val * 1.609344;
        case "km-to-mi": return val / 1.609344;
        case "c-to-f": return (val * 9/5) + 32;
        case "f-to-c": return (val - 32) * 5/9;
        default: throw new Error(`Unsupported conversion: ${fromUnit} to ${toUnit}`);
      }
    };

    // Handle array input vs single value input
    if (Array.isArray(input)) {
      return input.map(val => Number(convertValue(val).toFixed(2)));
    }
    return Number(convertValue(input).toFixed(2));
  };
};

// ==============================
// SECTION 2: UI TAB SWITCH LOGIC
// ==============================

const tabs = [
  { button: document.getElementById("tab-weight") as HTMLButtonElement, panel: document.getElementById("panel-weight") as HTMLElement, activeColor: "text-blue-600" },
  { button: document.getElementById("tab-distance") as HTMLButtonElement, panel: document.getElementById("panel-distance") as HTMLElement, activeColor: "text-emerald-600" },
  { button: document.getElementById("tab-temperature") as HTMLButtonElement, panel: document.getElementById("panel-temperature") as HTMLElement, activeColor: "text-violet-600" }
];

tabs.forEach(({ button, panel, activeColor }) => {
  button.addEventListener("click", () => {
    tabs.forEach(t => {
      t.panel.classList.add("hidden");
      t.button.className = "tab-btn px-4 py-1.5 rounded-lg text-sm font-medium transition text-slate-600 hover:text-slate-900";
    });

    panel.classList.remove("hidden");
    button.className = `tab-btn px-4 py-1.5 rounded-lg text-sm font-medium transition bg-white shadow-sm ${activeColor}`;
  });
});

// ===========================================
// SECTION 3: HELPER FUNCTIONS / FORM HANDLERS
// ===========================================

// Parse input string into a single number or an array of numbers
const parseInputData = (rawText: string): number | number[] => {
  if (rawText.includes(",")) {
    return rawText.split(",").map(item => Number(item.trim())).filter(num => !isNaN(num));
  }
  return Number(rawText.trim());
};

// Attach form submit processing
const bindFormHandler = (formId: string, directionSelectId: string, inputId: string, outputId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement;
  const directionSelect = document.getElementById(directionSelectId) as HTMLSelectElement;
  const inputEl = document.getElementById(inputId) as HTMLInputElement;
  const outputEl = document.getElementById(outputId) as HTMLElement;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const rawVal = inputEl.value;
    const parsedVal = parseInputData(rawVal);

    if (Array.isArray(parsedVal) && parsedVal.length === 0) {
      outputEl.textContent = "Error: Invalid array input";
      return;
    } else if (typeof parsedVal === "number" && isNaN(parsedVal)) {
      outputEl.textContent = "Error: Invalid number";
      return;
    }

    const [fromUnit, , toUnit] = directionSelect.value.split("-");
    if (fromUnit === undefined || toUnit === undefined) {
      outputEl.textContent = "Error: Invalid conversion direction";
      return;
    }
    const converter = createConverter(fromUnit, toUnit);
    const result = converter(parsedVal);

    outputEl.textContent = Array.isArray(result) ? `[ ${result.join(", ")} ]` : String(result);
  });
};

// Bind forms for each tab
bindFormHandler("form-weight", "weight-direction", "weight-input", "weight-output");
bindFormHandler("form-distance", "distance-direction", "distance-input", "distance-output");
bindFormHandler("form-temperature", "temp-direction", "temp-input", "temp-output");