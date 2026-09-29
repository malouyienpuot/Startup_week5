# Welcare Sanitech presentation

A responsive, browser-based version of the six-slide Welcare Sanitech project
presentation.

## View the presentation

Open `index.html` in a browser, or start a local server from this folder:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000`.

Use the previous/next buttons, slide dots, or arrow keys to navigate. Select
**Edit slides** to update slide text in the browser. Those edits are saved in
the current browser using local storage. The original slide content is also
editable in the `presentationData` object near the top of `script.js`.

## Files

- `index.html` contains the page structure.
- `style.css` contains the presentation theme and responsive layout.
- `script.js` contains the slide content and presentation controls.
