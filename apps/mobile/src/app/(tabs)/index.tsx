import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { apiBaseUrl, Event, getEvents } from "@/lib/api";

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await getEvents();

        if (isMounted) {
          setEvents(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Events could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              Quest GP
            </ThemedText>
            <ThemedText type="subtitle">Racing Calendar</ThemedText>
            <ThemedText themeColor="textSecondary">
              Discover the first MVP events from your motorsport travel companion.
            </ThemedText>
            <ThemedText type="code" themeColor="textSecondary">
              API {apiBaseUrl}
            </ThemedText>
          </ThemedView>

          {isLoading && (
            <ThemedView type="backgroundElement" style={styles.statePanel}>
              <ThemedText>Loading events...</ThemedText>
            </ThemedView>
          )}

          {errorMessage && (
            <ThemedView type="backgroundElement" style={styles.statePanel}>
              <ThemedText type="smallBold">API connection needed</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {errorMessage}
              </ThemedText>
            </ThemedView>
          )}

          {!isLoading &&
            !errorMessage &&
            events.map((event) => <EventCard key={event.id} event={event} />)}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  const startDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(event.startDate));

  return (
    <Pressable
      onPress={() => {
        const href = {
          pathname: "/events/[id]",
          params: { id: event.id },
        } as unknown as Href;

        router.push(href);
      }}
      style={({ pressed }) => [styles.cardPressable, pressed && styles.pressed]}
    >
      <ThemedView type="backgroundElement" style={styles.card}>
        <ThemedView style={styles.cardTopline}>
          <ThemedText type="smallBold">{event.series.name}</ThemedText>
          <ThemedText type="code" themeColor="textSecondary">
            {startDate}
          </ThemedText>
        </ThemedView>

        <ThemedText type="default" style={styles.cardTitle}>
          {event.name}
        </ThemedText>

        <ThemedView style={styles.cardMeta}>
          <ThemedText type="small" themeColor="textSecondary">
            {event.track.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {event.track.country}
          </ThemedText>
          <ThemedText type="smallBold">View details</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
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
  header: {
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  statePanel: {
    gap: Spacing.one,
    padding: Spacing.four,
    borderRadius: Spacing.two,
  },
  cardPressable: {
    borderRadius: Spacing.two,
  },
  pressed: {
    opacity: 0.72,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.two,
  },
  cardTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.two,
    backgroundColor: "transparent",
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 700,
  },
  cardMeta: {
    gap: Spacing.half,
    backgroundColor: "transparent",
  },
});
