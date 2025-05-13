import type {NaiveBayesRequest} from "../services/naive-bayes.service.ts";

export interface FieldConfig {
    label: string;
    name: keyof NaiveBayesRequest;
    description: string;
}
