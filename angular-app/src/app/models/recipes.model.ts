import { Dictionary } from "./dictionary.model";

export class Recipes{
    title?: string;
    instructions?: Dictionary[];
    ingredients?: string[];
    equipment?: string[];
    tags?: string[];
    photos_urls?: string;
    video_url?: string;
    preperation_time?: number;
    cooking_time?: number;
    difficulty?: string;
}