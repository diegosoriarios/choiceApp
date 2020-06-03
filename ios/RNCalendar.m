#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNCalendar, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name startDate:(NSString *)starDate duration:(NSNumber *)duration description:(NSString *)description callback:(RCTResponseSenderBlock)callback)

@end

/*
//  RNCalendar.m
//  partiu
//
//  Created by diego.rios on 02/06/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "RNCalendar.h"
#import <React/RCTLog.h>
#import <EventKit/EventKit.h>
#import <RCTConvert+RNSVG.h>

@implementation RNCalendar

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSString *)ISO8601DateString callback: (RCTResponseSenderBlock)callback)
{
  //RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  NSString *message = [NSString stringWithFormat:@"%@:%@ at %@", @"Pretending to create an event", name, location];
  
  NSDate *date = [RCTConvert NSDate:ISO8601DateString];
  EKEventStore *store = [EKEventStore new];
  [store requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError * error) {
    if (!granted) { return; }
    EKEvent *event = [EKEvent eventWithEventStore:store];
    event.title = name;
    event.startDate = date;
    event.endDate = [event.startDate dateByAddingTimeInterval:60*60];
    event.calendar = [store defaultCalendarForNewEvents];
    NSError *err = nil;
    [store saveEvent:event span:EKSpanThisEvent commit:YES error:&err];
  }];
  
  callback(@[message]);
}

@end
*/
