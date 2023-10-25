public with sharing class FoodDetailsController {
    @AuraEnabled
    public static Id saveFoodDetails(Food_Details__c foodDetailsRec, String file, String fileName) {
        Id foodDetailsId;
        try {
            // Insert the Food_Details__c record
            Insert foodDetailsRec;
            foodDetailsId = foodDetailsRec.Id;
    
            // Decode and insert the file as a ContentVersion record
            String base64File = EncodingUtil.urlDecode(file, 'UTF-8');
            ContentVersion contentVersionRec = new ContentVersion();
            contentVersionRec.Title = fileName;
            contentVersionRec.PathOnClient = '/' + fileName;
            contentVersionRec.FirstPublishLocationId = foodDetailsRec.Id;
            contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);
            contentVersionRec.IsMajorVersion = true;
            Insert contentVersionRec;
        } catch (Exception ex) {
            system.debug('Exception ===> ' + ex.getMessage());
        }
        return foodDetailsId;
    }
     
    @AuraEnabled
    public static String saveStayDetails(Stay_Details__c stayRec, String file, String fileName) {
        String stayId;
        try {
            Insert stayRec;
            stayId = stayRec.Id;

            String base64File = EncodingUtil.urlDecode(file, 'UTF-8');

            ContentVersion contentVersionRec = new ContentVersion();
            contentVersionRec.Title = fileName;
            contentVersionRec.PathOnClient = '/' + fileName;
            contentVersionRec.FirstPublishLocationId = stayRec.Id;
            contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);
            contentVersionRec.IsMajorVersion = true;

            Insert contentVersionRec;
        } catch (Exception ex) {
            System.debug('Exception ===> ' + ex.getMessage());
        }
        return stayId;
    }
        @AuraEnabled(cacheable=true)
        public static List<String> getModeOfTravelPicklistValues() {
            List<String> picklistValues = new List<String>();
            Schema.DescribeFieldResult fieldResult = Travel_Detail__c.Mode_of_travel__c.getDescribe();
            for (Schema.PicklistEntry entry : fieldResult.getPicklistValues()) {
                picklistValues.add(entry.getLabel());
            }
            return picklistValues;
        }
        
        @AuraEnabled
        public static Id saveTravelDetail(Travel_Detail__c travelDetailRec, String file, String fileName) {
            Id travelDetailId;
            try {
                insert travelDetailRec;
                travelDetailId = travelDetailRec.Id;
    
                String base64File = EncodingUtil.urlDecode(file, 'UTF-8');
    
                ContentVersion contentVersionRec = new ContentVersion();
                contentVersionRec.Title = fileName;
                contentVersionRec.PathOnClient = '/' + fileName;
                contentVersionRec.FirstPublishLocationId = travelDetailRec.Id;
                contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);
                contentVersionRec.IsMajorVersion = true;
                insert contentVersionRec;
            } catch (Exception ex) {
                system.debug('Exception ===> ' + ex.getMessage());
            }
            return travelDetailId;
        }
}