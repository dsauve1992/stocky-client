import {firestore} from "firebase";

export default class FollowedSymbolRepository {
    private collectionRef : firestore.CollectionReference<any>

    constructor() {
        this.collectionRef = firestore().collection('followedSymbols');
    }

    async getAll() {
        const {docs} = await this.collectionRef.get();

        return docs.map((doc) => ({
            ...doc.data(),
            ref: doc.ref
        }))
    }

    async insert(symbol:string, data: any) {
        return await this.collectionRef.doc(symbol).set(data);
    }

    async delete(symbol:string) {
        return await this.collectionRef.doc(symbol).delete();
    }
}
