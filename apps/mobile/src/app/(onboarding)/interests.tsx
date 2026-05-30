import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore, Interest } from '@/store/onboardingStore';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react-native';

const INTERESTS: Interest[] = [
  'AI/ML',
  'Data Science',
  'Web Development',
  'Cybersecurity',
  'App Development',
  'Open Source',
];

export default function InterestsOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { interests, toggleInterest } = useOnboardingStore();

  const handleNext = () => {
    if (interests.length === 0) return;
    router.push('/matching');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: Spacing.xl }}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>

        <Text style={Typography.h2}>What are your interests?</Text>
        <Text style={[Typography.caption, { marginTop: Spacing.xs, marginBottom: Spacing.xxl }]}>
          Step 4 of 4: Finding your domain
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: Spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {INTERESTS.map((item) => {
            const isSelected = interests.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleInterest(item)}
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
          disabled={interests.length === 0}
          style={{
            backgroundColor: interests.length > 0 ? Colors.primary : Colors.surfaceHighlight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            borderRadius: 16,
            gap: 8,
            opacity: interests.length > 0 ? 1 : 0.5,
          }}
        >
          <Text style={{ color: Colors.background, fontSize: 18, fontWeight: 'bold' }}>
            Find My Path
          </Text>
          <ArrowRight size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
