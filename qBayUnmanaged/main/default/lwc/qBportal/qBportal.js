import { LightningElement, api, track } from 'lwc';
import companylogo from '@salesforce/resourceUrl/companylogo';
import { NavigationMixin } from 'lightning/navigation';
import HideLightningHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
const LOCAL_STORAGE_KEY = 'homepage_state';



export default class HomepageJ extends NavigationMixin(LightningElement){

    @api companylogoSrc = companylogo;

    //component hiding 
    @track showcheckincheckout = true;
    @track showleavetracker = false;
    @track showtimesheetpage = false;
    @track showannouncement = false;
    @track showbirthdaypage = false;
    @track showupcommingleaves = false;
    @track showpersonalinfonav = false;
    @track showclaiminfo = false;
     


        // Store the visibility state for each component
        @track componentVisibility = {
            showcheckincheckout: true,
            showleavetracker: false,
            showtimesheetpage: false,
           showannouncement: false,
           showbirthdaypage: false,
           showupcommingleaves: false,
           showpersonalinfonav: false,
           showclaiminfo: false
        };

  //no render

  connectedCallback() {
    loadStyle(this, HideLightningHeader)
}



loadStateFromLocalStorage() {

    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedState) {

        const { showcheckincheckout, showleavetracker, showtimesheetpage, showannouncement,showupcommingleaves,showbirthdaypage,showpersonalinfonav,showclaiminfo} = JSON.parse(storedState);

        this.showcheckincheckout = showcheckincheckout;

        this.showleavetracker = showleavetracker;

        this.showtimesheetpage = showtimesheetpage;
        this.showannouncement = showannouncement;
        this.showbirthdaypage = showbirthdaypage;
        this.showupcommingleaves = showupcommingleaves;
        this.showpersonalinfonav = showpersonalinfonav;
        this.showclaiminfo = showclaiminfo;

    }

}



saveStateToLocalStorage() {

    const stateToStore = {

        showcheckincheckout: this.showcheckincheckout,

        showleavetracker: this.showleavetracker,

        showtimesheetpage: this.showtimesheetpage,
        showannouncement: this.showannouncement,
        showbirthdaypage: this.showbirthdaypage,
       showupcommingleaves: this.showupcommingleaves,
       showpersonalinfonav: this.showpersonalinfonav,
       showclaiminfo: this.showclaiminfo

    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));

}


        



     handleLogout() {
    //Prompt the dialog box for confirmation
     if (confirm("Would you like to log out?")) {
        // Redirect to login.salesforce.com after confirmation
        //  window.location.href = 'https://login.salesforce.com';
        this.navigateToLeaveRequestPage();
        // localStorage.removeItem('checkInData');
     }
   
        
     }

     

navigateToLeaveRequestPage() {
    this[NavigationMixin.Navigate]({
        type: 'standard__navItemPage',
        attributes: {
            apiName: 'LoginPageQbay'
        },
    });
  }


 

 
        homepage(){
            this.showannouncement = true;
            this.showupcommingleaves=true;
            this.showbirthdaypage=true;

            this.showleavetracker=false;
            this.showtimesheetpage = false;
            this.showcheckincheckout=false;
           this. showpersonalinfonav=false;
           this.showclaiminfo=false;
            this.saveStateToLocalStorage();
        }
        checkincheckout(){
            // this.showcheckincheckout=!this.showcheckincheckout;
            this.showcheckincheckout=true;
            this.showbirthdaypage=false;
            this.showannouncement= false;
            this.showleavetracker = false;
            this.showtimesheetpage = false;
            this.showupcommingleaves=false;
                this. showpersonalinfonav=false;
                this.showclaiminfo=false;
            this.saveStateToLocalStorage();
        }
        leavetracker(){
            // this.showleavetracker=!this.showleavetracker;
            this.showleavetracker=true;
            this.showbirthdaypage=false;
            this.showannouncement = false;
            this.showtimesheetpage = false;
            this.showcheckincheckout=false;
            this.showupcommingleaves=false;
            this.showpersonalinfonav=false;
            this.showclaiminfo=false;
            this.saveStateToLocalStorage();
        }
        timesheetpage(){
            // this.showtimesheetpage=!this.showtimesheetpage;
            this.showtimesheetpage=true;
            this.showbirthdaypage=false;
            this.showannouncement= false;
            this.showcheckincheckout=false;
            this.showleavetracker = false;
            this.showupcommingleaves=false;
            this.showpersonalinfonav=false;
            this.showclaiminfo=false;
            this.saveStateToLocalStorage();
    
        }

    // personalinfo(){
    //     this.showtimesheetpage=false;
    //     this.showbirthdaypage=false;
    //     this.showannouncement= false;
    //     this.showcheckincheckout=false;
    //     this.showleavetracker = false;
    //     this.showupcommingleaves=false;
    //     this.showpersonalinfo=true;
    //     this.saveStateToLocalStorage();

    // }
    personalinfonav(){
        this.showtimesheetpage=false;
        // this.showbirthdaypage=false;
        // this.showannouncement= false;
        this.showcheckincheckout=false;
        this.showleavetracker = false;
        // this.showupcommingleaves=false;
        this.showpersonalinfonav=true;
        this.showclaiminfo=false;
        this.saveStateToLocalStorage();

    }
    
    claiminfo(){
        this.showtimesheetpage=false;
        this.showpersonalinfonav=false;
        this.showbirthdaypage=false;
        this.showannouncement= false;
        this.showcheckincheckout=false;
        this.showleavetracker = false;
        this.showupcommingleaves=false;
        this.showclaiminfo=true;

    }
    }