import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getLocation from '@salesforce/apex/LocationController.getLocation';

export default class LocationComponent extends LightningElement {
    @track location = {};

    handleClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                getLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                .then(result => {
                    this.location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        city: result.city,
                        state: result.state
                    };
                    console.log(this.location);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error getting location',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                });
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }
}