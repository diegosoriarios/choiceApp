//
//  RNCalendar.swift
//  partiu
//
//  Created by diego.rios on 03/06/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import EventKit

@objc(RNCalendar)
class RNCalendar: NSObject {
  
  @objc(addEvent:startDate:duration:description:callback:)
  func addEvent(name: String, startDate: NSNumber, duration: Double, description: String, callback: RCTResponseSenderBlock) -> Void {
    let eventStore = EKEventStore()
    let timeInterval = Double(truncating: startDate)/1000
    let date = Date(timeIntervalSince1970: timeInterval)
    
    switch EKEventStore.authorizationStatus(for: .event) {
      case .authorized:
        let response = insertEvent(
          store: eventStore,
          title: name,
          startDate: date,
          duration: duration,
          description: description
        )
        callback([response])
      case .denied:
        callback(["Access denied"])
      case .notDetermined:
        eventStore.requestAccess(to: .event, completion:
          {[weak self] (granted: Bool, error: Error?) -> Void in
            if granted {
              _ = self!.insertEvent(
                store: eventStore,
                title: name,
                startDate: date,
                duration: duration,
                description: description
              )
            } else {
              print("Access denied")
            }
          }
        )
        default:
          print("default")
      }
  }

  @objc
  func constantsToExport() -> [String: Any]! {
    return ["someKey": "someValue"]
  }
  
  func insertEvent(store: EKEventStore, title: String, startDate: Date, duration: Double, description: String) -> String {
    let event:EKEvent = EKEvent(eventStore: store)
    let _startDate = startDate
    let endDate = _startDate.addingTimeInterval(duration * 60 * 60)
    event.title = title
    event.startDate = _startDate
    event.endDate = endDate
    event.notes = description
    event.calendar = store.defaultCalendarForNewEvents
    do {
      try store.save(event, span: .thisEvent)
    } catch let error as NSError {
      return "Failed to save event with error: \(error)"
    }
    
    return "Event Saved"
    
  }

}
