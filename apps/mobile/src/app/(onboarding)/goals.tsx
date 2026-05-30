import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore, Goal } from '@/store/onboardingStore';
import {
  ChevronLeft,
  ArrowRight,
  Target,
  Brain,
  Database,
  Trophy,
  Rocket,
  Briefcase,
  Layout,
} from 'lucide-react-native';

const GOALS: { label: Goal; icon: any; desc: string }[] = [
  {
    label: 'Get my first internship',
    icon: Briefcase,
    desc: 'Jumpstart your professional journey',
  },
  { label: 'Become an ML Engineer', icon: Brain, desc: 'Master machine learning & AI systems' },
  { label: 'Become a Data Scientist', icon: Database, desc: 'Extract insights from complex data' },
  { label: 'Win Hackathons', icon: Trophy, desc: 'Build fast and win big' },
  { label: 'Build a Startup', icon: Rocket, desc: 'Turn your ideas into a business' },
  { label: 'Freelance Projects', icon: Layout, desc: 'Earn by building for others' },
  { label: 'Improve My Portfolio', icon: Target, desc: 'Showcase your best work' },
];

export default function GoalsOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { goal, setGoal } = useOnboardingStore();

  const handleNext = () => {
    if (!goal) return;
    router.push('/skills');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: Spacing.xl }}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>

        <Text style={Typography.h2}>What is your main goal?</Text>
        <Text style={[Typography.caption, { marginTop: Spacing.xs, marginBottom: Spacing.xxl }]}>
          Step 2 of 4: Setting the direction
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: Spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        {GOALS.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => setGoal(item.label)}
            activeOpacity={0.7}
            style={{
              backgroundColor: goal === item.label ? 'rgba(59, 130, 246, 0.1)' : Colors.surface,
              borderRadius: 16,
              padding: Spacing.lg,
              marginBottom: Spacing.md,
              borderWidth: 1,
              borderColor: goal === item.label ? Colors.accent : Colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              gap: Spacing.md,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: goal === item.label ? Colors.accent : Colors.surfaceHighlight,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <item.icon size={24} color={goal === item.label ? Colors.background : Colors.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '600' }}>
                {item.label}
              </Text>
              <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>
                {item.desc}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <View style={{ padding: Spacing.xl, paddingBottom: insets.bottom + Spacing.xl }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!goal}
          style={{
            backgroundColor: goal ? Colors.primary : Colors.surfaceHighlight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            borderRadius: 16,
            gap: 8,
            opacity: goal ? 1 : 0.5,
          }}
        >
          <Text style={{ color: Colors.background, fontSize: 18, fontWeight: 'bold' }}>Next</Text>
          <ArrowRight size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
