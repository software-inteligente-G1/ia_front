import type {FieldConfig} from "../interfaces/field-config.constant.ts";

export const fields: FieldConfig[] = [
    {
        label: 'Embarazos',
        name: 'pregnancies',
        description: 'Número de embarazos previos',
    },
    {
        label: 'Glucosa',
        name: 'glucose',
        description: 'Nivel de glucosa en sangre (mg/dL)',
    },
    {
        label: 'Presión arterial',
        name: 'bloodPressure',
        description: 'Presión diastólica (mm Hg)',
    },
    {
        label: 'Grosor de la piel',
        name: 'skinThickness',
        description: 'Espesor del pliegue cutáneo (mm)',
    },
    {
        label: 'Insulina',
        name: 'insulin',
        description: 'Nivel de insulina sérica (µU/mL)',
    },
    {
        label: 'IMC',
        name: 'bmi',
        description: 'Índice de masa corporal (kg/m²)',
    },
    {
        label: 'Función de Diabetes',
        name: 'diabetesPedigreeFunction',
        description: 'Historial familiar de diabetes (0–2)',
    },
    {
        label: 'Edad',
        name: 'age',
        description: 'Edad del paciente (años)',
    },
];
