---
title: "Data: Streaming Operations"
summary: "An overview of the types of Operations possible on streamed data"
tags: [ "Data", "Streaming", "Windows", "Watermarks", "Triggers" ]
---

## Stateless and Stateful Operations

__Stateless__ operates on one element of the Input Stream to produce one Transform Stream without regard to elements before the stream or after the stream

__Stateful__ these accumulate across multiple Stream Entities, they may or may not apply to a single element across the Input Stream but they are usually a collection of elements within a given interval - accumulate information across a window of a stream

## Windows

A __Window__ is a subset of a stream based on, for example, Time Interval, Entity Count or Interval Between Entities.

Common transforms that you might apply on all entities within a window include:
- sum
- min
- max
- avg

### Window Types

Different Window Types get different subsets of data from the Input Stream on which to perform transforms.

Five types of Windows:

- Tumbling/Fixed (Fixed Window in Apache Beam) [Good choice for sum]
    - fixed time interval for each window
    - applied in a non-overlapping manner (capture frequency equals window size eg. a window can start every 30s and capture 30s of data)
    - Number of entities per window is variable
    - an entity can only belong to one window

- Hopping/Sliding (Sliding Window in Apache Beam) [Good choice for averages]
    - Fixed window size set by time interval
    - applied in an overlapping manner (capture frequency is less than window size eg. a window can start every 30s and capture one minute of data)
    - Number of entities window is variable
    - an entity can exit within more than one window

- Count [Good for getting a time per count value]
    - not based on time interval, but on count size
    - can be overlapping or non-overlapping
    - number of entities remain the same within a window 

- Session
    - changing window size based on session data
    - no overlapping in time
    - number of entities differe within a window
    - session gap determines window size

- Global
    - all of the data in the input stream is the window

## Event Time vs Procesing Time

In an ideal world, event time vs processing time should be the same.  however in reality there is often skew and late data.

- Event Time: time event occured at original source
    - usually embedded within the source data
    - gives correct results in case of out of order or late events

- Ingestion Time: ingestion time
    - always chronologically after the above event time
    - cannot handle out of order events

- Processing Time: time of processing
    - always chronologically after the above two events
    - non-deterministic, depends on when data arrives, how long operations take etc
    - simple, no coordination between streams and processors


## Watermarks and Late Arrivals

Watermarks help to deal with late data and out-of-order.

A watermark represents the boundary between 'allowed lateness' and 'excessive lateness'.

Options for 'excessive lateness':
    - reject the data
    - accept the data and continue processing
    - accept the data and restart processing

Any 



## Triggers for Processing

Triggers are events that determine when transformations on accumulated input data need to be performed.

Each Trigger event emits aggregated results of each window.

You can use Triggers to emit early results before all data has arrived.

- Use early results to reduce latency

You can also use Triggers to control processing of late results based on watermark.

- Use late results to ensure completeness

### Trigger Categories

Triggers allow you to modify and refine the windowing strategy for an Input Stream.

- Default Trigger: 
    - used when no other trigger is specified 
    - estimation of when all data has arrived:
        - when watermark passes the end of the window
        - fires again each time late data arrives


- Event Time Triggers: 

- Processing Time Triggers: 

- Data-driven Triggers: 

- Composite Triggers: 