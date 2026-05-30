import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import {
  ArrowUpRight,
  Clock,
  Target,
  Sparkles,
  X,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  Trophy,
  Code,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  getOpportunities,
  getSkillGaps,
  getRecommendedActions,
  type Opportunity,
} from '@/utils/personalizationData';

export default function NavigatorScreen() {
  const insets = useSafeAreaInsets();
  const { goal, skills, interests } = useOnboardingStore();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [startedTasks, setStartedTasks] = useState<string[]>([]);

  const actions = getRecommendedActions(goal, skills, interests);
  const opportunities = getOpportunities(goal, interests);
  const skillGaps = getSkillGaps(goal, interests);

  const goalLabel = goal || 'Your Goal';

  const toggleTask = (title: string) => {
    setStartedTasks((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
      >
        {/* Header */}
        <View style={{ padding: Spacing.xl }}>
          <Text style={Typography.h1}>Navigator</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted }]}>
            Your personalized path to {goalLabel}.
          </Text>
        </View>

        {/* Goal Progress */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 24,
              padding: Spacing.xl,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginBottom: Spacing.lg,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Target size={22} color={Colors.accent} />
              </View>
              <View>
                <Text style={{ color: Colors.text, fontSize: 18, fontWeight: '700' }}>
                  {goalLabel}
                </Text>
                <Text style={{ color: Colors.textMuted, fontSize: 13 }}>
                  {startedTasks.length} of {actions.length} tasks started
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: Colors.surfaceHighlight,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${Math.max(15, (startedTasks.length / actions.length) * 100)}%`,
                  backgroundColor: Colors.accent,
                }}
              />
            </View>
          </View>
        </View>

        {/* Recommended Actions */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Recommended Actions</Text>
          <View style={{ gap: Spacing.md }}>
            {actions.map((action) => (
              <ActionCard
                key={action.title}
                title={action.title}
                reason={action.reason}
                time={action.time}
                started={startedTasks.includes(action.title)}
                onStart={() => toggleTask(action.title)}
              />
            ))}
          </View>
        </View>

        {/* Skill Gap Analysis */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Skill Gap Analysis</Text>
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 20,
              padding: Spacing.lg,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={[Typography.caption, { marginBottom: Spacing.md }]}>
              To reach your goal, focus on these:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {skillGaps.map((gap) => (
                <GapBadge key={gap} label={gap} />
              ))}
            </View>
            <View
              style={{
                marginTop: Spacing.lg,
                padding: Spacing.md,
                backgroundColor: Colors.surfaceHighlight,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Clock size={16} color={Colors.accent} />
              <Text style={{ color: Colors.text, fontSize: 13, fontWeight: '500' }}>
                Weekly Action Plan: 8-10 Hours
              </Text>
            </View>
          </View>
        </View>

        {/* Matched Opportunities */}
        <View style={{ paddingHorizontal: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Matched Opportunities</Text>
          <View style={{ gap: Spacing.md }}>
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.title}
                opportunity={opp}
                onViewDetails={() => setSelectedOpportunity(opp)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Opportunity Detail Modal */}
      <Modal
        visible={!!selectedOpportunity}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedOpportunity(null)}
      >
        {selectedOpportunity && (
          <OpportunityDetailSheet
            opportunity={selectedOpportunity}
            onClose={() => setSelectedOpportunity(null)}
          />
        )}
      </Modal>
    </View>
  );
}

function ActionCard({
  title,
  reason,
  time,
  started,
  onStart,
}: {
  title: string;
  reason: string;
  time: string;
  started: boolean;
  onStart: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: started ? Colors.success : Colors.border,
      }}
    >
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Sparkles size={12} color={Colors.accent} />
            <Text style={{ color: Colors.textMuted, fontSize: 12 }}>{reason}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.surfaceHighlight,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: Colors.text, fontSize: 11, fontWeight: '600' }}>{time}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onStart}
        activeOpacity={0.7}
        style={{
          marginTop: Spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: started ? 'rgba(34,197,94,0.12)' : Colors.surfaceHighlight,
          borderRadius: 10,
          alignSelf: 'flex-start',
        }}
      >
        {started ? (
          <CheckCircle2 size={14} color={Colors.success} />
        ) : (
          <ArrowUpRight size={14} color={Colors.accent} />
        )}
        <Text style={{ color: started ? Colors.success : Colors.accent, fontWeight: '600' }}>
          {started ? 'In Progress' : 'Start Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function GapBadge({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
      }}
    >
      <Text style={{ color: Colors.error, fontSize: 12, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

function OpportunityCard({
  opportunity,
  onViewDetails,
}: {
  opportunity: Opportunity;
  onViewDetails: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 16,
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
          marginBottom: 4,
        }}
      >
        <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '700' }}>
          {opportunity.title}
        </Text>
        <View
          style={{
            backgroundColor: 'rgba(34,197,94,0.12)',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: Colors.success, fontWeight: '700', fontSize: 13 }}>
            {opportunity.match}
          </Text>
        </View>
      </View>
      <Text style={{ color: Colors.textMuted, fontSize: 12, lineHeight: 18, marginBottom: 4 }}>
        {opportunity.company} · {opportunity.type}
      </Text>
      <Text style={{ color: Colors.textMuted, fontSize: 12, lineHeight: 18 }}>
        {opportunity.reason}
      </Text>
      <TouchableOpacity
        onPress={onViewDetails}
        activeOpacity={0.75}
        style={{
          marginTop: Spacing.md,
          backgroundColor: Colors.accent,
          paddingVertical: 10,
          borderRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>View Details</Text>
        <ExternalLink size={13} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function OpportunityDetailSheet({
  opportunity,
  onClose,
}: {
  opportunity: Opportunity;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [applied, setApplied] = useState(false);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top + Spacing.md }}
    >
      {/* Sheet Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Spacing.xl,
          marginBottom: Spacing.xl,
        }}
      >
        <Text style={[Typography.h2, { flex: 1 }]}>{opportunity.title}</Text>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: Colors.surfaceHighlight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <X size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.xl,
          paddingBottom: insets.bottom + 100,
        }}
      >
        {/* Match Badge */}
        <LinearGradient
          colors={['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.05)']}
          style={{
            borderRadius: 16,
            padding: Spacing.lg,
            marginBottom: Spacing.xl,
            borderWidth: 1,
            borderColor: 'rgba(34,197,94,0.2)',
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: Colors.success, fontWeight: '700', fontSize: 28 }}>
                {opportunity.match} Match
              </Text>
              <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>
                {opportunity.reason}
              </Text>
            </View>
            <Trophy size={36} color={Colors.success} />
          </View>
        </LinearGradient>

        {/* Meta */}
        <View style={{ gap: Spacing.sm, marginBottom: Spacing.xl }}>
          <MetaRow icon={<Briefcase size={15} color={Colors.accent} />} label={opportunity.type} />
          <MetaRow icon={<Code size={15} color={Colors.accent} />} label={opportunity.company} />
          <MetaRow icon={<Clock size={15} color={Colors.warning} />} label={opportunity.deadline} />
        </View>

        {/* Description */}
        <Text style={[Typography.h3, { marginBottom: Spacing.sm }]}>About This Opportunity</Text>
        <Text
          style={{
            color: Colors.textMuted,
            fontSize: 14,
            lineHeight: 22,
            marginBottom: Spacing.xl,
          }}
        >
          {opportunity.description}
        </Text>

        {/* Requirements */}
        <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Requirements</Text>
        <View style={{ gap: 10, marginBottom: Spacing.xl }}>
          {opportunity.requirements.map((req) => (
            <View key={req} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={16} color={Colors.success} />
              <Text style={{ color: Colors.text, fontSize: 14 }}>{req}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Apply Button pinned at bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: Spacing.xl,
          paddingBottom: insets.bottom + Spacing.md,
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderColor: Colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => setApplied(true)}
          activeOpacity={0.8}
          style={{
            backgroundColor: applied ? Colors.success : Colors.accent,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {applied ? (
            <CheckCircle2 size={18} color="#fff" />
          ) : (
            <ExternalLink size={18} color="#fff" />
          )}
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            {applied ? 'Application Sent!' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MetaRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {icon}
      <Text style={{ color: Colors.text, fontSize: 14 }}>{label}</Text>
    </View>
  );
}
