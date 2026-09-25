# Fonts

`FuturaHVBT.woff2` and `HelveticaNowDisplay.woff2` are loaded by
`src/app/layout.tsx` and are the site's display and body faces.

`HelveticaRegular.woff2` is **not loaded by the site**, and is kept here on
purpose. A legacy `.html.enc` client report is one self-contained document, so
it embeds its faces as base64 data URIs — and HelveticaNowDisplay cannot be
used for report body text: embedded in the vs-3f9a2 report it rendered a
visible gap before every comma, full stop and colon. HelveticaRegular is also
a brand face and sets punctuation correctly. The live site is unaffected; the
fault only appears inside a report's own CSS context.

It used to be loaded on every page of the site as `--font-helvetica-ui` and
applied to nothing, which cost every visitor a 108KB download for no reason.
That is why the `localFont` call is gone and the file is still here.
