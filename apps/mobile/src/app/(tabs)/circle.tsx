import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@/components/Theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import {
  Users,
  MessageSquare,
  Handshake,
  Calendar,
  Sparkles,
  UserPlus,
  UserCheck,
  X,
  Send,
  ArrowRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  getBuilders,
  getPulseItems,
  type Builder,
  type PulseItem,
} from '@/utils/personalizationData';

export default function CircleScreen() {
  const insets = useSafeAreaInsets();
  const { goal, interests, skills } = useOnboardingStore();

  const [connectedBuilders, setConnectedBuilders] = useState<string[]>([]);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [selectedPulse, setSelectedPulse] = useState<PulseItem | null>(null);

  const builders = getBuilders(goal, interests, skills);
  const pulseItems = getPulseItems(goal, interests);

  const toggleConnect = (name: string) => {
    setConnectedBuilders((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
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
          <Text style={Typography.h1}>Builder Circle</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted }]}>
            Connect with builders on the same path.
          </Text>
        </View>

        {/* Recommended Builders */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Recommended Builders</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ gap: Spacing.md }}
          >
            {builders.map((builder) => (
              <BuilderCard
                key={builder.name}
                builder={builder}
                connected={connectedBuilders.includes(builder.name)}
                onConnect={() => toggleConnect(builder.name)}
                onViewProfile={() => setSelectedBuilder(builder)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Builder Pulse */}
        <View style={{ paddingHorizontal: Spacing.xl }}>
          <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Builder Pulse</Text>
          <View style={{ gap: Spacing.md }}>
            {pulseItems.map((item) => (
              <PulseItemCard
                key={item.title}
                item={item}
                onViewDiscussion={() => setSelectedPulse(item)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Builder Profile Modal */}
      <Modal
        visible={!!selectedBuilder}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedBuilder(null)}
      >
        {selectedBuilder && (
          <BuilderProfileSheet
            builder={selectedBuilder}
            connected={connectedBuilders.includes(selectedBuilder.name)}
            onConnect={() => toggleConnect(selectedBuilder.name)}
            onClose={() => setSelectedBuilder(null)}
          />
        )}
      </Modal>

      {/* Discussion Modal */}
      <Modal
        visible={!!selectedPulse}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedPulse(null)}
      >
        {selectedPulse && (
          <DiscussionSheet item={selectedPulse} onClose={() => setSelectedPulse(null)} />
        )}
      </Modal>
    </View>
  );
}

function getPulseIcon(iconKey: PulseItem['iconKey']) {
  switch (iconKey) {
    case 'users':
      return <Users size={18} color={Colors.accent} />;
    case 'calendar':
      return <Calendar size={18} color={Colors.warning} />;
    case 'handshake':
      return <Handshake size={18} color={Colors.success} />;
    case 'message':
      return <MessageSquare size={18} color={Colors.accent} />;
  }
}

function BuilderCard({
  builder,
  connected,
  onConnect,
  onViewProfile,
}: {
  builder: Builder;
  connected: boolean;
  onConnect: () => void;
  onViewProfile: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onViewProfile}
      activeOpacity={0.85}
      style={{
        width: 220,
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: connected ? Colors.success : Colors.border,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: Spacing.md }}
      >
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
          <Text style={{ fontSize: 24 }}>{builder.emoji}</Text>
        </View>
        <View>
          <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '700' }}>
            {builder.name}
          </Text>
          <Text style={{ color: Colors.success, fontSize: 13, fontWeight: '700' }}>
            {builder.match} Match
          </Text>
        </View>
      </View>

      <View style={{ gap: 4, marginBottom: Spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
          <Sparkles size={12} color={Colors.accent} style={{ marginTop: 2 }} />
          <Text style={{ color: Colors.textMuted, fontSize: 12, flex: 1 }} numberOfLines={1}>
            Same Goal: {builder.sameGoal}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
          <Sparkles size={12} color={Colors.accent} style={{ marginTop: 2 }} />
          <Text style={{ color: Colors.textMuted, fontSize: 12, flex: 1 }} numberOfLines={1}>
            Interest: {builder.sameInterest}
          </Text>
        </View>
        <Text style={{ color: Colors.text, fontSize: 12 }} numberOfLines={1}>
          Skills: {builder.sharedSkills}
        </Text>
      </View>

      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          onConnect();
        }}
        activeOpacity={0.75}
        style={{
          backgroundColor: connected ? 'rgba(34,197,94,0.15)' : Colors.primary,
          paddingVertical: 10,
          borderRadius: 12,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
          borderWidth: connected ? 1 : 0,
          borderColor: connected ? Colors.success : 'transparent',
        }}
      >
        {connected ? (
          <UserCheck size={14} color={Colors.success} />
        ) : (
          <UserPlus size={14} color={Colors.background} />
        )}
        <Text
          style={{
            color: connected ? Colors.success : Colors.background,
            fontWeight: '700',
          }}
        >
          {connected ? 'Connected' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function PulseItemCard({
  item,
  onViewDiscussion,
}: {
  item: PulseItem;
  onViewDiscussion: () => void;
}) {
  return (
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
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: Colors.surfaceHighlight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {getPulseIcon(item.iconKey)}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.text, fontWeight: '600', fontSize: 15 }}>{item.title}</Text>
          <Text style={{ color: Colors.textMuted, fontSize: 12 }}>
            {item.author} · {item.time}
          </Text>
        </View>
      </View>
      <Text style={{ color: Colors.textMuted, fontSize: 13, lineHeight: 20 }}>{item.desc}</Text>
      <TouchableOpacity
        onPress={onViewDiscussion}
        activeOpacity={0.75}
        style={{
          marginTop: Spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: Colors.surfaceHighlight,
          borderRadius: 10,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: Colors.accent, fontWeight: '600', fontSize: 13 }}>
          View Discussion
        </Text>
        <ArrowRight size={13} color={Colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

function BuilderProfileSheet({
  builder,
  connected,
  onConnect,
  onClose,
}: {
  builder: Builder;
  connected: boolean;
  onConnect: () => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top + Spacing.md }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: Spacing.xl,
          marginBottom: Spacing.md,
        }}
      >
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
          paddingBottom: insets.bottom + 120,
        }}
      >
        {/* Profile Hero */}
        <LinearGradient
          colors={[Colors.surfaceHighlight, Colors.surface]}
          style={{
            borderRadius: 24,
            padding: Spacing.xl,
            alignItems: 'center',
            marginBottom: Spacing.xl,
            borderWidth: 1,
            borderColor: Colors.border,
          }}
        >
          <Text style={{ fontSize: 56, marginBottom: Spacing.md }}>{builder.emoji}</Text>
          <Text style={{ color: Colors.text, fontSize: 22, fontWeight: '800' }}>
            {builder.name}
          </Text>
          <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 4 }}>
            {builder.location}
          </Text>
          <View
            style={{
              marginTop: Spacing.md,
              backgroundColor: 'rgba(34,197,94,0.15)',
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: 'rgba(34,197,94,0.3)',
            }}
          >
            <Text style={{ color: Colors.success, fontWeight: '700' }}>{builder.match} Match</Text>
          </View>
        </LinearGradient>

        {/* Bio */}
        <Text style={[Typography.h3, { marginBottom: Spacing.sm }]}>About</Text>
        <Text
          style={{
            color: Colors.textMuted,
            fontSize: 14,
            lineHeight: 22,
            marginBottom: Spacing.xl,
          }}
        >
          {builder.bio}
        </Text>

        {/* Why matched */}
        <Text style={[Typography.h3, { marginBottom: Spacing.sm }]}>Why You Match</Text>
        <View
          style={{
            backgroundColor: Colors.surface,
            borderRadius: 16,
            padding: Spacing.lg,
            borderWidth: 1,
            borderColor: Colors.border,
            marginBottom: Spacing.xl,
            gap: Spacing.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color={Colors.accent} />
            <Text style={{ color: Colors.text, fontSize: 14 }}>Same Goal: {builder.sameGoal}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color={Colors.accent} />
            <Text style={{ color: Colors.text, fontSize: 14 }}>
              Same Interest: {builder.sameInterest}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color={Colors.accent} />
            <Text style={{ color: Colors.text, fontSize: 14 }}>
              Shared Skills: {builder.sharedSkills}
            </Text>
          </View>
        </View>

        {/* Projects */}
        <Text style={[Typography.h3, { marginBottom: Spacing.md }]}>Projects</Text>
        <View style={{ gap: 10 }}>
          {builder.projects.map((project) => (
            <View
              key={project}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: Colors.surface,
                borderRadius: 12,
                padding: Spacing.md,
                borderWidth: 1,
                borderColor: Colors.border,
              }}
            >
              <Text style={{ fontSize: 16 }}>🛠</Text>
              <Text style={{ color: Colors.text, fontSize: 14, fontWeight: '500' }}>{project}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTA pinned at bottom */}
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
          flexDirection: 'row',
          gap: Spacing.md,
        }}
      >
        <TouchableOpacity
          onPress={onConnect}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: connected ? 'rgba(34,197,94,0.15)' : Colors.accent,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            borderWidth: connected ? 1 : 0,
            borderColor: connected ? Colors.success : 'transparent',
          }}
        >
          {connected ? (
            <UserCheck size={16} color={Colors.success} />
          ) : (
            <UserPlus size={16} color="#fff" />
          )}
          <Text
            style={{
              color: connected ? Colors.success : '#fff',
              fontWeight: '700',
              fontSize: 15,
            }}
          >
            {connected ? 'Connected!' : 'Connect'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: Colors.surfaceHighlight,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Send size={16} color={Colors.text} />
          <Text style={{ color: Colors.text, fontWeight: '700', fontSize: 15 }}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DiscussionSheet({ item, onClose }: { item: PulseItem; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [joined, setJoined] = useState(false);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top + Spacing.md }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Spacing.xl,
          marginBottom: Spacing.xl,
        }}
      >
        <Text style={[Typography.h3, { flex: 1 }]}>{item.title}</Text>
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
          paddingBottom: insets.bottom + 120,
        }}
      >
        {/* Author */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: Spacing.xl,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: Colors.surfaceHighlight,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {getPulseIcon(item.iconKey)}
          </View>
          <View>
            <Text style={{ color: Colors.text, fontWeight: '700', fontSize: 15 }}>
              {item.author}
            </Text>
            <Text style={{ color: Colors.textMuted, fontSize: 12 }}>{item.time}</Text>
          </View>
        </View>

        {/* Full Discussion */}
        <View
          style={{
            backgroundColor: Colors.surface,
            borderRadius: 20,
            padding: Spacing.lg,
            borderWidth: 1,
            borderColor: Colors.border,
            marginBottom: Spacing.xl,
          }}
        >
          <Text style={{ color: Colors.text, fontSize: 15, lineHeight: 24 }}>
            {item.discussion}
          </Text>
        </View>

        {/* Engagement */}
        <View style={{ flexDirection: 'row', gap: Spacing.md }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderRadius: 14,
              padding: Spacing.md,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text, fontWeight: '800', fontSize: 20 }}>24</Text>
            <Text style={{ color: Colors.textMuted, fontSize: 11 }}>Interested</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderRadius: 14,
              padding: Spacing.md,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text, fontWeight: '800', fontSize: 20 }}>8</Text>
            <Text style={{ color: Colors.textMuted, fontSize: 11 }}>Replies</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderRadius: 14,
              padding: Spacing.md,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ color: Colors.text, fontWeight: '800', fontSize: 20 }}>3</Text>
            <Text style={{ color: Colors.textMuted, fontSize: 11 }}>Joined</Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA pinned at bottom */}
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
          onPress={() => setJoined(true)}
          activeOpacity={0.8}
          style={{
            backgroundColor: joined ? Colors.success : Colors.accent,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {joined ? <UserCheck size={18} color="#fff" /> : <ArrowRight size={18} color="#fff" />}
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            {joined ? 'You are In!' : item.actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
