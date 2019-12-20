/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
import mapboxgl from 'mapbox-gl';

class PulsingDot {
  constructor(map, size, duration) {
    this.__map = map;
    this.__size = size;
    this.__width = size;
    this.__height = size;
    this.__duration = duration;
    this.__data = new Uint8Array(size * size * 4);
    this.__context = null;
  }

  get width() {
    return this.__width;
  }

  get height() {
    return this.__height;
  }

  get data() {
    return this.__data;
  }

  onAdd() {
    const canvas = document.createElement('canvas');
    canvas.width = this.__width;
    canvas.height = this.__height;
    this.__context = canvas.getContext('2d');
  }

  render() {
    const size = this.__size;
    const duration = this.__duration;
    const t = (performance.now() % duration) / duration;
    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.__context;

    // draw outer circle
    context.clearRect(0, 0, this.__width, this.__height);
    context.beginPath();
    context.arc(
      this.__width / 2,
      this.__height / 2,
      outerRadius,
      0,
      Math.PI * 2,
    );
    context.fillStyle = `rgba(255, 200, 200, ${(1 - t)})`;
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(
      this.__width / 2,
      this.__height / 2,
      radius,
      0,
      Math.PI * 2,
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.__data = context.getImageData(
      0,
      0,
      this.__width,
      this.__height,
    ).data;
    // continuously repaint the map, resulting in the smooth animation of the dot
    this.__map.triggerRepaint();
    // return `true` to let the map know that the image was updated
    return true;
  }
}

class Map {
  constructor(accesKey, containerId, pointSize, animationLasts, startingZoom, lng, lat) {
    mapboxgl.accessToken = accesKey;
    const map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat], // starting position [lng, lat]
      zoom: startingZoom, // starting zoom
    });
    const pulsingDot = new PulsingDot(map, pointSize, animationLasts);
    this.__map = map;
    this.__pulsingDot = pulsingDot;
    map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      map.addLayer({
        id: 'pointID',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [lng, lat],
                },
              },
            ],
          },
        },
        layout: {
          'icon-image': 'pulsing-dot',
        },
      });
    });
  }

  flyTo(lng, lat) {
    const map = this.__map;
    const coords = [lng, lat];
    map.flyTo({
      center: coords,
      essential: true,
    });
    const pop = new mapboxgl.Popup();
    pop.setLngLat(coords);
    pop.setHTML('<h2>!</h2>');
    pop.addTo(map);
  }
}
export default Map;
