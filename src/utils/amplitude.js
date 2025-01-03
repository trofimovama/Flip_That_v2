import * as amplitude from '@amplitude/analytics-browser';

const initializeAmplitude = () => {
    amplitude.init(process.env.AMPLITUDE_API_KEY, null, {
        defaultTracking: true,
    });
};

export const trackEvent = (eventName, eventProperties = {}) => {
    amplitude.track(eventName, eventProperties);
};

export default initializeAmplitude;
