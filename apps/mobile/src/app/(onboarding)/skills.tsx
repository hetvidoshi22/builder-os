import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore, Skill } from '@/store/onboardingStore';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react-native';

const SKILLS: Skill[] = [
  'Python',
  'Machine Learning',
  'Data Analysis',
  'SQL',
  'Pandas',
  'NumPy',
  'NLP',
  'Java',
  'React',
  'JavaScript',
  'Git',
  'FastAPI',
];

export default function SkillsOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { skills, toggleSkill } = useOnboardingStore();

  const handleNext = () => {
    if (skills.length === 0) return;
    router.push('/interests');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: Spacing.xl }}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>

        <Text style={Typography.h2}>What are your skills?</Text>
        <Text style={[Typography.caption, { marginTop: Spacing.xs, marginBottom: Spacing.xxl }]}>
          Step 3 of 4: Mapping your toolkit
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: Spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {SKILLS.map((item) => {
            const isSelected = skills.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleSkill(item)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: isSelected ? Colors.accent : Colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: Spacing.lg,
                  paddingVertical: Spacing.md,
                  borderWidth: 1,
                  borderColor: isSelected ? Colors.accent : Colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? Colors.background : Colors.text,
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  {item}
                </Text>
                {isSelected && <Check size={16} color={Colors.background} strokeWidth={3} />}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <View style={{ padding: Spacing.xl, paddingBottom: insets.bottom + Spacing.xl }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={skills.length === 0}
          style={{
            backgroundColor: skills.length > 0 ? Colors.primary : Colors.surfaceHighlight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            borderRadius: 16,
            gap: 8,
            opacity: skills.length > 0 ? 1 : 0.5,
          }}
        >
          <Text style={{ color: Colors.background, fontSize: 18, fontWeight: 'bold' }}>Next</Text>
          <ArrowRight size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
