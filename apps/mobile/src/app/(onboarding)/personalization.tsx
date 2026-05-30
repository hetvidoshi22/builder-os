import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Check, Sparkles, Navigation, Users, Trophy } from 'lucide-react-native';

export default function PersonalizationOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useOnboardingStore();

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: Spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginTop: Spacing.xxl, marginBottom: Spacing.xl }}>
          <Sparkles size={48} color={Colors.accent} />
          <Text style={[Typography.h2, { textAlign: 'center', marginTop: Spacing.md }]}>
            Personalizing BuilderOS
          </Text>
          <Text
            style={[
              Typography.body,
              { textAlign: 'center', color: Colors.textMuted, marginTop: Spacing.sm },
            ]}
          >
            Using your goals, skills, and interests to tailor your experience.
          </Text>
        </View>

        <View style={{ gap: Spacing.lg, marginBottom: Spacing.xl }}>
          <BenefitItem
            icon={<Navigation size={20} color={Colors.text} />}
            title="Builder Navigator"
            desc="Custom roadmap to reach your goal."
          />
          <BenefitItem
            icon={<Users size={20} color={Colors.text} />}
            title="Builder Circle"
            desc="Matched with builders on your path."
          />
          <BenefitItem
            icon={<Trophy size={20} color={Colors.text} />}
            title="Opportunities"
            desc="Internships and projects you qualify for."
          />
          <BenefitItem
            icon={<Sparkles size={20} color={Colors.text} />}
            title="Portfolio Roadmap"
            desc="Identify and close your skill gaps."
          />
        </View>
      </ScrollView>

      <View style={{ padding: Spacing.xl, paddingBottom: insets.bottom + Spacing.xl }}>
        <TouchableOpacity
          onPress={handleFinish}
          style={{
            backgroundColor: Colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            borderRadius: 16,
            gap: 8,
          }}
        >
          <Text style={{ color: Colors.background, fontSize: 18, fontWeight: 'bold' }}>
            Enter BuilderOS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BenefitItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.lg,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: Spacing.md,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.surfaceHighlight,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>{desc}</Text>
      </View>
    </View>
  );
}
