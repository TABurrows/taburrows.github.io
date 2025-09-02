---
title: "Flutter: Fundamentals"
summary: "An overview of the fundamentals of building apps with Dart and Flutter"
tags: [ "Flutter", "Dart", "Fundamentals" ]
---

Basics of setting up 


## Getting Started

Example IDE URL:
https://ide-service-bsmqzpoqwq-uc.a.run.app

Example Live Server:
https://browser-service-bsmqzpoqwq-uc.a.run.app

To create an app:
```
flutter create app_name
```

The app is created in the folder named `app_name`.

To run the Flutter web server:
```
fwr
```

The main entry point class is located at `lib\main.dart`.

Most apps extend `StatelessWidget` or `StatefulWidget`.

Edit `pubspec.yml` to add packages.



### Flutter template application

Material is a visual-design language that's standard on mobile and the web. Flutter offers a rich set of Material widgets.

The main method uses arrow (=>) notation. Use arrow notation for one-line functions or methods.

The app extends StatelessWidget, which makes the app itself a widget. In Flutter, almost everything is a widget, including alignment, padding, and layout.

The Scaffold widget, from the Material library, provides a default app bar, a title, and a body property that holds the widget tree for the home screen. The widget subtree can be quite complex.

A widget's main job is to provide a build method that describes how to display the widget in terms of other, lower-level widgets.

The body for this example consists of a Center widget containing a Text child widget. The Center widget aligns its widget subtree to the center of the screen.

### Enable Web for a Project

To enable web for your flutter project:
```
flutter config --enable-web
# and now re-create project
flutter create .
```

## Material Components

The entry point class returns a `MaterialApp` application when using the Material 3 design language (the default in 3.16+).  Alternative design languages available include `CuepertinoUI` and `FluentUI`.

```
import 'package:flutter/material.dart';

...
```

### TextField 

Features include:

The TextField widget's look can be easily changed. For the decoration field, specify an InputDecoration value.

The MDC text field displays touch feedback (called the MDC ripple or "ink") by default.

The FormField is a similar widget that has special features for embedding fields in Forms.

[TextField class documentation](https://docs.flutter.dev/flutter/material/TextField-class.html)


### OverflowBar

Arranges its own children in a row

```
  OverflowBar(
    alignment: MainAxisAlignment.end,
    children: <Widget>[
      // Add child widgets here
    ],
  ),
```

### Buttons

Use Empty blocks on buttons to prevent them from being disabled:

```
    TextButton(
      child: const Text('CANCEL'),
      onPressed: () {
      },
    ),
    ElevatedButton(
      child: const Text('NEXT'),
      onPressed: () {
      },
    ),
```


### Navigation

To dismiss views, you pop (or remove) a page which Flutter calls a route off the navigation stack.


### App Bar

Header or App Bar's are add to the top of an app's viewport.

### Leading Icon

### Card Grid View


The GridView invokes the count() constructor since the number of items it displays is countable and not infinite. But it needs some information to define its layout.

The `crossAxisCount`: specifies how many items across. We want 2 columns.

`Cross axis` in Flutter means the non-scrolling axis. The scrolling direction is called the main axis. So, if you have vertical scrolling, like GridView does by default, then the cross axis is horizontal. Learn more in Build Layouts.

The `padding`: field provides space on all 4 sides of the GridView. Of course you can't see the padding on the trailing or bottom sides because there's no GridView children next to them yet.

The `childAspectRatio`: field identifies the size of the items based on an aspect ratio (width over height).

By default, GridView makes tiles that are all the same size.

An example private function:

```
List<Card> _buildGridCards(int count) {
  List<Card> cards = List.generate(
    count,
    (int index) => Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          AspectRatio(
            aspectRatio: 18.0 / 11.0,
            child: Image.asset('assets/diamond.png'),
          ),
          Padding(
            padding: EdgeInsets.fromLTRB(16.0, 12.0, 16.0, 8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text('Title'),
                SizedBox(height: 8.0),
                Text('Secondary Text'),
              ],
            ),
          ),
        ],
      ),
    ),
  );

  return cards;
}
```

and the subsequent body code looks like this:
```
// TODO: Add a grid view (102)
body: GridView.count(
  crossAxisCount: 2,
  padding: EdgeInsets.all(16.0),
  childAspectRatio: 8.0 / 9.0,
  children: _buildGridCards(10) // Replace
),
```