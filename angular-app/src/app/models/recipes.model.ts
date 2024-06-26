import { Dictionary } from "./dictionary.model";
import { PhotoUrlDict } from "./photourl-dict.model";

export class Recipes{
    _id?: string
    title?: string;
    instructions?: Dictionary[];
    ingredients?: string[];
    equipment?: string[];
    tags?: string[];
    description?: string;
    category?: string[]
    photo_url?: PhotoUrlDict;
    preperation_time?: number;
    cooking_time?: number;
    difficulty?: string;
    user_id?: string;
    rating?: {
        sum: number,
        counter: number
    };
}