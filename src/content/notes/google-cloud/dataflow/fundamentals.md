---
title: "Apache: Apache Beam Fundamentals"
summary: "The fundamentals to using Apache Beam."
tags: [ "Google Cloud", "Dataflow", "Beam" ]
---

Apache Beam is the open source project behind Google Cloud's Dataflow managed service product. 

## Basics

Data in Dataflow is stored in a PCollection.  A PTransform accepts a PCollection as an input, transforms the data and creates a new PCollection for output from the result.

Each PTransform represents one node in the DAG.  Data is immutable.

Each data element within a PCollection can have a function applied to it with ParDo.

`GroupByKey`: takes a keyed collection of elements and produces a collection where each element consists of a key and all values associated with that key. "where all the elements with the same key can be grouped together in the same worker"  

`Combine`: where the group is very large or the data is very skewed, and the operation has commutative and associative properties.

`CoGroupByKey`

`Flatten`

`Partition`: divides a PCollection into several output PCollections by applying a function that assigns a group to ID each elament in the input PCollection.

### DoFn Lifecycle

Worker receives a 'bundle' of work > each bundle is passed to a DoFn object > multiple DoFns can be runnign at the same time with the same process

| | Input | Output | Side Inputs and Outputs |
| --- | --- | --- | --- |
| ParDo | 1 | 0,1 or many | Y |
| Filter | 1 | 0 or 1 | n |
| MapElements | 1 | 1 | n |
| FlatMapElements | 1 | 0,1 or Many | n |
| WithKeys | value | (f(value), value) | n |
| Keys | (key,value) | key | n |
| Values | (key,value) | value | n | 


```python

class MyDoFn(beam.DoFn):
    def setup(self):
        pass
    def start_bundle(self):
        pass
    def process(self, element):
        pass
    def finish_bundle(self):
        pass
    def teardown(self):
        pass
```

The division of collection in the bundle is arbitrary and selected by the runner. A Streaming runner may process and commit small bundles and a batch runner may process larger bundles.

Dependent on the runner, the DoFn object can be reused across bundles.

When a worker starts, it creates an instance of the function, calls the `@Setup` method (called once per worker).

Then the `@StartBundle` method is called, before the `@ProcessElement` and `@OnTimer` methods then State Objects are read.

The `@FinishBundle` method is called to write State Objects.

If there is an exception at any stage `@TearDown` is called.


