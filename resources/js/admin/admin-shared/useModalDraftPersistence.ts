import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface StoredDraftPayload<T> {
  savedAt: string;
  data: T;
}

interface UseModalDraftPersistenceOptions<T> {
  storageKey: string;
  isOpen: boolean;
  initialValue: T;
  currentValue: T;
  onRestore: (draftData: T) => void;
}

const formatTimeLabel = (date: Date): string =>
  date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export function useModalDraftPersistence<T>({
  storageKey,
  isOpen,
  initialValue,
  currentValue,
  onRestore,
}: UseModalDraftPersistenceOptions<T>) {
  const [pendingDraft, setPendingDraft] = useState<StoredDraftPayload<T> | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const skipNextAutoSaveRef = useRef(false);

  const isDirty = useMemo(
    () => JSON.stringify(initialValue) !== JSON.stringify(currentValue),
    [initialValue, currentValue],
  );

  // Check for existing draft whenever modal opens or storageKey changes
  useEffect(() => {
    if (!isOpen) {
      setPendingDraft(null);
      setLastSavedAt(null);
      return;
    }
    skipNextAutoSaveRef.current = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        setPendingDraft(null);
        return;
      }
      const parsed = JSON.parse(raw) as StoredDraftPayload<T>;
      if (parsed && parsed.data && JSON.stringify(parsed.data) !== JSON.stringify(initialValue)) {
        setPendingDraft(parsed);
      } else {
        setPendingDraft(null);
      }
    } catch {
      setPendingDraft(null);
    }
  }, [isOpen, storageKey, initialValue]);

  // Auto-save current form value when dirty
  useEffect(() => {
    if (!isOpen) return;
    if (skipNextAutoSaveRef.current) {
      skipNextAutoSaveRef.current = false;
      return;
    }
    if (!isDirty) return;

    const timer = window.setTimeout(() => {
      const savedAt = formatTimeLabel(new Date());
      try {
        const payload: StoredDraftPayload<T> = { savedAt, data: currentValue };
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
        setLastSavedAt(savedAt);
        setPendingDraft(null);
      } catch {
        // Ignore storage quota errors gracefully
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [isOpen, isDirty, currentValue, storageKey]);

  const clearDraft = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors
    }
    setPendingDraft(null);
    setLastSavedAt(null);
  }, [storageKey]);

  const restorePendingDraft = useCallback(() => {
    if (!pendingDraft) return;
    skipNextAutoSaveRef.current = true;
    onRestore(pendingDraft.data);
    setLastSavedAt(pendingDraft.savedAt);
    setPendingDraft(null);
  }, [pendingDraft, onRestore]);

  return {
    isDirty,
    hasPendingDraft: Boolean(pendingDraft),
    pendingDraftSavedAt: pendingDraft?.savedAt || null,
    lastSavedAt,
    restorePendingDraft,
    discardPendingDraft: clearDraft,
    clearDraft,
  };
}
