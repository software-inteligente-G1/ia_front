import axiosInstanceConstant from "../../../shared/constants/axios-instance.constant.ts";
import type {NaiveBayesRequest, NaiveBayesResponse} from "../interfaces/field-config.interface.ts";

export const predictNaiveBayes = async (
    data: NaiveBayesRequest
): Promise<NaiveBayesResponse> => {
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
        { features }
    );
    return response;
};
