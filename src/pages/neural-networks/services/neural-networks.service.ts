import axiosInstanceConstant from '../../../shared/constants/axios-instance.constant.ts';
import type {EnergyInput, EnergyOutput} from "../interfaces/energy.interface.ts";

export const predictNeuralNetwork = async (
    data: EnergyInput
): Promise<EnergyOutput> => {
    const { data: response } = await axiosInstanceConstant.post<EnergyOutput>(
        '/energy/predict',
        data
    );
    return response;
};
