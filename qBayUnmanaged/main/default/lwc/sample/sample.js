import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import jquery from '@salesforce/resourceUrl/jquery';
import bootstrap from '@salesforce/resourceUrl/Bootstraps';


export default class Test extends LightningElement {

    renderedCallback() {

        Promise.all([
            loadStyle(this, bootstrap + '/bootstrap-5.3.2-dist/css/bootstrap.css'),
            loadScript(this, bootstrap + '/bootstrap-5.3.2-dist/js/bootstrap.js'),
            loadScript(this, jquery)     
        ])
            .then(() => {
                console.log('Third party')
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Third-Party Libraries Loaded',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Loading Third-Party Libraries',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });

    }
}