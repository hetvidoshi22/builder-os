import { Redirect } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function Index() {
  const { isComplete } = useOnboardingStore();

  if (isComplete) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/landing" />;
}
