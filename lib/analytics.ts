export function trackEvent(name: string, metadata?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.log("[Angles Telemetry] " + name, metadata ?? {});
  }
  try {
    const customWindow = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof customWindow.gtag === "function") {
      customWindow.gtag("event", name, metadata);
    }
  } catch {}
}