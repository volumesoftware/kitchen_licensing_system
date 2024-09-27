
export interface Ingredients {
    id?: string;
    ingredientName?: string;
    ingredientType?: "SOLID" | "LIQUID" | "GRANULAR"
    imageFilePath?: string;
    prepNotice?: string;
    stockLevel?: "LOW" | "MEDIUM" | "HIGH";
    column?: number;
    row?: number;
    coordinateZ?: number;
}