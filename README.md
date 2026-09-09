# Puja Mohapatra Clinical Psychology — V12.4

Premium responsive clinical psychology website with a browser-based Customize Center.

## V12.4 image picker fix
- Replaced the nested hidden file-label interaction with a mobile-safe Choose image button that programmatically opens the file picker.
- Added explicit image file input support for JPG, PNG and WebP.
- Added image compression before browser storage to reduce localStorage usage.
- Added storage-full error handling instead of failing silently.
- Image state is refreshed from localStorage after every selection so multiple section images no longer overwrite each other.
- Hero/About/Services/Approach/Journey/Practice/Reviews/FAQ/Contact/CTA each has its own image slot.

## Important
Customize Center changes are saved locally in the browser on that device. To publish permanent images for everyone, place the selected image in `assets/` and set its path in `sectionImages` in `config.js`.

## V12.3 motion
- Fluid reveal animations, gentle section background motion, hero image motion, active navigation, mobile menu behavior, and reduced-motion support.
