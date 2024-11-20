import { makeAutoObservable } from 'mobx';

class AppStore {
    showInitialScreen = true;
    formData = {
        firstName: '',
        lastName: '',
        email: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    hideInitialScreen() {
        this.showInitialScreen = false;
    }

    updateFormData(field, value) {
        this.formData[field] = value;
    }
}

const appStore = new AppStore();
export default appStore;
