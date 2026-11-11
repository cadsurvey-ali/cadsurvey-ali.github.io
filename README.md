# CAD & SURVEY website — By Eng. Ali

Static site (no server). Mobile-first: phones, tablets (portrait + landscape), desktop. 3 languages (English · عربي · عراقي), dark + light.

## Pages
index · tools · pricing · cad-survey · sitey · civil · about · training · guide/ (the tools guide) · 404

## Settings — edit `assets/js/config.js` only
- `GA_ID` — Google Analytics id (visitors, countries, devices, every button click is tracked by name)
- `DOWNLOAD_URL` — direct download link (empty = the button opens an e-mail request "تجربة")
- `PRICE_ENDPOINT` — form service that sends the price card automatically (empty = a ready e-mail "الأسعار")
- `BOOKED` — launch-offer seats already booked (the ring shows 50 − BOOKED)

## Changing texts / adding a tool
Texts and tools come from the design data. Edit `../build/data.json` (or the design) and run:
    python build.py ../site
Then test: `check.py` (no sideways scrolling on 360 / 390 / 820 / 1180 / 1440 px, both themes, ar + en).

## Publish
GitHub Pages (free) → later the domain cadsurvey.com (add a CNAME file with the domain).
