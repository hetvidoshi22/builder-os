import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { ArrowRight, Zap, Globe, Users } from 'lucide-react-native';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.15)', 'transparent']}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.content, { paddingTop: insets.top + Spacing.xxl }]}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={styles.header}
        >
          <View style={styles.badge}>
            <Zap size={12} color={Colors.accent} fill={Colors.accent} />
            <Text style={styles.badgeText}>DevHub AI & Product Assignment</Text>
          </View>

          <Text style={Typography.h1}>BuilderOS</Text>
          <Text style={[Typography.body, styles.subtitle]}>
            The operating system for the next generation of builders.
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 300 }}
          style={styles.featureContainer}
        >
          <FeatureItem
            icon={<Users size={20} color={Colors.text} />}
            title="Belong"
            desc="Find your circle of builders."
          />
          <FeatureItem
            icon={<Globe size={20} color={Colors.text} />}
            title="Direction"
            desc="Personalized navigator for your goal."
          />
          <FeatureItem
            icon={<Zap size={20} color={Colors.text} />}
            title="Momentum"
            desc="Track progress, score, and streaks."
          />
        </MotiView>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight size={20} color={Colors.background} />
        </TouchableOpacity>
        <Text style={styles.footerText}>Built for builders, by builders.</Text>
      </View>
    </View>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconCircle}>{icon}</View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    marginBottom: Spacing.md,
    gap: 6,
  },
  badgeText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    maxWidth: '80%',
  },
  featureContainer: {
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  featureDesc: {
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    width: '100%',
    gap: 8,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: Spacing.md,
    opacity: 0.5,
  },
});
