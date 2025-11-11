'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_LOCAL_URL;

const toBackendUrl = (pathname) => {
  const normalizedBase = BACKEND_BASE_URL.endsWith('/')
    ? BACKEND_BASE_URL.slice(0, -1)
    : BACKEND_BASE_URL;
  return `${normalizedBase}${pathname}`;
};

const statusColor = (passed) => (passed ? 'text-emerald-400' : 'text-rose-400');

const characterImagePath = (match) => {
  if (!match) {
    return null;
  }

  if (match.sourceImage) {
    return `/${match.sourceImage}`;
  }

  if (match.name) {
    const slug = match.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `/${slug}.jpg`;
  }

  return null;
};

export default function LookalikeCam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchPayload, setMatchPayload] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [embeddingsMeta, setEmbeddingsMeta] = useState({ ready: false, count: 0 });
  const [error, setError] = useState(null);

  const backendHealth = useMemo(
    () => (embeddingsMeta.ready ? `${embeddingsMeta.count} champions on standby` : 'Syncing with Citadel...'),
    [embeddingsMeta]
  );

  useEffect(() => {
    async function attachCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });

        if (!videoRef.current) {
          return;
        }

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraReady(true);
      } catch (err) {
        setError('Unable to access camera. Please allow webcam permissions.');
      }
    }

    attachCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    async function fetchEmbeddings() {
      try {
        const response = await fetch(toBackendUrl('/api/embeddings'));
        if (!response.ok) {
          throw new Error('Failed to fetch character embeddings');
        }
        const payload = await response.json();
        setEmbeddingsMeta({ ready: true, count: Array.isArray(payload) ? payload.length : 0 });
      } catch (err) {
        setEmbeddingsMeta({ ready: false, count: 0 });
        setError('Embeddings are still syncing from the backend. Try again shortly.');
      }
    }

    fetchEmbeddings();
  }, []);

  const captureAndMatch = async () => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Unable to access drawing context for capture.');
      return;
    }
    ctx.drawImage(video, 0, 0, width, height);

    setIsProcessing(true);
    setError(null);

    try {
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const response = await fetch(toBackendUrl('/api/match'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Face match failed');
      }

      setMatchPayload(payload);
      setMatchHistory((prev) => {
        const next = [
          {
            timestamp: Date.now(),
            bestMatch: payload.bestMatch,
            matches: payload.matches,
          },
          ...prev,
        ];
        return next.slice(0, 5);
      });
    } catch (err) {
      setError(err.message || 'Something went wrong while matching your face.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRematch = () => {
    setMatchPayload(null);
    setError(null);
  };

  const bestMatchImage = matchPayload ? characterImagePath(matchPayload.bestMatch) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-70"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.3), transparent 60%), radial-gradient(circle at 80% 10%, rgba(129, 140, 248, 0.25), transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <header className="space-y-4 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-yellow-400 sm:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Game of Thrones Lookalike Cam
          </motion.h1>
          <motion.p
            className="mx-auto max-w-3xl text-base text-slate-200 sm:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Step into the realm of Westeros. We capture your visage, relay it to our bastion, and reveal the character whose
            essence mirrors yours.
          </motion.p>
          <motion.span
            className="inline-flex items-center justify-center rounded-full border border-yellow-500/60 px-4 py-1 text-xs uppercase tracking-widest text-yellow-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {backendHealth}
          </motion.span>
        </header>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/40">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                muted
              />

              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="h-16 w-16 rounded-full border-4 border-yellow-500/40 border-t-yellow-400"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={captureAndMatch}
                disabled={!isCameraReady || isProcessing}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-slate-500/60"
              >
                {isProcessing ? 'Matching...' : 'Reveal My GOT Match'}
              </button>

              <button
                type="button"
                onClick={handleRematch}
                disabled={isProcessing || !matchPayload}
                className="text-sm text-slate-300 transition hover:text-yellow-300 disabled:text-slate-600"
              >
                Rematch
              </button>
            </div>

            {error && (
              <p className="mt-4 text-sm text-rose-300">{error}</p>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={matchPayload ? 'result' : 'placeholder'}
              className="relative flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/40 p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
            >
              {matchPayload ? (
                <>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] items-start">
                    {bestMatchImage && (
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-yellow-500/30 bg-black/40">
                        <Image
                          src={bestMatchImage}
                          alt={`${matchPayload.bestMatch?.name ?? 'Game of Thrones character'} portrait`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 280px, 100vw"
                          priority
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-semibold text-yellow-400">Your closest counterpart</h2>
                      <p className="mt-1 text-sm text-slate-300">
                        {matchPayload.bestMatch
                          ? `Our citadel records suggest you share ${matchPayload.bestMatch.similarity}% resemblance with ${matchPayload.bestMatch.name}.`
                          : 'No familiar visage discovered this time. Try another capture.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {matchPayload.matches?.map((match) => {
                      const imageSrc = characterImagePath(match);
                      return (
                        <motion.div
                          key={match.name}
                          layout
                          className="rounded-2xl bg-black/40 p-4 shadow-inner"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-4">
                            {imageSrc && (
                              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-yellow-400/40">
                                <Image
                                  src={imageSrc}
                                  alt={`${match.name} portrait`}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-lg font-semibold text-white">{match.name}</p>
                              <p className={`text-xs uppercase tracking-widest ${statusColor(match.passedThreshold)}`}>
                                {match.passedThreshold ? 'Within alliance threshold' : 'Outside threshold'}
                              </p>
                              <p className="mt-2 text-xs text-slate-400">Distance score: {match.distance.toFixed(4)}</p>
                            </div>
                            <span className="text-2xl font-bold text-yellow-400">{match.similarity}%</span>
                          </div>
                          <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500"
                              style={{ width: `${Math.max(match.similarity, 4)}%` }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <h2 className="text-xl font-semibold text-yellow-300">Awaiting your visage</h2>
                  <p className="mt-2 max-w-sm text-sm text-slate-300">
                    {"Align yourself within the frame and tap \"Reveal My GOT Character\" to let our seers compare you to the legends of Westeros."}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {matchHistory.length > 0 && (
          <motion.section
            className="rounded-3xl border border-white/5 bg-slate-900/30 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent reveals</h3>
              <span className="text-xs uppercase tracking-widest text-slate-400">Last {matchHistory.length} matches</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matchHistory.map((entry) => (
                <motion.article
                  key={entry.timestamp}
                  className="rounded-2xl border border-white/5 bg-black/30 p-4"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-sm text-slate-300">
                    {entry.bestMatch
                      ? `Matched with ${entry.bestMatch.name}`
                      : 'No match detected'}
                  </p>
                  {entry.bestMatch && (
                    <p className="mt-2 text-2xl font-semibold text-yellow-400">{entry.bestMatch.similarity}%</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
