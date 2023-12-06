import { Dictionary } from "./dictionary.model";

export class PostRecipes{
 
    title?: string;
    instructions?: Dictionary[];
    ingredients?: string[];
    equipment?: string[];
    description?: string;
    tags?: string[];
    photos_url?: FormData;
    categories?: string[];
    preperation_time?: number;
    cooking_time?: number;
    difficulty?: string;
}