export interface EnergyInput {
    home_id: number;
    appliance_type: number;
    energy_consumption: number;
    time: number;
    date: string;
    temperature: number;
    season: number;
    household_size: number;
}

export interface EnergyOutput {
    predicted_kwh: number;
    daily: number;
    weekly: number;
    monthly: number;
    category: string;
}
