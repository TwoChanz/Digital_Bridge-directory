// lib/analytics.ts
export function logEvent(event: string, props: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }
}
