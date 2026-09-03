import { useEffect } from 'react'

/**
 * Cabin hum, generated rather than shipped: brown noise through a low-pass,
 * faded in so it never announces itself. No audio asset, no network.
 */
export function useAmbientAudio(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return

    const AudioCtor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtor) return

    const ctx = new AudioCtor()
    void ctx.resume()

    const seconds = 4
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const channel = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < channel.length; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      channel[i] = last * 3.5
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 380

    const gain = ctx.createGain()
    gain.gain.value = 0

    source.connect(lowpass).connect(gain).connect(ctx.destination)
    source.start()
    gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 3)

    return () => {
      try {
        source.stop()
      } catch {
        /* already stopped */
      }
      void ctx.close()
    }
  }, [enabled])
}
