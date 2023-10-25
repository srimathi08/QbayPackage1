// pdfUploaderRecords.js
import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getPdfUploaders from '@salesforce/apex/PolicyRecordsController.getPdfUploaders'; // Replace with your Apex method

export default class PdfUploaderRecords extends NavigationMixin(LightningElement) {
    pdfUploaders;

    @wire(getPdfUploaders)
    wiredPdfUploaders({ error, data }) {
        if (data) {
            this.pdfUploaders = data;
        }
    }

    navigateToRecord(event) {
        const recordId = event.currentTarget.dataset.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
        });
    }
}