//
//  Converter.m
//  partiu
//
//  Created by diego.rios on 03/06/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "Converter.h"
#import <RCTConvert+RNSVG.h>

@implementation Converter

*- (NSDate) someMethod {
    NSDate *date = [RCTConvert NSDate:ISO8601DateString];
}

@end
