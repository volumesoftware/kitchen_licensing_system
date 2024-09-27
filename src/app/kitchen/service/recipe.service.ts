import { Injectable } from '@angular/core';
import { Recipe } from "../api/recipe";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore/collection/collection";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private firestorePath = '/recipes';
  recipesCollection: AngularFirestoreCollection<Recipe> = null;

  constructor(private firestore: AngularFirestore) {
    this.recipesCollection = this.firestore.collection(this.firestorePath);
  }

  create(recipe: Recipe): Promise<DocumentReference<Recipe>> {
    return this.recipesCollection.add(recipe);
  }

  update(key: string, value: Recipe): Promise<void> {
    return this.recipesCollection.doc(key).set(value);
  }

  delete(key: string): Promise<void> {
    return this.recipesCollection.doc(key).delete();
  }

  getAll() {
    console.log('Get All');
    return this.recipesCollection;
  }


}
