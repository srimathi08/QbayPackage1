import { LightningElement, wire,api } from 'lwc';
import getTimesheetData from '@salesforce/apex/TimesheetpreviewtableController.getTimesheetData';


export default class TimesheetPreviewTable extends LightningElement {
    timeTrackerRecords;
    @api userName
    serialNumbers = 1; // Initialize the serial number counter

    @wire(getTimesheetData, { userName: '$userName' })
    wiredTimeTrackerRecords({ error, data }) {
        if (data) {
            
            this.timeTrackerRecords = this.formatTimeTrackerRecords(data);
            console.log('timesheet Date'+this.timeTrackerRecords)
        } else if (error) {
            console.error('Error retrieving time tracker records:', error);
        }
    }

    formatTimeTrackerRecords(records) {
        console.log('records'+records)
        return records.map(record => {
            return {
                ...record,
                formattedStartTime: this.formatDateTime(record.Date__c),
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