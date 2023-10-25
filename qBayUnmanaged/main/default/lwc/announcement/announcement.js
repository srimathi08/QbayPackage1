import { LightningElement, wire } from 'lwc';
import getAnnouncements from '@salesforce/apex/AnnouncementController.getAnnouncements';

export default class AnnouncementNoticeBoard extends LightningElement {
    announcements = [];

    @wire(getAnnouncements)
    wiredAnnouncements({ error, data }) {
        if (data) {
            this.announcements = data.map(announcement => ({
                ...announcement,
                iframeContent: `<html><body>${announcement.Image__c}</body></html>`
            }));
        } else if (error) {
            console.error(error);
        }
    }
}