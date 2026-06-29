import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { Event, getEvent } from "@/lib/api";

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      if (!id) {
        setErrorMessage("Missing event id.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getEvent(id);

        if (isMounted) {
          setEvent(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Event could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={router.back} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="smallBold">Back to calendar</ThemedText>
          </Pressable>

          {isLoading && (
            <ThemedView type="backgroundElement" style={styles.statePanel}>
              <ThemedText>Loading event...</ThemedText>
            </ThemedView>
          )}

          {errorMessage && (
            <ThemedView type="backgroundElement" style={styles.statePanel}>
              <ThemedText type="smallBold">Event could not be loaded</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {errorMessage}
              </ThemedText>
            </ThemedView>
          )}

          {event && <EventDetail event={event} />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function EventDetail({ event }: { event: Event }) {
  const startDate = formatDateTime(event.startDate);
  const endDate = formatDateTime(event.endDate);
  const location = [event.track.city, event.track.country].filter(Boolean).join(", ");

  return (
    <>
      <ThemedView style={styles.header}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          {event.series.name}
        </ThemedText>
        <ThemedText type="subtitle">{event.name}</ThemedText>
        {event.description && (
          <ThemedText themeColor="textSecondary">{event.description}</ThemedText>
        )}
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.infoPanel}>
        <InfoRow label="Starts" value={startDate} />
        <InfoRow label="Ends" value={endDate} />
        <InfoRow label="Track" value={event.track.name} />
        <InfoRow label="Location" value={location} />
      </ThemedView>

      {event.track.description && (
        <ThemedView type="backgroundElement" style={styles.infoPanel}>
          <ThemedText type="smallBold">Track note</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {event.track.description}
          </ThemedText>
        </ThemedView>
      )}

      {event.officialUrl && (
        <Pressable
          onPress={() => {
            void Linking.openURL(event.officialUrl ?? "");
          }}
          style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
        >
          <ThemedText type="smallBold">Open official website</ThemedText>
        </Pressable>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={styles.infoRow}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.infoValue}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
  },
  pressed: {
    opacity: 0.72,
  },
  header: {
    gap: Spacing.two,
    backgroundColor: "transparent",
  },
  statePanel: {
    gap: Spacing.one,
    padding: Spacing.four,
    borderRadius: Spacing.two,
  },
  infoPanel: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.two,
  },
  infoRow: {
    gap: Spacing.one,
    backgroundColor: "transparent",
  },
  infoValue: {
    fontSize: 16,
  },
  linkButton: {
    padding: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: "center",
    backgroundColor: "#E10600",
  },
});
