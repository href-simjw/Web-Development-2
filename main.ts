const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const milesToKilometres = (miles: number): number => miles * 1.609344;
const litresToGallons = (litres: number): number => litres * 0.264172;

const kgInput = document.getElementById("kg-input") as HTMLInputElement;
const kgButton = document.getElementById("kg-button") as HTMLButtonElement;
const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;
const handleKgConvert = (): void => {
    const kilograms: number = Number(kgInput.value);
    const pounds: number = kilogramsToPounds(kilograms);
    kgResult.textContent = pounds.toFixed(2);
};
kgButton.addEventListener("click", handleKgConvert)

const milesInput = document.getElementById("miles-input") as HTMLInputElement;
const milesButton = document.getElementById("miles-button") as HTMLButtonElement;
const milesResult = document.getElementById("miles-result") as HTMLParagraphElement;
const handleMilesConvert = (): void => {
    const miles: number = Number(milesInput.value);
    const kilometres: number = milesToKilometres(miles);
    milesResult.textContent = kilometres.toFixed(2);
};
milesButton.addEventListener("click", handleMilesConvert);  

const litresInput = document.getElementById("litres-input") as HTMLInputElement;
const litresButton = document.getElementById("litres-button") as HTMLButtonElement;
const litresResult = document.getElementById("litres-result") as HTMLParagraphElement;
const handleLitresConvert = (): void => {
    const litres: number = Number(litresInput.value);
    const gallons: number = litresToGallons(litres);
    litresResult.textContent = gallons.toFixed(2);
};
litresButton.addEventListener("click", handleLitresConvert);