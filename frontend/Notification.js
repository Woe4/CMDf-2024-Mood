import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true
    }),
});

export default async function generateNotification() {
    return (
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Log your mood now!",
                body: 'How are you feeling today?'
            },
            trigger: {
                seconds: Math.floor(Math.random() * 59 * 60 * 24)
            }
        })
    )
}