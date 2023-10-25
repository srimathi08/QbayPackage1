import { LightningElement, wire } from 'lwc';
import getOrganization from '@salesforce/apex/OrgChartController.getOrganization';

export default class organization extends LightningElement {
    organization = [];

    @wire(getOrganization)
    wiredOrganization({ error, data }) {
        if (data) {
            this.organization = data.map(organization => ({
                ...organization,
                iframeContent: `<html><body>${organization.Image__c}</body></html>`
            }));
        } else if (error) {
            console.error(error);
        }
    }
}