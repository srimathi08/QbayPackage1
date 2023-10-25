import { LightningElement, wire, api } from 'lwc';
import getTimeTrackerRecords from '@salesforce/apex/TimeTrackerPreview.getTimeTrackerRecords';

export default class previewTable extends LightningElement {
    timeTrackerRecords;
    @api userName
    serialNumbers = 1; // Initialize the serial number counter

    @wire(getTimeTrackerRecords, { userName: '$userName' })
    wiredTimeTrackerRecords({ error, data }) {
        if (data) {
            this.timeTrackerRecords = this.formatTimeTrackerRecords(data);
        } else if (error) {
            console.error('Error retrieving time tracker records:', error);
        }
    }

    formatTimeTrackerRecords(records) {
        return records.map(record => {
            return {
                ...record,
                formattedStartTime: this.formatDateTime(record.Start_Time__c),
                formattedEndTime: this.formatDateTime(record.End_Time__c),
                serialNumber: this.serialNumbers++, // Assign the serial number and increment the counter
            };
        });
    }

    formatDateTime(dateTimeStr) {
        if (dateTimeStr) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            return new Date(dateTimeStr).toLocaleString(undefined, options);
        }
        return '';
    }
}