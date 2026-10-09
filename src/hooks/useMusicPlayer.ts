import { useState, useEffect, useRef } from 'react';

const GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;

export const useMusicPlayer = ({ autoplay = false }: { autoplay?: boolean } = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete');
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Esperar al evento load: la música debe arrancar lo último, cuando todo cargó
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  // Autoplay: intenta con sonido; si el navegador lo bloquea, reproduce silenciado
  // y activa el sonido con el primer gesto del usuario.
  useEffect(() => {
    if (!autoplay || !isReady || !pageLoaded || !playerRef.current) return;

    const player = playerRef.current;
    const YT = (window as any).YT;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let gestureAttached = false;

    const unlockOnGesture = () => {
      removeGestureListeners();
      try {
        player.unMute();
        player.setVolume(20);
        player.playVideo();
      } catch (e) {
        console.warn('No se pudo activar el audio:', e);
      }
    };

    const removeGestureListeners = () => {
      if (!gestureAttached) return;
      gestureAttached = false;
      GESTURE_EVENTS.forEach(evt => window.removeEventListener(evt, unlockOnGesture));
    };

    try {
      player.setVolume(20);
      player.unMute();
      player.playVideo();
    } catch (e) {
      console.warn('Autoplay no disponible:', e);
    }

    fallbackTimer = setTimeout(() => {
      try {
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
          player.mute();
          player.playVideo();
          gestureAttached = true;
          GESTURE_EVENTS.forEach(evt =>
            window.addEventListener(evt, unlockOnGesture, { once: true, passive: true })
          );
        }
      } catch (e) {
        console.warn('Fallback de autoplay falló:', e);
      }
    }, 1000);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeGestureListeners();
    };
  }, [autoplay, isReady, pageLoaded]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;
    
    const initPlayer = () => {
      const playerDiv = document.getElementById('youtube-player');
      if (!playerDiv) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initPlayer, 100);
        }
        return;
      }

      try {
        // Verificar que YT esté disponible
        if (!(window as any).YT || !(window as any).YT.Player) {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(initPlayer, 200);
          }
          return;
        }

        playerRef.current = new (window as any).YT.Player('youtube-player', {
          height: '0',
          width: '0',
          videoId: '_QWZQh0YYWA',
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: '_QWZQh0YYWA',
            enablejsapi: 1,
            playsinline: 1, // Crítico para iOS
            origin: window.location.origin // Requerido para algunos navegadores
          },
          events: {
            onReady: (event: any) => {
              try {
                setIsReady(true);
                event.target.setVolume(20);
              } catch (e) {
                console.warn('Error setting volume:', e);
                setIsReady(true);
              }
            },
            onStateChange: (event: any) => {
              try {
                if (event.data === (window as any).YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                }
              } catch (e) {
                console.warn('Error in state change:', e);
              }
            },
            onError: (event: any) => {
              // Manejar errores silenciosamente pero registrar para debug
              console.warn('YouTube player error:', event.data);
              // Error codes: 2 = invalid ID, 5 = HTML5 error, 100 = video not found, 101/150 = not allowed
              setIsReady(false);
            }
          }
        });
      } catch (error) {
        console.warn('Error initializing YouTube player:', error);
        setIsReady(false);
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        try {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          tag.async = true;
          tag.onerror = () => {
            console.warn('Failed to load YouTube API');
            setIsReady(false);
          };
          const firstScriptTag = document.getElementsByTagName('script')[0];
          if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          } else {
            document.head.appendChild(tag);
          }
        } catch (error) {
          console.warn('Error loading YouTube script:', error);
          setIsReady(false);
        }
      }

      (window as any).onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying player:', e);
        }
      }
    };
  }, []);

  const play = () => {
    if (playerRef.current && isReady) {
      try {
        const playPromise = playerRef.current.playVideo();
        
        if (playPromise !== undefined && playPromise.then) {
          playPromise.catch(() => {
            // Intentar unmute por si está muteado por política del navegador
            playerRef.current.unMute();
            playerRef.current.playVideo();
          });
        }
      } catch (error) {
        // Manejar error silenciosamente
      }
    }
  };

  const pause = () => {
    if (playerRef.current && isReady) {
      playerRef.current.pauseVideo();
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    isPlaying,
    isReady,
    play,
    pause,
    toggle
  };
};
