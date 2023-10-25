public with sharing class LocationController {
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getLocation(Decimal latitude, Decimal longitude) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.opencagedata.com/geocode/v1/json?q=' + latitude + '+' + longitude + '&key=6aab916751004541926e744b9acfff94');
        req.setMethod('GET');

        Http http = new Http();
        HttpResponse res = http.send(req);

        // Parse the JSON response
        Map<String, Object> response = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        List<Object> results = (List<Object>) response.get('results');
        Map<String, Object> firstResult = (Map<String, Object>) results[0];
        Map<String, Object> components = (Map<String, Object>) firstResult.get('components');

        // Return the city and state
        Map<String, String> location = new Map<String, String>();
        location.put('city', (String) components.get('city'));
        location.put('state', (String) components.get('state'));

        return location;
    }
}