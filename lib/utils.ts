import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const safeJSONParse = (data: any) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error parsing JSON', e);
        return null;
    }
};
