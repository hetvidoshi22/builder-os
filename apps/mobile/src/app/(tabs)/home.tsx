import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import {
  Zap,
  Flame,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Github,
  Link as LinkIcon,
  TrendingUp,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { profile, goal, skills } = useOnboardingStore();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
      >
        {/* Header / Profile Card */}
        <View style={{ padding: Spacing.xl }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: Spacing.xl,
            }}
          >
            <View>
              <Text style={Typography.h2}>Welcome, {profile.fullName.split(' ')[0]}</Text>
              <Text style={[Typography.caption, { color: Colors.textMuted }]}>
                @{profile.username}
              </Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: Colors.surfaceHighlight,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20 }}>🚀</Text>
            </View>
          </View>

          <LinearGradient
            colors={[Colors.surfaceHighlight, Colors.surface]}
            style={{
              borderRadius: 24,
              padding: Spacing.xl,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: Spacing.lg,
              }}
            >
              <View>
                <Text
                  style={[Typography.caption, { textTransform: 'uppercase', letterSpacing: 1 }]}
                >
                  Current Goal
                </Text>
                <Text style={[Typography.h3, { marginTop: 4 }]}>{goal || 'Set a goal'}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={[Typography.caption, { textTransform: 'uppercase', letterSpacing: 1 }]}
                >
                  Builder Score
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <Zap size={18} color={Colors.accent} fill={Colors.accent} />
                  <Text style={[Typography.h2, { fontSize: 28 }]}>450</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: Spacing.xl }}>
              <StatItem
                icon={<Flame size={16} color={Colors.warning} />}
                label="Streak"
                value="12 Days"
              />
              <StatItem
                icon={<Trophy size={16} color={Colors.success} />}
                label="Rank"
                value="#142"
              />
              <StatItem
                icon={<TrendingUp size={16} color={Colors.accent} />}
                label="XP"
                value="2.4k"
              />
            </View>
          </LinearGradient>
        </View>

        {/* Portfolio Readiness */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Portfolio Readiness</Text>
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 20,
              padding: Spacing.lg,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: Spacing.sm,
              }}
            >
              <Text style={[Typography.body, { fontWeight: '600' }]}>85% Complete</Text>
              <Text style={{ color: Colors.success, fontSize: 12 }}>Almost there!</Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: Colors.surfaceHighlight,
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: Spacing.lg,
              }}
            >
              <View style={{ height: '100%', width: '85%', backgroundColor: Colors.success }} />
            </View>

            <View style={{ gap: Spacing.sm }}>
              <MissingItem label="GitHub URL" />
              <MissingItem label="Portfolio URL" />
            </View>
          </View>
        </View>

        {/* Projects */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: Spacing.md,
            }}
          >
            <Text style={Typography.h3}>Projects</Text>
            <TouchableOpacity>
              <Text style={{ color: Colors.accent }}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: Spacing.md }}
          >
            <ProjectCard title="Resume Analyzer" category="NLP / Python" />
            <ProjectCard title="Text Summarizer API" category="FastAPI" />
            <ProjectCard title="Stock Sentiment Bot" category="ML" />
          </ScrollView>
        </View>

        {/* Daily Progress / Heatmap Placeholder */}
        <View style={{ paddingHorizontal: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Daily Momentum</Text>
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 20,
              padding: Spacing.lg,
              borderWidth: 1,
              borderColor: Colors.border,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <View key={i} style={{ flexDirection: 'column', gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <View
                      key={j}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        backgroundColor:
                          Math.random() > 0.5 ? Colors.success : Colors.surfaceHighlight,
                        opacity: Math.random(),
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
            <Text style={[Typography.caption, { marginTop: Spacing.md }]}>
              128 contributions this month
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {icon}
        <Text style={{ color: Colors.text, fontWeight: '600' }}>{value}</Text>
      </View>
      <Text style={[Typography.caption, { fontSize: 11 }]}>{label}</Text>
    </View>
  );
}

function MissingItem({ label }: { label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <AlertCircle size={14} color={Colors.warning} />
      <Text style={{ color: Colors.textMuted, fontSize: 13 }}>Missing: {label}</Text>
    </View>
  );
}

function ProjectCard({ title, category }: { title: string; category: string }) {
  return (
    <TouchableOpacity
      style={{
        width: 160,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 80,
          backgroundColor: Colors.surfaceHighlight,
          borderRadius: 12,
          marginBottom: Spacing.sm,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Zap size={24} color={Colors.textMuted} />
      </View>
      <Text style={{ color: Colors.text, fontWeight: '600', fontSize: 14 }} numberOfLines={1}>
        {title}
      </Text>
      <Text style={{ color: Colors.textMuted, fontSize: 11, marginTop: 2 }}>{category}</Text>
    </TouchableOpacity>
  );
}
