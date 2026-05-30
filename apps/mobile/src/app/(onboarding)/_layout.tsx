import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="landing" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="skills" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="matching" />
      <Stack.Screen name="personalization" />
    </Stack>
  );
}
