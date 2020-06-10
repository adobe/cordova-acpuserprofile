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

/********* cordova-acpplaces.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <ACPUserProfile/ACPUserProfile.h>
#import <Cordova/CDVPluginResult.h>

@interface ACPUserProfile_Cordova : CDVPlugin

- (void)clear:(CDVInvokedUrlCommand*)command;
- (void)extensionVersion:(CDVInvokedUrlCommand*)command;
- (void)getCurrentPointsOfInterest:(CDVInvokedUrlCommand*)command;
- (void)getLastKnownLocation:(CDVInvokedUrlCommand*)command;
- (void)getNearbyPointsOfInterest:(CDVInvokedUrlCommand*)command;
- (void)processGeofence:(CDVInvokedUrlCommand*)command;
- (void)setAuthorizationStatus:(CDVInvokedUrlCommand*)command;

@end

@implementation ACPUserProfile_Cordova

static NSString * const POI = @"POI";
static NSString * const LATITUDE = @"Latitude";
static NSString * const LONGITUDE = @"Longitude";
static NSString * const LOWERCASE_LATITUDE = @"latitude";
static NSString * const LOWERCASE_LONGITUDE = @"longitude";
static NSString * const IDENTIFIER = @"Identifier";
static NSString * const CENTER = @"center";
static NSString * const RADIUS = @"radius";
static NSString * const REQUEST_ID = @"requestId";
static NSString * const CIRCULAR_REGION = @"circularRegion";
static NSString * const EMPTY_ARRAY_STRING = @"[]";

- (void)clear:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        [ACPPlaces clear];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)extensionVersion:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult = nil;
        NSString* extensionVersion = [ACPPlaces extensionVersion];

        if (extensionVersion != nil && [extensionVersion length] > 0) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:extensionVersion];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)getCurrentPointsOfInterest:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        __block NSString* currentPoisString = EMPTY_ARRAY_STRING;
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        [ACPPlaces getCurrentPointsOfInterest:^(NSArray<ACPPlacesPoi *> * _Nullable retrievedPois) {
            if(retrievedPois != nil && retrievedPois.count != 0) {
                currentPoisString = [self generatePOIString:retrievedPois];
                dispatch_semaphore_signal(semaphore);
            }
        }];
        dispatch_semaphore_wait(semaphore, dispatch_time(DISPATCH_TIME_NOW, ((int64_t)1 * NSEC_PER_SEC)));
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:currentPoisString];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)getLastKnownLocation:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        [ACPPlaces getLastKnownLocation:^(CLLocation * _Nullable lastLocation) {
            NSMutableDictionary* tempDict = [[NSMutableDictionary alloc]init];
            [tempDict setValue:[NSNumber numberWithDouble:lastLocation.coordinate.latitude] forKey:LATITUDE];
            [tempDict setValue:[NSNumber numberWithDouble:lastLocation.coordinate.longitude] forKey:LONGITUDE];
            NSData* jsonData = [NSJSONSerialization dataWithJSONObject:tempDict options:0 error:nil];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
    }];
}

- (void)getNearbyPointsOfInterest:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        NSDictionary* locationDict = [self getCommandArg:command.arguments[0]];
        CLLocationDegrees latitude = [[locationDict valueForKey:LOWERCASE_LATITUDE] doubleValue];
        CLLocationDegrees longitude = [[locationDict valueForKey:LOWERCASE_LONGITUDE] doubleValue];
        CLLocation* currentLocation = [[CLLocation alloc] initWithLatitude:latitude longitude:longitude];
        NSUInteger limit = [[self getCommandArg:command.arguments[1]] integerValue];
        __block NSString* currentPoisString = EMPTY_ARRAY_STRING;
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        [ACPPlaces getNearbyPointsOfInterest:currentLocation limit:limit callback:^(NSArray<ACPPlacesPoi *> * _Nullable retrievedPois) {
                currentPoisString = [self generatePOIString:retrievedPois];
                dispatch_semaphore_signal(semaphore);
            }
                errorCallback:^(ACPPlacesRequestError error) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Places request error code: %lu", error]] callbackId:command.callbackId];
        }];
        dispatch_semaphore_wait(semaphore, dispatch_time(DISPATCH_TIME_NOW, ((int64_t)1 * NSEC_PER_SEC)));
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:currentPoisString];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)processGeofence:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        NSDictionary* geofenceDict = [self getCommandArg:command.arguments[0]];
        NSDictionary* regionDict = [geofenceDict valueForKey:CIRCULAR_REGION];
        ACPRegionEventType eventType = [[self getCommandArg:command.arguments[1]] integerValue];
        CLLocationDegrees latitude = [[regionDict valueForKey:LOWERCASE_LATITUDE] doubleValue];
        CLLocationDegrees longitude = [[regionDict valueForKey:LOWERCASE_LONGITUDE] doubleValue];
        CLLocationCoordinate2D center = CLLocationCoordinate2DMake(latitude,longitude);
        NSUInteger radius = [[regionDict valueForKey:RADIUS] integerValue];
        NSString* identifier = [geofenceDict valueForKey:REQUEST_ID];
        CLRegion* region = [[CLCircularRegion alloc] initWithCenter:center radius:radius identifier:identifier];
        [ACPPlaces processRegionEvent:region forRegionEventType:eventType];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)setAuthorizationStatus:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        int status = [[self getCommandArg:command.arguments[0]] integerValue];
        [ACPPlaces setAuthorizationStatus:[self convertToCLAuthorizationStatus:status]];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

/*
 * Helper functions
 */

- (id) getCommandArg:(id) argument {
    return argument == (id)[NSNull null] ? nil : argument;
}

- (NSString*) generatePOIString:(NSArray<ACPPlacesPoi *> *) retrievedPois {
    NSMutableArray* retrievedPoisArray = [[NSMutableArray alloc]init];
    if(retrievedPois != nil && retrievedPois.count != 0) {
        for (int index = 0; index < retrievedPois.count; index++) {
            NSMutableDictionary* tempDict = [[NSMutableDictionary alloc]init];
            ACPPlacesPoi* currentPoi = retrievedPois[index];
            [tempDict setValue:currentPoi.name forKey:POI];
            [tempDict setValue:[NSNumber numberWithDouble:currentPoi.latitude] forKey:LATITUDE];
            [tempDict setValue:[NSNumber numberWithDouble:currentPoi.longitude] forKey:LONGITUDE];
            [tempDict setValue:currentPoi.identifier forKey:IDENTIFIER];
            retrievedPoisArray[index] = tempDict;
        }
        NSData* jsonData = [NSJSONSerialization dataWithJSONObject:retrievedPoisArray options:0 error:nil];
        return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    return EMPTY_ARRAY_STRING;
}

- (CLAuthorizationStatus) convertToCLAuthorizationStatus:(int) status {
    switch (status) {
    case 0:
        return kCLAuthorizationStatusDenied;
        break;

    case 1:
        return kCLAuthorizationStatusAuthorizedAlways;
        break;

    case 2:
        return kCLAuthorizationStatusNotDetermined;
        break;

    case 3:
        return kCLAuthorizationStatusRestricted;
        break;

    case 4:
    default:
        return kCLAuthorizationStatusAuthorizedWhenInUse;
        break;
    }
}


@end
