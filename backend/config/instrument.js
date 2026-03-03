// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://24e9d2d425e8033bc63f08e2ccd30801@o4510981479268352.ingest.us.sentry.io/4510981482938368",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
 integrations: [
    Sentry.mongooseIntegration(),
  ],
  tracesSampleRate: 1.0, // Use 0.1 in production
  sendDefaultPii: false, // Disable sending sensitive user data
});