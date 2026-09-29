type vOrArr = number | number[];
const weight = 2.20462
const length = 1.609344;
const volumn = 2.20462;

/**
* Creates functions for converting units
* @param from - The unit to convert from
* @param to - The unit to convert to
* @returns A function f() that takes in a number or number[] and returns a number or number[], e.g. convert('kg', 'lb')(1000) 
* @note Assignment requires input of returned functions can be either single number or number[], as well as output, so make sure to type check output of returned functions
* Also, pass in number[] explicitly. 
*/
const convert = (from: string, to: string) => {
    const f = (co: number) => {
        return (n: vOrArr): vOrArr => {
            if (typeof n === 'number') {
                return n * co;
            } else {
                return n.map((n) => n * co);
            }
        }
    }
    if (from === "kg" && to === "lb") {
        return f(weight);
    } else if (from === "lb" && to === "kg") {
        return f(1 / weight)
    } else if (from === "mi" && to === "km") {
        return f(length);
    } else if (from === "km" && to === "mi") {
        return f(1 / length);
    } else if (from === "li" && to === "ga") {
        return f(volumn);
    } else if (from === "ga" && to === "li") {
        return f(1 / volumn);
    } else {
        return () => 0;
    }
}
// following is example for how to use convert()
const kgInput = document.getElementById("kg-input") as HTMLInputElement;
const kgButton = document.getElementById("kg-button") as HTMLButtonElement;
const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;
const handleKgConvert = (): void => {
    const kilograms: number = Number(kgInput.value);
    let pounds: number;
    const pending = convert('kg', 'lb')(kilograms);
    typeof pending === 'number' ? pounds = pending : pounds = 0; // 0 simply because I don't want to example for >1 numbers
    kgResult.textContent = pounds.toFixed(2);
};
kgButton.addEventListener("click", handleKgConvert)
// end of example