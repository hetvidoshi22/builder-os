import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { ChevronLeft, ArrowRight } from 'lucide-react-native';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function ProfileOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, setProfile } = useOnboardingStore();

  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel);
  const [location, setLocation] = useState(profile.location);

  const handleNext = () => {
    if (!fullName || !username) return;
    setProfile({ fullName, username, educationLevel, location });
    router.push('/goals');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: Spacing.xl }}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>

        <Text style={Typography.h2}>Create Builder Profile</Text>
        <Text style={[Typography.caption, { marginTop: Spacing.xs, marginBottom: Spacing.xxl }]}>
          Step 1 of 4: The basics
        </Text>
      </View>

      <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={{ flex: 1, paddingHorizontal: Spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            label="Username"
            placeholder="johndoe_builder"
            value={username}
            onChangeText={setUsername}
          />
          <InputField
            label="Education Level"
            placeholder="University of Mumbai, CS"
            value={educationLevel}
            onChangeText={setEducationLevel}
          />
          <InputField
            label="Location"
            placeholder="Mumbai, India"
            value={location}
            onChangeText={setLocation}
          />
        </ScrollView>

        <View style={{ padding: Spacing.xl, paddingBottom: insets.bottom + Spacing.xl }}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={!fullName || !username}
            style={{
              backgroundColor: fullName && username ? Colors.primary : Colors.surfaceHighlight,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 18,
              borderRadius: 16,
              gap: 8,
              opacity: fullName && username ? 1 : 0.5,
            }}
          >
            <Text style={{ color: Colors.background, fontSize: 18, fontWeight: 'bold' }}>Next</Text>
            <ArrowRight size={20} color={Colors.background} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingAnimatedView>
    </View>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
}) {
  return (
    <View style={{ marginBottom: Spacing.lg }}>
      <Text
        style={[
          Typography.caption,
          { color: Colors.text, marginBottom: Spacing.sm, fontWeight: '600' },
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 12,
          padding: Spacing.md,
          color: Colors.text,
          borderWidth: 1,
          borderColor: Colors.border,
          fontSize: 16,
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={label === 'Username' ? 'none' : 'words'}
      />
    </View>
  );
}
