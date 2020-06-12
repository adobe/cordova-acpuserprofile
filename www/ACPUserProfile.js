/*
 Copyright 2020 Adobe. All rights reserved.
 This file is licensed to you under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License. You may obtain a copy
 of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 OF ANY KIND, either express or implied. See the License for the specific language
 governing permissions and limitations under the License.
 */

var ACPUserProfile = (function() {
    var exec = require('cordova/exec');
	var ACPUserProfile = (typeof exports !== 'undefined') && exports || {};
	var PLUGIN_NAME = "ACPUserProfile";

	// ===========================================================================
	// public APIs
	// ===========================================================================

    // Get the current UserProfile extension version.
    ACPUserProfile.extensionVersion = function (success, error) {
        var FUNCTION_NAME = "extensionVersion";

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }

        return exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, []);
    };

    // Get user profile attributes which match the provided keys.
    ACPUserProfile.getUserAttributes = function (attributeNames, success, error) {
        var FUNCTION_NAME = "getUserAttributes";

        if (!acpIsArray(attributeNames)) {
            acpPrintNotAnArray("attributeNames", FUNCTION_NAME);
            return;
        }

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }

        return exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, [attributeNames]);
    };

    // Remove user profile attribute if it exists.
    ACPUserProfile.removeUserAttribute = function (attributeName, success, error) {
        var FUNCTION_NAME = "removeUserAttribute";

        if (!acpIsString(attributeName)) {
            acpPrintNotAString("attributeName", FUNCTION_NAME);
            return;
        }

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }
        return exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, [attributeName]);
    };

    // Remove provided user profile attributes if they exist.
    ACPUserProfile.removeUserAttributes = function (attributeNames, success, error) {
        var FUNCTION_NAME = "removeUserAttributes";

        if (!acpIsArray(attributeNames)) {
            acpPrintNotAnArray("attributeNames", FUNCTION_NAME);
            return;
        }

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }
        return exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, [attributeNames]);
    };

    // Set a single user profile attribute.
    ACPUserProfile.updateUserAttribute = function (attributeName, attributeValue, success, error) {
        var FUNCTION_NAME = "updateUserAttribute";

        if (!acpIsString(attributeName)) {
            acpPrintNotAString("attributeName", FUNCTION_NAME);
            return;
        }

        if (!acpIsString(attributeValue) && !acpIsNumber(attributeValue) && !acpIsArray(attributeValue)) {
            acpPrintNotAValidAttributeValue("attributeValue", FUNCTION_NAME);
            return;
        }

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }

        return exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, [attributeName, attributeValue]);
    };

    // Set multiple user profile attributes.
    ACPUserProfile.updateUserAttributes = function (attributes, success, error) {
        var FUNCTION_NAME = "updateUserAttributes";

        if (!acpIsObject(attributes)) {
            acpPrintNotAnObject("attributes", FUNCTION_NAME);
            return;
        }

        if (success && !isFunction(success)) {
            printNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (error && !isFunction(error)) {
            printNotAFunction("error", FUNCTION_NAME);
            return;
        }

        exec(success, error, 'ACPUserProfile_Cordova', FUNCTION_NAME, [attributes]);
    };

	return ACPUserProfile;
}());

// ===========================================================================
// helper functions
// ===========================================================================
function acpIsString (value) {
    return typeof value === 'string' || value instanceof String;
};

function acpPrintNotAString (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a String.");
};

function acpIsNumber (value) {
    return typeof value === 'number' && isFinite(value);
};

function acpPrintNotANumber (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a Number.");
};

function isFunction (value) {
    return typeof value === 'function';
}

function printNotAFunction (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a function.");
}

function acpIsObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
};

function acpPrintNotAnObject (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be an Object.");
};

function acpIsArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
};

function acpPrintNotAnArray (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be an Array.");
};

function acpPrintNotAValidAttributeValue (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be an String, Number, or Array.");
};

module.exports = ACPUserProfile;
