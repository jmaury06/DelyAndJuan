// Polyfills para compatibilidad con navegadores antiguos y móviles

// Polyfill para Object.fromEntries (Safari < 12.1, Edge < 79)
if (!Object.fromEntries) {
  Object.fromEntries = function(entries: any) {
    if (!entries || !entries[Symbol.iterator]) {
      throw new Error('Object.fromEntries() requires a single iterable argument');
    }
    const obj: any = {};
    for (const [key, value] of entries) {
      obj[key] = value;
    }
    return obj;
  };
}

// Polyfill para Promise.allSettled (Safari < 13)
if (!Promise.allSettled) {
  Promise.allSettled = function(promises: any[]) {
    return Promise.all(
      promises.map(p =>
        Promise.resolve(p).then(
          value => ({ status: 'fulfilled' as const, value }),
          reason => ({ status: 'rejected' as const, reason })
        )
      )
    );
  };
}

// Polyfill para String.prototype.replaceAll (Safari < 13.1, Edge < 85)
if (!(String.prototype as any).replaceAll) {
  (String.prototype as any).replaceAll = function(search: string | RegExp, replacement: string | Function) {
    if (typeof search === 'string') {
      return this.split(search).join(replacement as string);
    }
    return this.replace(search, replacement as any);
  };
}

// Polyfill para Array.prototype.at (Safari < 15.4, Chrome < 92)
if (!Array.prototype.at) {
  Array.prototype.at = function(index: number) {
    const len = this.length;
    const relativeIndex = index >= 0 ? index : len + index;
    if (relativeIndex < 0 || relativeIndex >= len) {
      return undefined;
    }
    return this[relativeIndex];
  };
}

// Asegurar que window.requestIdleCallback existe (Safari no lo soporta)
if (typeof window !== 'undefined' && !window.requestIdleCallback) {
  window.requestIdleCallback = function(callback: IdleRequestCallback) {
    const start = Date.now();
    return setTimeout(function() {
      callback({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1) as any;
  };
}

if (typeof window !== 'undefined' && !window.cancelIdleCallback) {
  window.cancelIdleCallback = function(id: number) {
    clearTimeout(id);
  };
}

// Asegurar que IntersectionObserver existe (para navegadores muy antiguos)
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  console.warn('IntersectionObserver not supported, some features may not work');
}

export {};
