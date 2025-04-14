

export interface RecipeInterface {
  id: number
  categoryId: number,
  name: string;
  preparationTime: number;
  portions: number;
  preparationMode: string;
  ingredients: string;
  createdAt: Date
  updatedAt: Date;
}
