import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { MotiView, MotiText } from 'moti';
import { Loader2, CheckCircle2 } from 'lucide-react-native';

export default function MatchingOnboarding() {
  const router = useRouter();
  const { goal, interests, skills } = useOnboardingStore();
  const [step, setStep] = useState(0);

  const matchingSteps = [
    `Matching you with ${interests[0] || 'AI/ML'} builders...`,
    `Searching for ${skills[0] || 'Python'} developers...`,
    `Finding ${goal === 'Get my first internship' ? 'internship seekers' : 'peers'} on your path...`,
    'Found 47 builders on your path',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= matchingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => router.push('/personalization'), 1500);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [matchingSteps.length, router]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
      }}
    >
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Spacing.xl,
        }}
      >
        {step < matchingSteps.length - 1 ? (
          <MotiView
            from={{ rotate: '0deg' }}
            animate={{ rotate: '360deg' }}
            transition={{ loop: true, duration: 1000, type: 'timing' }}
          >
            <Loader2 color={Colors.accent} size={32} />
          </MotiView>
        ) : (
          <CheckCircle2 color={Colors.success} size={32} />
        )}
      </MotiView>

      <MotiText
        key={step}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={[Typography.h3, { textAlign: 'center' }]}
      >
        {matchingSteps[step]}
      </MotiText>

      <View
        style={{
          width: '100%',
          height: 4,
          backgroundColor: Colors.surface,
          borderRadius: 2,
          marginTop: Spacing.xxl,
          overflow: 'hidden',
        }}
      >
        <MotiView
          from={{ width: '0%' }}
          animate={{ width: `${((step + 1) / matchingSteps.length) * 100}%` }}
          style={{ height: '100%', backgroundColor: Colors.accent }}
        />
      </View>
    </View>
  );
}
