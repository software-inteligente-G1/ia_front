export interface FieldConfig {
    label: string;
    name: keyof NaiveBayesRequest;
    description: string;
}

export interface NaiveBayesRequest {
    pregnancies: number;
    glucose: number;
    bloodPressure: number;
    skinThickness: number;
    insulin: number;
    bmi: number;
    diabetesPedigreeFunction: number;
    age: number;
}

export interface NaiveBayesResponse {
    prediction: number;
}
