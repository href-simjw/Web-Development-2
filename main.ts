type Unit = "kg" | "lb" | "mi" | "km" | "C" | "F";
 
/** A conversion function accepts one number or an array of numbers. */
type Converter = {
    (value: number): number;
    (value: number[]): number[];
};
 
// Formulas for each supported (from -> to) pair.
const formulas: Record<string, (n: number) => number> = {
    "kg->lb": (kg) => kg * 2.20462,
    "lb->kg": (lb) => lb / 2.20462,
    "mi->km": (mi) => mi * 1.609344,
    "km->mi": (km) => km / 1.609344,
    "C->F": (c) => (c * 9) / 5 + 32,
    "F->C": (f) => ((f - 32) * 5) / 9,
};
 
/**
 * Higher-order function: returns a conversion function for the given units.
 * Throws an Error if the pair of units is not supported.
 */
const createConverter = (from: Unit, to: Unit): Converter => {
    const formula = formulas[`${from}->${to}`];
    if (!formula) {
        throw new Error(`Unsupported conversion: ${from} to ${to}`);
    }
 
    // Arrow function that handles a single value or an array of values.
    const convert = (value: number | number[]): number | number[] =>
        Array.isArray(value) ? value.map((n) => formula(n)) : formula(value);
 
    return convert as Converter;
};
 
// Tab switching

const tabButtons = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
const tabPanels = document.querySelectorAll<HTMLElement>("[data-panel]");
 
const activeClasses = ["bg-blue-600", "text-white"];
const inactiveClasses = ["text-slate-600", "hover:bg-slate-100"];
 
/** Shows the panel that matches tabName and highlights its button. */
const showTab = (tabName: string): void => {
    tabPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset["panel"] !== tabName);
    });
    tabButtons.forEach((button) => {
        const isActive = button.dataset["tab"] === tabName;
        button.classList.remove(...(isActive ? inactiveClasses : activeClasses));
        button.classList.add(...(isActive ? activeClasses : inactiveClasses));
    });
};
 
tabButtons.forEach((button) => {
    button.addEventListener("click", () => showTab(button.dataset["tab"] ?? "weight"));
});
showTab("weight");
 
// Input parsing
 
/**
 * Turns text like "5" or "1, 2.5  3" into numbers.
 * Returns null if the text is empty or any entry is not a valid number.
 */
const parseValues = (text: string): number[] | null => {
    const parts = text.split(/[\s,]+/).filter((part) => part !== "");
    if (parts.length === 0) return null;
    const numbers = parts.map(Number);
    return numbers.some((n) => Number.isNaN(n)) ? null : numbers;
};
 
/** Rounds to 2 decimals and avoids "-0.00". */
const format = (n: number): string => {
    const text = n.toFixed(2);
    return text === "-0.00" ? "0.00" : text;
};
 
// Forms
 
const forms = document.querySelectorAll<HTMLFormElement>("form[data-form]");
 
forms.forEach((form) => {
    const directionSelect = form.querySelector<HTMLSelectElement>("[data-direction]")!;
    const valueInput = form.querySelector<HTMLInputElement>("[data-input]")!;
    const resultBox = form.querySelector<HTMLElement>("[data-result]")!;
    const errorText = form.querySelector<HTMLElement>("[data-error]")!;
 
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        errorText.textContent = "";
        resultBox.textContent = "";
 
        const values = parseValues(valueInput.value);
        if (values === null) {
            errorText.textContent = "Please enter a number, or numbers separated by commas.";
            return;
        }
 
        // Direction value looks like "kg-lb"
        const [from, to] = directionSelect.value.split("-") as [Unit, Unit];
        const convert = createConverter(from, to);
        const results = convert(values);
 
        // Show "10 kg = 22.05 lb" for each value, one per line.
        resultBox.textContent = results
            .map((r, i) => `${values[i]} ${from} = ${format(r)} ${to}`)
            .join("\n");
    });
});
