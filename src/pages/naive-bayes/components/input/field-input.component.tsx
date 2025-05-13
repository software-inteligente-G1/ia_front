import React from 'react';
import type {FieldConfig} from "../../interfaces/field-config.constant.ts";

interface Props {
    field: FieldConfig;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FieldInput({ field, value, onChange }: Props) {
    return (
        <div>
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
            >
                {field.label}
            </label>
            <input
                type="number"
                step="any"
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                placeholder={field.description}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            />
            <p className="mt-1 text-xs text-gray-500">{field.description}</p>
        </div>
    );
}
