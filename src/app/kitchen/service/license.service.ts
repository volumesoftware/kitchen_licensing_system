import { Injectable } from '@angular/core';
import { License } from "../api/license";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore/collection/collection";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root'
})
export class LicenseService {
    private firestorePath = '/licenses';
    licensesCollection: AngularFirestoreCollection<License> = null;

    constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
        this.licensesCollection = this.firestore.collection(this.firestorePath);
    }

    create(license: License): Promise<DocumentReference<License>> {
        return this.licensesCollection.add(license);
    }

    update(key: string, value: License): Promise<void> {
        return this.licensesCollection.doc(key).set(value);
    }

    delete(key: string): Promise<void> {
        return this.licensesCollection.doc(key).delete();
    }

    getAll() {
        console.log('Get All');
        return this.licensesCollection;
    }

    
}
