import { useCallback } from 'react';

import { useChatStore } from '@/store/chat';
import { filesSelectors, useFileStore } from '@/store/file';
import { useStore } from '@/store/firebase/store';

export const useSendMessage = () => {
  const subscription = useStore().subscription;
  const [sendMessage, updateInputMessage] = useChatStore((s) => [
    s.sendMessage,
    s.updateInputMessage,
  ]);

  return useCallback((onlyAddUserMessage?: boolean) => {
    const store = useChatStore.getState();
    if (!!store.chatLoadingId) return;
    if (!store.inputMessage) return;
    if (subscription?.mode !== 1 && subscription?.limit_time === 0) return;

    const imageList = filesSelectors.imageUrlOrBase64List(useFileStore.getState());

    sendMessage({
      files: imageList,
      message: store.inputMessage,
      onlyAddUserMessage: onlyAddUserMessage,
    });

    updateInputMessage('');
    useFileStore.getState().clearImageList();
  }, []);
};
