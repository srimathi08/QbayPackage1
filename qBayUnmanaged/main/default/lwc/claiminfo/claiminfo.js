import { LightningElement, track } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

 

export default class TravelExpNavbar extends NavigationMixin(LightningElement) {

 

    @track showtraveldetails = false;

    @track showfooddetails = false;

    @track showstaydetails = false;

 

    @track componentVisibility  = {

         showtraveldetails: false,

         showfooddetails :false,

         showstaydetails : false

};

 

loadStateFromLocalStorage() {

 

    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

 

    if (storedState) {

 

        const {showtraveldetails} = JSON.parse(storedState);

 

        this.showtraveldetails = showtraveldetails;

        this. showfooddetails = showfooddetails;

        this.showstaydetails = showstaydetails;

    }

}

saveStateToLocalStorage() {

 

    const stateToStore = {

 

        showtraveldetails: this.showtraveldetails,

        showfooddetails: this.showfooddetails,

        showstaydetails: this.showstaydetails

 

    };

 

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));

 

}

traveldetails(){

    this.showtraveldetails=true;

    this.showfooddetails=false;

    this.showstaydetails= false;

    this.saveStateToLocalStorage();

}

fooddetails(){

    // this.showcheckincheckout=!this.showcheckincheckout;

    this.showtraveldetails=false;

    this.showfooddetails=true;

    this.showstaydetails= false;

    this.saveStateToLocalStorage();

}

staydetails(){

    // this.showcheckincheckout=!this.showcheckincheckout;

    this.showtraveldetails=false;

    this.showfooddetails=false;

    this.showstaydetails= true;

    this.saveStateToLocalStorage();

}

 

}