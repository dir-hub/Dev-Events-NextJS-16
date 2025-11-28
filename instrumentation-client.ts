// instrumentation-client.ts
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined;
    const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST as string) || "https://app.posthog.com";

    if (!key) {
        // Useful debug in the browser console during development
        // eslint-disable-next-line no-console
        console.warn("PostHog: NEXT_PUBLIC_POSTHOG_KEY is not set. Skipping init.");
    } else {
        try {
            posthog.init(key, {
                api_host: host,
                capture_exceptions: true,
                // enable autocapture (default) and any other options here
            });

            // expose for debugging from the console
            // @ts-ignore
            window.posthog = posthog;

            // quick diagnostic event so the onboarding page can pick it up
            posthog.capture("dev_client_init", { timestamp: Date.now() });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("PostHog init error:", err);
        }
    }
}