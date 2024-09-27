import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore/collection/collection";
import { Ingredients } from '../api/ingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private firestorePath = '/ingredients';
  ingredientsCollection: AngularFirestoreCollection<Ingredients> = null;

  constructor(private firestore: AngularFirestore) {
    this.ingredientsCollection = this.firestore.collection(this.firestorePath);
  }

  create(ingredient: Ingredients): Promise<DocumentReference<Ingredients>> {
    return this.ingredientsCollection.add(ingredient);
  }

  update(key: string, value: Ingredients): Promise<void> {
    return this.ingredientsCollection.doc(key).set(value);
  }

  delete(key: string): Promise<void> {
    return this.ingredientsCollection.doc(key).delete();
  }

  getAll() {
    console.log('Get All');
    return this.ingredientsCollection;
  }

}
