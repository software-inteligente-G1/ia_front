import type {EnergyInput} from "../interfaces/energy.interface.ts";

export const initialState: EnergyInput = {
    home_id: 1,
    appliance_type: 0,
    energy_consumption: 0,
    time: 12,
    date: '',
    temperature: 25,
    season: 0,
    household_size: 1
};

export const applianceLabels = [
    "Computadora", "Lavavajillas", "Refrigeradora", "Calefactor", "Luces",
    "Microondas", "Horno", "Televisor", "Lavadora"
];

export const seasonLabels = ["Primavera", "Verano", "Invierno"];
