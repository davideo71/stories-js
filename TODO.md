## TODO

- log application version on start (using https://www.npmjs.com/package/pkginfo?)
- unit testing
- add persistence
  * clean up state before persisting: http://www.mattgreer.org/articles/electron-redux-and-persistence
- the debug module is quite useful (as could be redux-logger from the renderer)
- create actionCreatorGenerator as described here: http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-action-creators
- improve env config mechanism (e.g. https://github.com/lorenwest/node-config
  or just https://www.npmjs.com/package/cross-env for now or
  something like an `exec.js`: http://stackoverflow.com/a/32993213)

## IDEAS

### async downloading of node images

Suppose you've just installed the app, logged in and fetched an online story.
Instead of downloading all images before rendering, we could also lazily download
them when needed. So we'd have an action, e.g. `NODE_GET_IMAGE` returns image data
or an image path. This action is implemented by using thunk/saga/loop and first checks
if the image is already present in which case it can be returned immediately
(well unless we also have to load the file async of course).
If it is not present, we need to fetch it and return the data/path when complete,
or return an error when appropriate.
It might be nice to display download progress in the UI, so we could have a
`downloads` substore which keeps track of all required information including
progress. The `id` of a download is then referenced from the corresponding node.
This way, it's also easy to cap the maximum amount of simultaneous downloads by
rejecting a fetch operation if the list of downloads would exceed max length.

### normalized data and action handling delegation

Creating a node might be handled by the nodesReducer to create the actual node
but also by the canvasReducer to add it to the canvas (e.g. using mouse coords
in the action payload). To keep z-order, we could store an array with all node-ids
in the canvas.
