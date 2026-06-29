import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { getTracks, Track } from "@/lib/api";

export default function TracksScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTracks() {
      try {
        const data = await getTracks();

        if (isMounted) {
          setTracks(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Tracks could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTracks();

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
              Racing Map
            </ThemedText>
            <ThemedText type="subtitle">Tracks</ThemedText>
            <ThemedText themeColor="textSecondary">
              The first circuits in your Quest GP racing passport.
            </ThemedText>
          </ThemedView>

          {isLoading && (
            <ThemedView type="backgroundElement" style={styles.statePanel}>
              <ThemedText>Loading tracks...</ThemedText>
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
            tracks.map((track) => <TrackCard key={track.id} track={track} />)}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function TrackCard({ track }: { track: Track }) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="default" style={styles.cardTitle}>
        {track.name}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {[track.city, track.country].filter(Boolean).join(", ")}
      </ThemedText>
      {track.description && (
        <ThemedText type="small" themeColor="textSecondary">
          {track.description}
        </ThemedText>
      )}
    </ThemedView>
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
  card: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.two,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 700,
  },
});
