import firebase from "firebase";

export default class StorageBucket{
    static async downloadByReference(ref : string) {
        const storage = firebase.storage();

        const url = await storage.ref(ref).getDownloadURL()

        return this.downloadContentFromUrl(url);
    }

    private static async downloadContentFromUrl(url : string) {
        const response = await fetch(url);
        return response.json();
    }
}
