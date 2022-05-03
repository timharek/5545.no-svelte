# 5545.no-svelte

> Work in progress

A Svelte-version of the original [5545.no](https://github.com/timharek/5545.no).

Uses [Yr.no (Meteorologisk institutt) weather API][met] and [OpenStreetMap's Nominatim API][osm] for reverse coordinates lookup.

## Developing

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build

npm run preview # for production preview
```

[met]: https://api.met.no/weatherapi/locationforecast/2.0/documentation
[osm]: https://nominatim.org/