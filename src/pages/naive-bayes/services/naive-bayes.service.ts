import axiosInstanceConstant from "../../../shared/constants/axios-instance.constant.ts";

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

// respuesta esperada
export interface NaiveBayesResponse {
    prediction: number; // 0 o 1
}

export const predictNaiveBayes = async (
    data: NaiveBayesRequest
): Promise<NaiveBayesResponse> => {
    // convierte tu objeto en el array de features
    const features = [
        data.pregnancies,
        data.glucose,
        data.bloodPressure,
        data.skinThickness,
        data.insulin,
        data.bmi,
        data.diabetesPedigreeFunction,
        data.age,
    ];

    const { data: response } = await axiosInstanceConstant.post<NaiveBayesResponse>(
        '/naive-bayes/predict',
        { features }                // aquí enviamos { "features": [ ... ] }
    );
    return response;
};
