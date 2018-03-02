# Bustudo Bus Tracking

![bus_emoji](https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/bus_1f68c.png)

This is a frontend that interfaces with the <a href="umd.io">umd.io</a> API
and displays a live view of all University of Maryland buses. This was inspired
by Uber's <b>God Mode</b>, an internal tool that showed all ongoing Uber rides
across the world in real time.


### Planned features:
- Render bus routes and highlight them
- Table showing active buses and speeds
- Proper bus marker orientation
- Figure out a way to discrete ~10 second lat/long bus updates into a continuous
movements across the map
- Hover over bus to display a bus tooltip (speed, bus name, next stop)


### Issues
- umd.io doesn't support HTTPS yet so this doesn't work over GitHub pages.
