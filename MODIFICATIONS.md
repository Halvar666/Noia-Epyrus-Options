# Modifications

Noia Epyrus Options is a derivative port of Noia Fox Options for Epyrus 2.2.1.

Major changes from upstream include:

- removed Firefox-specific runtime and compatibility branches;
- retargeted the add-on to Epyrus 2.2.1;
- replaced obsolete startup-component logic with an Epyrus-compatible XUL overlay/runtime stylesheet loader;
- made optional styles active only while the Noia Epyrus complete theme is selected;
- adapted classic mail-tab styles to Epyrus `tabmail` markup;
- restored classic Noia message-row striping;
- reconstructed Blue and Black Noia variants from older Thunderbird-era Noia Fox sources;
- added Epyrus-specific Linux and Windows contrast fixes;
- preserved native Epyrus Windows titlebar/AppMenu geometry;
- added safe Windows caption-glyph handling for the Black variant;
- adapted toolbar border, hover and plain-toolbar options to the Epyrus theme structure;
- removed obsolete Firefox-only options such as bookmarks-toolbar and navigation-toolbar size controls;
- cleaned obsolete and superseded development CSS before repository publication.
