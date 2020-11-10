
# Adobe Experience Platform - User Profile plugin for Cordova apps

[![CI](https://github.com/adobe/cordova-acpuserprofile/workflows/CI/badge.svg)](https://github.com/adobe/cordova-acpuserprofile/actions)
[![npm](https://img.shields.io/npm/v/@adobe/cordova-acpuserprofile)](https://www.npmjs.com/package/@adobe/cordova-acpuserprofile)
[![GitHub](https://img.shields.io/github/license/adobe/cordova-acpuserprofile)](https://github.com/adobe/cordova-acpuserprofile/blob/main/LICENSE)

- [Prerequisites](#prerequisites)  
- [Installation](#installation)
- [Usage](#usage)  
- [Running Tests](#running-tests)
- [Sample App](#sample-app)
- [Additional Cordova Plugins](#additional-cordova-plugins)
- [Contributing](#contributing)  
- [Licensing](#licensing)  

## Prerequisites  

Cordova is distributed via [Node Package Management](https://www.npmjs.com/) (aka - `npm`).  

In order to install and build Cordova applications you will need to have `Node.js` installed. [Install Node.js](https://nodejs.org/en/).  

Once Node.js is installed, you can install the Cordova framework from terminal:  

```  
sudo npm install -g cordova  
```

## Installation

To start using the User Profile plugin for Cordova, navigate to the directory of your Cordova app and install the plugin:
```
cordova plugin add https://github.com/adobe/cordova-acpuserprofile.git
```
Check out the documentation for help with APIs

## Usage

##### Getting the SDK version:
```js
ACPUserProfile.extensionVersion(function(version){  
    console.log(version);
}, function(error){  
    console.log(error);  
});
```
##### Registering the extension with ACPCore:  

 > Note: It is required to initialize the SDK via native code inside your AppDelegate and MainApplication for iOS and Android respectively. For more information see how to initialize [Core](https://aep-sdks.gitbook.io/docs/getting-started/get-the-sdk#2-add-initialization-code).  

  ##### **iOS**  
```objective-c
#import "ACPUserProfile.h"  
[ACPUserProfile registerExtension];  
```
  ##### **Android:**  
```java
import com.adobe.marketing.mobile.UserProfile;  
UserProfile.registerExtension();
```
##### Get user profile attributes which match the provided keys:
```js
var attributeNames = new Array();
attributeNames.push("attributeName1");
attributeNames.push("attributeName2");
attributeNames.push("attributeName3");
ACPUserProfile.getUserAttributes(attributeNames, function(response) {  
    console.log("Matching user profile attributes: ", response);
}, function(error){  
    console.log(error);  
});
```
##### Remove user profile attribute if it exists:
```js
ACPUserProfile.removeUserAttribute("attributeName",function(response) {  
    console.log("User Profile attribute removed.", response);
}, function(error){  
    console.log(error);  
});
```
##### Remove provided user profile attributes if they exist:
```js
var attributeNames = new Array();
attributeNames.push("attributeName1");
attributeNames.push("attributeName2");
attributeNames.push("attributeName3");
ACPUserProfile.removeUserAttributes(attributeNames, function(response) {  
    console.log("User Profile attributes removed.", response);
}, function(error){  
    console.log(error);  
});
```
##### Set a single user profile attribute:
```js
ACPUserProfile.updateUserAttribute("age", 30, function(response){  
    console.log("Successfully added user profile key and value.", response);  
}, function(error){  
    console.log(error);  
});  
```
##### Set multiple user profile attributes:
```js
var firstName = "john";
var age = 40;
var state = "California";
var phoneNumber = "555-555-5555";
var vehicles = new Array();
vehicles.push("car");
vehicles.push("boat");
vehicles.push("airplane");
vehicles.push("motorcycle");
var colors = {"color1":"red", "color2":"blue", "color3":"green"}
var attributeMap = {"first name":firstName, "age":age, "state":state, "phone number":phoneNumber, "vehicles":vehicles, "colors":colors};
ACPUserProfile.updateUserAttributes(attributeMap, function(response) {  
    console.log("Successfully added user profile key(s) and value(s).");
}, function(error){  
    console.log(error);  
});
```
## Running Tests
Install cordova-paramedic `https://github.com/apache/cordova-paramedic`
```bash
npm install -g cordova-paramedic
```

Run the tests
```
cordova-paramedic --platform ios --plugin . --verbose
```
```
cordova-paramedic --platform android --plugin . --verbose
```

## Sample App

A Cordova app for testing the Adobe SDK plugins is located at [https://github.com/adobe/cordova-acpsample](https://github.com/adobe/cordova-acpsample). The app is configured for both iOS and Android platforms.  

## Additional Cordova Plugins

Below is a list of additional Cordova plugins from the AEP SDK suite:

| Extension | GitHub | npm |
|-----------|--------|-----|
| Core SDK | https://github.com/adobe/cordova-acpcore | [![npm](https://img.shields.io/npm/v/@adobe/cordova-acpcore)](https://www.npmjs.com/package/@adobe/cordova-acpcore)
| Adobe Analytics | https://github.com/adobe/cordova-acpanalytics | [![npm](https://img.shields.io/npm/v/@adobe/cordova-acpanalytics)](https://www.npmjs.com/package/@adobe/cordova-acpanalytics)
| Places | https://github.com/adobe/cordova-acpplaces | [![npm](https://img.shields.io/npm/v/@adobe/cordova-acpplaces)](https://www.npmjs.com/package/@adobe/cordova-acpplaces)
| Project Griffon (Beta) | https://github.com/adobe/cordova-acpgriffon | [![npm](https://img.shields.io/npm/v/@adobe/cordova-acpgriffon)](https://www.npmjs.com/package/@adobe/cordova-acpgriffon)

## Contributing
Looking to contribute to this project? Please review our [Contributing guidelines](.github/CONTRIBUTING.md) prior to opening a pull request.

We look forward to working with you!

## Licensing  
This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
