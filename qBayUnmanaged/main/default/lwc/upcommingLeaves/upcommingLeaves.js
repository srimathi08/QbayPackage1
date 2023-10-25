import { LightningElement, wire } from 'lwc';
import getUpcomingLeaves from '@salesforce/apex/UpcomingLeavesController.getUpcomingLeaves';

export default class UpcomingLeavesNoticeBoard extends LightningElement {
    upcomingLeaves = [];
    selectedMonth = '';

    formattedLeaves = [];

    @wire(getUpcomingLeaves)
    wiredUpcomingLeaves({ error, data }) {
        if (data) {
            this.upcomingLeaves = data;
            this.formatDates();
        } else if (error) {
            console.error(error);
        }
    }

    handleMonthChange(event) {
        this.selectedMonth = event.target.value;
        this.formatDates();
    }

    formatDates() {
        this.formattedLeaves = this.upcomingLeaves.map(leave => {
            const date = new Date(leave.Date__c);
            const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day is single-digit
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is single-digit
            const year = date.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            return {
                ...leave,
                FormattedStartDate: formattedDate,
            };
        });

        // Sort the formattedLeaves array by Start Date in ascending order
        this.formattedLeaves.sort((a, b) => {
            const dateA = new Date(a.Date__c);
            const dateB = new Date(b.Date__c);
            return dateA - dateB;
        });
    }

    get filteredUpcomingLeaves() {
        if (this.selectedMonth) {
            return this.formattedLeaves.filter(leave =>
                new Date(leave.Date__c).getMonth() === parseInt(this.selectedMonth, 10) - 1
            );
        }
        return this.formattedLeaves;
    }
}