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

package com.adobe.marketing.mobile.cordova;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.UserProfile;

import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import java.util.HashMap;
import java.util.Map;

/**
 * This class echoes a string called from JavaScript.
 */
public class ACPUserProfile_Cordova extends CordovaPlugin {

    final static String METHOD_USERPROFILE_EXTENSION_VERSION_USERPROFILE = "extensionVersion";
    final static String METHOD_USERPROFILE_GET_USER_ATTRIBUTES = "getUserAttributes";
    final static String METHOD_USERPROFILE_REMOVE_USER_ATTRIBUTE = "removeUserAttribute";
    final static String METHOD_USERPROFILE_REMOVE_USER_ATTRIBUTES = "removeUserAttributes";
    final static String METHOD_USERPROFILE_UPDATE_USER_ATTRIBUTE = "updateUserAttribute";
    final static String METHOD_USERPROFILE_UPDATE_USER_ATTRIBUTES = "updateUserAttributes";
    final static String LOG_TAG = "ACPUserProfile_Cordova";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {

        if (METHOD_USERPROFILE_EXTENSION_VERSION_USERPROFILE.equals(action)) {
            extensionVersion(callbackContext);
            return true;
        } else if (METHOD_USERPROFILE_GET_USER_ATTRIBUTES.equals(action)) {
            getUserAttributes(args, callbackContext);
            return true;
        } else if (METHOD_USERPROFILE_REMOVE_USER_ATTRIBUTE.equals(action)) {
            removeUserAttribute(args, callbackContext);
            return true;
        }else if (METHOD_USERPROFILE_REMOVE_USER_ATTRIBUTES.equals(action)) {
            removeUserAttributes(args, callbackContext);
            return true;
        } else if (METHOD_USERPROFILE_UPDATE_USER_ATTRIBUTE.equals(action)) {
            updateUserAttribute(args, callbackContext);
            return true;
        } else if (METHOD_USERPROFILE_UPDATE_USER_ATTRIBUTES.equals(action)) {
            updateUserAttributes(args, callbackContext);
            return true;
        }

        return false;
    }

    private void extensionVersion(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                String extensionVersion = UserProfile.extensionVersion();
                if (extensionVersion.length() > 0) {
                    callbackContext.success(extensionVersion);
                } else {
                    callbackContext.error("Extension version is null or empty");
                }
            }
        });
    }

    private void getUserAttributes(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                if (args == null || args.length() != 1) {
                    callbackContext.error("Invalid argument count, expected 1 (attributeNames).");
                    return;
                }
                List<String> attributeNames;
                try {
                    attributeNames = getListFromJSONArray(args.getJSONArray(0));
                } catch (JSONException e) {
                    callbackContext.error("Error while parsing arguments, Error " + e.getLocalizedMessage());
                    return;
                }
                UserProfile.getUserAttributes(attributeNames, new AdobeCallback<Map<String, Object>>() {
                    @Override
                    public void call(Map<String, Object> retrievedAttributes) {
                        if(retrievedAttributes != null) {
                            JSONArray jsonArray = new JSONArray();
                            int index = 0;
                            try {
                                Iterator it = retrievedAttributes.entrySet().iterator();
                                while(it.hasNext()) 
                                {
                                    jsonArray.put(index, it.next());
                                    index++;
                                } 
                            } catch (JSONException e){
                                LOG.d(LOG_TAG, "Error putting data into JSON: " + e.getLocalizedMessage());
                            }
                            callbackContext.success(jsonArray);
                        } else {
                            callbackContext.error("Error retrieving user attributes.");
                        }
                    }
                });
            }
        });
    }

    private void removeUserAttribute(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                if (args == null || args.length() != 1) {
                    callbackContext.error("Invalid argument count, expected 1 (attributeName).");
                    return;
                }
                String attributeName;
                try {
                    attributeName = args.getString(0);
                } catch (JSONException e) {
                    callbackContext.error("Error while parsing arguments, Error " + e.getLocalizedMessage());
                    return;
                }
                UserProfile.removeUserAttribute(attributeName);
                callbackContext.success();
            }
        });
    }

    private void removeUserAttributes(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                if (args == null || args.length() != 1) {
                    callbackContext.error("Invalid argument count, expected 1 (attributeName).");
                    return;
                }
                List<String> attributeNames;
                try {
                    attributeNames = getListFromJSONArray(args.getJSONArray(0));
                } catch (JSONException e) {
                    callbackContext.error("Error while parsing arguments, Error " + e.getLocalizedMessage());
                    return;
                }
                UserProfile.removeUserAttributes(attributeNames);
                callbackContext.success();
            }
        });
    }

    private void updateUserAttribute(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                if (args == null || args.length() != 2) {
                    callbackContext.error("Invalid argument count, expected 2 (attributeName and attributeValue).");
                    return;
                }
                String attributeName;
                Object attributeValue;
                try {
                    attributeName = args.getString(0);
                    attributeValue = args.get(1);
                } catch (JSONException e) {
                    callbackContext.error("Error while parsing arguments, Error " + e.getLocalizedMessage());
                    return;
                }
                UserProfile.updateUserAttribute(attributeName, attributeValue);
                callbackContext.success();
            }
        });
    }

    private void updateUserAttributes(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                 if (args == null || args.length() != 1) {
                    callbackContext.error("Invalid argument count, expected 1 (attributes).");
                    return;
                }
                HashMap<String, Object> attributeMap;
                try {
                    attributeMap = getObjectMapFromJSON(args.getJSONObject(0));
                } catch (JSONException e) {
                    callbackContext.error("Error while parsing arguments, Error " + e.getLocalizedMessage());
                    return;
                }
                UserProfile.updateUserAttributes(attributeMap);
                callbackContext.success();
            }
        });
    }

    // ===============================================================
    // Helpers
    // ===============================================================
    private HashMap<String, Object> getObjectMapFromJSON(JSONObject data) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        @SuppressWarnings("rawtypes")
        Iterator it = data.keys();
        while (it.hasNext()) {
            String n = (String) it.next();
            try {
                map.put(n, data.get(n));
            } catch (JSONException e) {
                LOG.d(LOG_TAG, "JSON error: " + e.getLocalizedMessage());
            }
        }

        return map;
    }

    private List getListFromJSONArray(JSONArray array) throws JSONException {
        List list = new ArrayList();
        for (int i = 0; i < array.length(); i++) {
            list.add(getObjectFromJSON(array.get(i)));
        }
        return list;
    }

    private Object getObjectFromJSON(Object json) throws JSONException {
        if (json == JSONObject.NULL) {
            return null;
        } else if (json instanceof JSONObject) {
            return getObjectMapFromJSON((JSONObject) json);
        } else if (json instanceof JSONArray) {
            return getListFromJSONArray((JSONArray) json);
        } else {
            return json;
        }
    }
}
