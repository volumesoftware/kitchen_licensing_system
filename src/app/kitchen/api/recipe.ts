export interface Recipe {
    id?: string;
    recipeName?: string;
    author?: string;
    imageFilePath?: string;
    typeHandler?: "Stri Fry" | "Deep Fry"
    workSpaceData?: string;
    v6Instruction?: string;
    estimatedTimeCompletion?: number;
    rating?: number;
    cookCount?: number;
    portion?: number;
}